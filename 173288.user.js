// ==UserScript==
// @name Resizable Weibo Popup Vedio
// @author raulchen
// @version 2.1.1
// @namespace http://userscripts.org/scripts/show/173288
// @updateURL http://userscripts.org/scripts/source/173288.meta.js
// @installURL http://userscripts.org/scripts/source/173288.user.js
// @include http://*.weibo.com/*
// @include http://weibo.com/*
// @run-at document-end
// ==/UserScript==
// 

(function(){

	var mainDiv=document.getElementsByClassName('W_main');
	if(mainDiv.length==0){
		return;
	}
	mainDiv=mainDiv[0];

	var side=false;

	var wppDiv=document.createElement('div');
	wppDiv.setAttribute('id','wppDiv');
	wppDiv.setAttribute('style', 'padding:5px;position:fixed;' +
	                 'top:5px;left:3px;font-size:14px;' +
	                 'z-index:9999;text-align:left;font-weight:normal;' +
	                 'line-height:120%;');

	var link=document.createElement('a');

	link.innerHTML='<<';
	link.href='javascript:void(0)';
	link.setAttribute('style','color:#ddd;');

	wppDiv.appendChild(link);

	document.body.appendChild(wppDiv);

	var ORIGINAL_WIDTH=440;
	var ORIGINAL_HEIGHT=356;

	var currWidth=ORIGINAL_WIDTH,currHeight=ORIGINAL_HEIGHT;

	var vedioDiv,vedioEmbed;

	var setVedioSize=function(width,height){
		// style.textContent=css.replace(/\{0\}/g,width).replace(/\{1\}/g,height);
		vedioDiv.style.width=width+"px";
		vedioEmbed.style.width=width+"px";
		vedioEmbed.style.height=height+"px";
	};

	var findVedio=function(){
		var vedioDivs=document.querySelectorAll("[node-type='mediaContent']");
		for(var i=0;i<vedioDivs.length;i++){
			var vedioEmbeds=vedioDivs[i].getElementsByTagName('embed');
			if(vedioEmbeds.length==1){
				vedioDiv=vedioDivs[i];
				vedioEmbed=vedioEmbeds[0];
				return true;
			}
		}
		return false;
	}

	var toggle=function(){
		if(!side){
			this.innerHTML=">>";
			mainDiv.style.margin="0 10px 0 10px";
			currWidth=document.body.clientWidth-mainDiv.offsetWidth+110;
			if(currWidth<ORIGINAL_WIDTH){
				currWidth=ORIGINAL_WIDTH;
			}
			currHeight=Math.floor(ORIGINAL_HEIGHT*currWidth/ORIGINAL_WIDTH);
		}
		else{
			this.innerHTML="<<";
			mainDiv.style.margin="0 auto";
			currWidth=ORIGINAL_WIDTH;
			currHeight=ORIGINAL_HEIGHT;
		}
		side=!side;
		if(!findVedio()){
			return;
		}
		setVedioSize(currWidth,currHeight);
		bindResizeHandle();
	};

	link.addEventListener('click',toggle,false);

	//========== DRAG TO RESIZE ===========
	var resizing=false;
	var startX,startY;
	var draggingWidth,draggingHeight;

	var handleDragStart=function(e){
		resizing=true;
		startX=e.clientX;
		startY=e.clientY;
		currWidth=parseInt(vedioEmbed.style.width);
		currHeight=parseInt(vedioEmbed.style.height);
	    e.dataTransfer.setData('application/x-moz-node', e.target);
	    // e.preventDefault();
	};

	var handleDragEnd=function(e){
		resizing=false;
		currWidth=draggingWidth;
		currHeight=draggingHeight;
		e.preventDefault();
	};

	var bindResizeHandle=function(){
		if(vedioDiv.bound!=null){
			return;
		}
		vedioDiv.bound='bound';
		var parent=vedioDiv.parentNode;

		var dragDiv=document.createElement('div');
		dragDiv.setAttribute('id','drag');
		dragDiv.setAttribute('draggable','true');
		dragDiv.setAttribute('style', 
			'width:15px;height:15px;background:#777;position:fixed;');
		dragDiv.addEventListener('dragstart', handleDragStart, false);
		dragDiv.addEventListener('dragend', handleDragEnd, false);

		parent.insertBefore(dragDiv,parent.firstChild);
	};

	var handleDragOver=function(e){
		if(!resizing){
			return;
		}
		draggingWidth=currWidth-(e.clientX-startX);
		draggingHeight=currHeight-(e.clientY-startY);
		setVedioSize(draggingWidth,draggingHeight);
		console.log(draggingWidth);
		e.preventDefault();
	};
	document.addEventListener('dragover', handleDragOver, false);
	

	document.body.addEventListener ('DOMNodeInserted',
		function(e){
			var node=e.target;
			if(node.className=='W_layer'){
				setTimeout(function(){
						if(findVedio()){
							bindResizeHandle();
							setVedioSize(currWidth,currHeight);
						}
					},800);
			}
		}, false);
})();


