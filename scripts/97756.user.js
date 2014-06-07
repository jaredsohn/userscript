// ==UserScript==
// @name           DragWithClone
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Clones element and drags it
// @include        *
// @exlude         http://127.0.0.1/*
// ==/UserScript==


//alert(document.location.href);

function getBasePath()
{

	var base=document.getElementsByTagName('base');
}

function send_to_server(img_src,img_link,base_url)
{
	GM_xmlhttpRequest({
	
		headers: {
		'Accept': 'application/atom+xml,application/xml,text/xml',
		'Content-Type': 'application/x-www-form-urlencoded'},
		method: 'POST',
		//url: 'http://localhost/shop.ly/get_data.php',
url: 'http://saya.thirdred.com/get_data.php',
		data: 'src=' + escape(img_src) + '&link=' + escape(img_link)+ '&base='+escape(base_url),
        onload: function(responseDetails) {
			if (responseDetails.responseText) {
				//alert(responseDetails.responseText);
			} else {
			   //alert('not sent');
			}
			
        },
		onerror:function(response)
		{
//alert(response);
			//alert('error occurred');
		}
    });
}

function getXYPos(obj)
{
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return {'left':curleft,'top':curtop};
	}
}

 function alertSize(wnd,doc) {
  var myWidth = 0, myHeight = 0;
  if( typeof( wnd.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = wnd.innerWidth;
    myHeight = wnd.innerHeight;
  } else if( doc.documentElement && ( doc.documentElement.clientWidth || doc.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = doc.documentElement.clientWidth;
    myHeight = doc.documentElement.clientHeight;
  } else if( doc.body && ( doc.body.clientWidth || doc.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = doc.body.clientWidth;
    myHeight = doc.body.clientHeight;
  }
  //alert( 'Width = ' + myWidth );
  //alert( 'Height = ' + myHeight );
  return {"height":myHeight,"width":myWidth};
}
  

function addElementBefore(node,tag,id,htm)
      {
        var ne = document.createElement(tag);
        if(id) ne.id = id;
        if(htm) ne.innerHTML = htm;
        node.parentNode.insertBefore(ne,node);
		return ne;
      }

      function addElementAfter(node,tag,id,htm)
      {
        var ne = document.createElement(tag);
        if(id) ne.id = id;
        if(htm) ne.innerHTML = htm;
        node.parentNode.insertBefore(ne,node.nextSibling);
		return ne;
      }
	  
function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(
'div#dragger {' +
'position:absolute;' +
//'top:220px;' +
'background-color: #FFFFFF; border:3px solid #000000;' +
'cursor:pointer;' +
'height:100px;' +
'left:0px;' +
'padding:10px;' +
'position:fixed;' +
'bottom:0px;' +
//'top:100px;' +
'width:150px;' +
'z-index:200;' +
'}'+
'div#dragger img{'+
'float:left;display:inline-block;width:30px;height:30px;'+
'}'
);


var hr=document.location.href;


//if(hr.replace('http://localhost/shop.ly','').length==hr.length){
if(hr.replace('http://saya.thirdred.com/','').length==hr.length){
	//alert(hr);
	var dragger = document.createElement("div");
	dragger.setAttribute("id", "dragger");
	dragger.innerHTML = 'Drag Images to me to share with friends!.'
	document.body.appendChild(dragger);
	
	
}
else
{
	var path= document.getElementById('mainpage').src;
	if(path)
	{
		//alert('Page Src: '+path);
	}
	
}



var Draggable = {
  obj : null,
  clone : null,
  lastMessageSent : null,
  dropped:false,
  
  init : function(o) {
    o.style.cursor = "move";
    //o.onmousedown = function(e) {
    //  Draggable.obj = this;
    //  Draggable.start(e);
    //};
	addEventSimple(o,'mousedown',function(e){
      Draggable.obj = this;
      Draggable.start(e);
    });
  },

  start : function(e) {
    e.preventDefault();
    Draggable.obj.style.cursor = "move";
    Draggable.createClone();

    //window.onmousemove = function(e) { Draggable.beginDrag(e) };
    //window.onmouseup = function(e) { Draggable.endDrag(e) };
	addEventSimple(document,'mousemove',function(e) { Draggable.beginDrag(e) });
	addEventSimple(document,'mouseup',function(e) { Draggable.endDrag(e) });
  },

  createClone : function() {
    Draggable.clone = Draggable.obj.cloneNode(true);
    Draggable.clone.style.position = "absolute";
    Draggable.clone.style.top = "-800px";
    Draggable.clone.style.left = "-800px";
    Draggable.clone.style.zIndex = "90000";
    Draggable.clone.style.opacity = 0.5;
    Draggable.clone.id = "dragClone";
    document.body.appendChild(Draggable.clone);
	
	//unsafeWindow.parent.document.body.appendChild(Draggable.clone.cloneNode());
	//alert(parentDoc);
	//alert(imGlobal);
	//alert(parentDoc);
  },

  
  
  beginDrag : function(e){
    var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	
    Draggable.clone.style.top = (e.clientY -40 + scrollTop) + "px";
    Draggable.clone.style.left = (e.clientX -40) + "px";
	
	
	var xy={'left':e.clientX, 'top':e.clientY};
	var drg=document.getElementById('dragger');
	
	var hw=alertSize(unsafeWindow,document);
	
	if(xy.left>0 && xy.left<=160 && hw.height-(e.clientY +Draggable.clone.clientHeight)<=100)
	{
		
		if(drg){
			drg.style.border='3px solid #f00';
		}
		
	}
	else
	{
		if(drg){
			drg.style.border='3px solid #000';
		}
	}
	
	//alert(unsafeWindow.parent);
  },

  endDrag : function (e) {
    removeEventSimple(document,'mousemove',document.mousemove);
	removeEventSimple(document,'mouseup',document.mouseup);
	//window.onmousemove = window.onmouseup = null;
	
	
	var xy={'left':e.clientX, 'top':e.clientY};
	
    Draggable.obj.style.cursor = "normal";
    
	var hw=alertSize(unsafeWindow,document);
	
	if(xy.left>0 && xy.left<=160 && hw.height-(e.clientY +Draggable.clone.clientHeight)<=100)
	{
		var drg=document.getElementById('dragger');
		if(drg){
			Draggable.clone.style.cursor = "normal";
			var child=Draggable.clone.cloneNode(true);
			child.style.top="0px";
			removeEventSimple(child,"mousedown",child.mousedown);
			drg.appendChild(child)
			var img_src=child.getAttribute('src');
			var img_link=child.getAttribute('p-link');
			var base_url=child.getAttribute('base');
			send_to_server(img_src,img_link,base_url);
		}
	}
	try{
		Draggable.clone.parentNode.removeChild(Draggable.clone);
	}catch( exxx){
		
	}
	
	Draggable.dropped=false;
  },

};

//alertSize();
//if(hr.replace('http://localhost/shop.ly','').length==hr.length){
if(hr.replace('http://saya.thirdred.com/','').length==hr.length){
var images=document.getElementsByTagName("img");

for (var i = 0; i < images.length; i++) {
	var img = images[i];
	//var xy={'left':img.parentNode.offsetLeft,'top':img.parentNode.offsetTop};
	
	//var hoverpop=addElementBefore(img,"span","hoverpop","Click to add to canvas!");
	//alert(img);
	//hoverpop.style.zIndex="100001";
	
		
		//return ne;
		var anchor=img.parentNode;
		//alert(anchor.tagName);

		if(anchor || anchor.tagName!="BODY" )
		{
			if(anchor.tagName!="A"){
				while(anchor && anchor.tagName && anchor.tagName!="BODY" &&  anchor.tagName!="A")
				{
					anchor=anchor.parentNode;
					if(!anchor || anchor.tagName=="BODY" || anchor.tagName=="A")
					{
						break;
					}
				}
			}
		}
		
		img.setAttribute("p-link",anchor.getAttribute("href"));
		img.setAttribute("base",document.location.href);
		/*
		addEventSimple(img,'mousemove',function(e){
			var drg=document.getElementById('dragger');
			drg.style.left=e.clientX+20;
			drg.style.top=e.clientY+20;
		});
		*/
	Draggable.init(img);
}
}