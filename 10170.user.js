//
// ==UserScript==
// @name          LinkQuery
// @namespace     http://codebox.no-ip.net/LinkQuery
// @description   Obtains information about links on a web page.
// @include       *
// ==/UserScript==

if (CODEBOX===undefined){
	var CODEBOX={};
}
CODEBOX.linkQuery = {
	process : function(){
		var BGCOL_OK  = 'aliceblue';
		var BGCOL_ERR = '#FFDDDD';	
		function sendQuery(element, resultPane){
			var req = {
				'method' 	: 'HEAD',
				'url'	   	: element.href,
				'headers'	: {},
				'data'		: '',
				'onload'	: function(rsp){
					displayInfo(element.href, rsp, resultPane, rsp.status >= 400);
				},
				'onerror'	: function(rsp){
					displayInfo(element.href, rsp, resultPane, true);
				}
			};
			GM_xmlhttpRequest(req);
		};
		
		function displayInfo(url, rsp, resultPane, isError){
			var info = '<b>URL</b>: ' + url + '<br/>' +
				'<b>Response</b>: ' + rsp.status + ' ' + rsp.statusText + '<br/>';
				
			var headers = makeHeaderObject(rsp.responseHeaders);
			for( var header in headers ){
				info += '<b>' + header + '</b>: ' + headers[header] + '<br/>';
			}
				
			resultPane.setContent(info, isError);		
		}		
		
		function makeHeaderObject(headerString){
			var headers = headerString.split('\n');			
			
			var obj = {};
			for(var i=0; i<headers.length; i++){
				var colonPosn = headers[i].indexOf(':');
				if (colonPosn > 0){
					obj[headers[i].substr(0, colonPosn)]=headers[i].substr(colonPosn + 1);
				}

			}
			return obj;
		}
		
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
		
		var allLinks = document.getElementsByTagName('a');		
		for (var i = 0; i < allLinks.length; i++){
			allLinks[i].addEventListener('click', function(e){
				if (e.ctrlKey && e.shiftKey){
					var resultPane = makeResultPane(e, i);
					resultPane.setContent('Connecting...'); 
					sendQuery(e.target, resultPane);
					e.stopPropagation();
	    			e.preventDefault();
	    		}
			}, true);				
		}
	}
}
CODEBOX.linkQuery.process();
