// RedBubble link converter
// Version 0.1
// 2008-12-03
// Copyright (c) 2008, Matt Simner <http://www.mattsimner.com/>
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "RedBubble link converter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedBubble link converter
// @namespace     http://www.mattsimner.com/
// @description   Convert an image link into a Redbubble link (adapted from the excellent LinkQuery script by codebox)
// @include       http://www.redbubble.com/*
// ==/UserScript==


if (ms===undefined){
	var ms={};
}
ms.convertlink = {
	process : function(){
		var BGCOL_OK  = 'aliceblue';
		var BGCOL_ERR = '#FFDDDD';	
		
		function makeResultPane(event, uid){
			var newDiv = document.createElement('div');
			
			var contentDiv = document.createElement('div');		
			contentDiv.style.border     = '0px none';
			contentDiv.style.padding    = '0';
			contentDiv.style.fontSize   = '8pt';
			contentDiv.style.fontFamily = 'sans-serif';
			contentDiv.style.color		= 'black';
						
			newDiv.appendChild(contentDiv);	
			
			var closeLink = document.createElement('span');
			closeLink.style.cssFloat       = 'right';
			closeLink.style.textDecoration = 'underline';
			closeLink.style.color          = 'blue';
			closeLink.style.cursor         = 'pointer';
			closeLink.style.border         = '0px none';
			closeLink.style.fontSize       = '8pt';
			closeLink.style.fontFamily     = 'sans-serif';
			closeLink.style.padding        = '0';
			
			var textNode  = document.createTextNode('Close');
			closeLink.addEventListener('click', function(e){
				newDiv.parentNode.removeChild(newDiv);
			}, true); 			
			closeLink.appendChild(textNode);			
			newDiv.appendChild(closeLink); 
			
			var xPosn;
			if (event.clientX + 350 > document.documentElement.clientWidth){
				xPosn = document.documentElement.clientWidth - 350;
			} else {
				xPosn = event.clientX;
			}
			
			newDiv.style.top             = event.clientY + window.scrollY + 'px';
			newDiv.style.left            = xPosn + 'px';
			newDiv.style.position        = 'absolute';
			newDiv.style.border          = '1px solid black';
			newDiv.style.backgroundColor = BGCOL_OK;
			newDiv.style.padding         = '10px';
			newDiv.style.maxWidth        = '300px';
			newDiv.zindex                = '100';
			newDiv.style.overflow        = 'auto';
			newDiv.id = uid;
			
			newDiv.setContent = function(content, isError){
				contentDiv.innerHTML = content;
				if (!isError){
					newDiv.style.backgroundColor = BGCOL_OK;
				} else {
					newDiv.style.backgroundColor = BGCOL_ERR;
				}				
			}
			
			newDiv.addEventListener('mousedown', function(e){
					dragStart(e, uid);
				}, true);
			window.document.body.appendChild(newDiv);
						
			return newDiv;
		}
		
		var dragObj;
		function dragStart(event, id) {
			dragObj = {}
        	
        	dragObj.elNode = event.target;

			if (event.target.id != id){
				return;
			}
        	dragObj.cursorStartX = event.clientX + window.scrollX;
        	dragObj.cursorStartY = event.clientY + window.scrollY;
    
        	dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
        	dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
        
        	if (isNaN(dragObj.elStartLeft)){
        		dragObj.elStartLeft = 0;
        	}
        	if (isNaN(dragObj.elStartTop)){
        		dragObj.elStartTop  = 0; 
        	}
        
        	dragGoListener   = buildDragGo();
        	dragStopListener = buildDragStop();
        
        	document.addEventListener("mousemove", dragGoListener,   true);
        	document.addEventListener("mouseup",   dragStopListener, true);

        	event.preventDefault();       
	    }
	    
	    function buildDragGo() {
	        return function(event){
	            var x, y;
	            x = event.clientX + window.scrollX;
	            y = event.clientY + window.scrollY;        
	        
	            dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
	            dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";    
	            
	            event.preventDefault();
	        };
	    }  
	    
	    function buildDragStop() {
	        return function(event){
	            document.removeEventListener("mousemove", dragGoListener, true);
	            document.removeEventListener("mouseup",   dragStopListener, true);
	        };
	    } 
		
		var allImageLinks = document.evaluate('//a[./img]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		

		//do all Image Links
		for (var i = 0; i < allImageLinks.snapshotLength; i++)
		{
			allImageLinks.snapshotItem(i).addEventListener('click', function(e){
				if (e.ctrlKey && e.shiftKey){
					var resultPane = makeResultPane(e, i);
					
					var element = e.target.parentNode; //for some reason we actually click the 'image' not the anchor element so get parent
					var img = document.evaluate('./img', element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					var output = "!" + img.src + "!:" + element.href;
					if (img.alt && img.alt.length > 0)
						output += "<br><br>*" + img.alt + "*"
					else if (element.title && element.title.length > 0)
						output += "<br><br>*" + element.title + "*"
;
						
					resultPane.setContent(output + "<br>", false);
			
					e.stopPropagation();
	    			e.preventDefault();
	    		}
			}, true);				
		}
		
		var allTextLinks = document.evaluate('//a[not(./img)]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		
		//do all non-Image Links
		for (var i = 0; i < allTextLinks.snapshotLength; i++)
		{
			allTextLinks.snapshotItem(i).addEventListener('click', function(e){
				if (e.ctrlKey && e.shiftKey){
					var resultPane = makeResultPane(e, i);
					
					var element = e.target;
					var output = '"' + element.text + '":' + element.href;
					resultPane.setContent(output + "<br>", false);
			
					e.stopPropagation();
	    			e.preventDefault();
	    		}
			}, true);				
		}

		//Now for the last trick - get all images that aren't enclosed in a link
		var allImagesWithoutLink = document.evaluate('//img[not(../a)]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		

		//do all non-Image Links
		for (var i = 0; i < allImagesWithoutLink.snapshotLength; i++)
		{
			allImagesWithoutLink.snapshotItem(i).addEventListener('click', function(e){
				if (e.ctrlKey && e.shiftKey){
					var resultPane = makeResultPane(e, i);
					
					var element = e.target;
					var output = "!" + element.src + "!";
					if (element.alt && element.alt.length > 0)
						output += "<br><br>*" + element.alt + "*";
					
					resultPane.setContent(output + "<br>", false);
			
					e.stopPropagation();
	    			e.preventDefault();
	    		}
			}, true);				
		}		
	}
}
ms.convertlink.process();
