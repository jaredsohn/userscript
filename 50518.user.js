// ==UserScript==
// @name           Gmail Date Sorter
// @namespace      http://www.collectitstoreit.com/
// @description    Sort your GMail inbox by date time.
// @include        http*://mail.google.com/mail/*
// ==/UserScript==

/*
 * Version 1.1  June 2, 2009
 * Written by Benjamin Paige III
 * This script is Public Domain. You are welcome to use it in any way you like.
 */
 
//refresh is set only once, in the top frame
if(document.location == top.location){
(function(){
	var dateAscending = false;
	var TAG = 'CloudKicker';
	var running = false;
	
	function flip() {
		if(!running)
			running = true;
		else 
			return false;
		
		if(dateAscending) {// && !frames[3].document.getElementById('TAG')) {
			
			var tableList = frames[3].document.getElementsByClassName('RnTrV');

			for(var h = 0; h < tableList.length; h++) {
				GM_log('ugly ' + h);
				if(tableList[h].clientHeight == 0 || tableList[h].getAttribute(TAG) != null)
					continue;
				GM_log('ugly ' + tableList[h].id);
				//tableList[h].id = TAG;
				tableList[h].setAttribute(TAG,TAG);
				var emailTBody = tableList[h].lastChild;
				var cloneTBody = emailTBody.cloneNode(false);
				//cloneTBody.id = 'reverseList';
				emailTBody.parentNode.appendChild(cloneTBody);
				emailTBody.style.display = 'none';
				var emailList = emailTBody.childNodes;
				
				for(var i = emailList.length - 1; i >= 0 ; i--) {
					
					var cloneRow = emailList[i].cloneNode(true);
					
					cloneRow.setAttribute('index', i);
					
					cloneTBody.appendChild(cloneRow);
					
					cloneRow.addEventListener('mousedown',
						function(e){
							emailTBody.style.display = '';
							var location = totalOffset(emailList[this.getAttribute('index')].childNodes[3]);
							partyStarter2(emailList[this.getAttribute('index')].childNodes[3],location.x,location.y+10);
							
							emailTBody.style.display = 'none';
						}
					,true);
				}
				
				var pageNav = frames[3].document.getElementsByClassName('D7smAf');
				for(var i = 0; i < pageNav.length; i++) {
					
					var cloneNav = document.createElement('div');
					cloneNav.style.marginLeft = '5px';
					cloneNav.style.fontSize = '80%';
					cloneNav.style.fontFamily = 'font-family:arial,sans-serif';
					
					pageNav[i].parentNode.appendChild(cloneNav);
					pageNav[i].style.display = 'none';
					var elements = pageNav[i].getElementsByTagName('span');
					
				
					for(var j = 0; j < elements.length; j++) {
					
						
						var cloneElement = elements[j].cloneNode(true);
						//cloneElement.id = 'pageNav' +j;
						
						
						cloneElement.className = 'e';
						cloneElement.style.color ='#082534';
						cloneElement.style.marginLeft = '5px';
						if(/Newest/.test(elements[j].innerHTML)){
							cloneNav.appendChild(cloneElement);
							cloneElement.innerHTML = 'Newest >>';
						} else if(/Newer/.test(elements[j].innerHTML)){
							if(j == 1)
								cloneNav.insertBefore(cloneElement, cloneNav.firstChild);
							else
								cloneNav.appendChild(cloneElement);
							cloneElement.innerHTML = 'Newer >';
						} else if(/Oldest/.test(elements[j].innerHTML)){
							cloneNav.insertBefore(cloneElement, cloneNav.firstChild);
							cloneElement.innerHTML = '<< Oldest';
						} else if(/Older/.test(elements[j].innerHTML)){
								cloneNav.insertBefore(cloneElement, cloneNav.firstChild);
								cloneElement.innerHTML = '< Older';
						} else {
								if(j == 0)
									cloneNav.appendChild(cloneElement);
								else
									cloneNav.insertBefore(cloneElement, cloneNav.firstChild);
								cloneElement.className = 'pDRE5d';
						}
						cloneElement.setAttribute('index',j);
						cloneElement.addEventListener('click',function(){partyStarter(elements[this.getAttribute('index')])},true);
					}
					
				}
				
				running = false;
				return true;	
			}
		}
		running = false;
		return false;
	}
	
	function reset() {
		
	}
	
	function dateClicked() {
		dateAscending = !dateAscending;
		
		flip();
	}
	
	
	
	function addDate() {
		if(frames[3]) {
			var elements = frames[3].document.getElementsByClassName('AP');
			
			if(elements.length > 0) {
			
				for(var i = 0; i < elements.length; i++) {
				
					elements[i].style.display = 'inline';
				
					var container = elements[i].parentNode;
					
					var dateAnchor = document.createElement('A');
					dateAnchor.href = '#'; 
					dateAnchor.innerHTML = 'Date';
					dateAnchor.addEventListener('click', dateClicked, true);
					dateAnchor.style.marginLeft = '5px';
					dateAnchor.style.fontSize = '80%';
					dateAnchor.style.fontFamily = 'font-family:arial,sans-serif';
					dateAnchor.style.color ='#082534';
					
					container.appendChild(dateAnchor);
					
					function clickHandler() {
						waitForIt(flip,100,30);
					}

					frames[3].document.addEventListener('click',clickHandler,true);
				}
				
				return true;
			}
		}
	}
	
	waitForIt(addDate);
	
	//  #######################################################################
	//
	//	##     ## ######## #### ##       #### ######## #### ########  ######  
	//	##     ##    ##     ##  ##        ##     ##     ##  ##       ##    ## 
	//	##     ##    ##     ##  ##        ##     ##     ##  ##       ##       
	//	##     ##    ##     ##  ##        ##     ##     ##  ######    ######  
	//	##     ##    ##     ##  ##        ##     ##     ##  ##             ## 
	//	##     ##    ##     ##  ##        ##     ##     ##  ##       ##    ## 
	//	 #######     ##    #### ######## ####    ##    #### ########  ######  
	//	
	//  #######################################################################
	
	function catchAll(node,level) {
	
		for(var i = 0; i < level; i++) {
			GM_log('Lakers: ' + i);
		
			node.addEventListener('mousedown',
				function(e){
					GM_log('Catch> Tag Name: ' + this.tagName 
					+ ' Id: ' + this.id  
					+ ' Class: ' + this.className 
					+ ' client: ' + e.clientX + ',' + e.clientY
					+ ' screen: ' + e.screenX + ',' + e.screenY)
				}
			,true);
		
			node = node.parentNode;
		}
	}
	
	function moveToTop(node) {
		var parent = node.parentNode;
		
		parent.removeChild(node);
		
		parent.insertBefore(node, parent.firstChild);
		
		node.addEventListener('click',function(){partyStarter(parent.firstChild);},true);
		
	}
	
	function moveToBottom(node) {
		var parent = node.parentNode;
		
		parent.removeChild(node);
		
		parent.appendChild(node);
	}

	function partyStarter(conan) {
	  var evt = document.createEvent("MouseEvents"); 
	  evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
	  conan.dispatchEvent(evt);
	}
	
	
	function partyStarter2(conan, left, top) {
	  var evt = document.createEvent("MouseEvents"); 
	  evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, left,top,  false, false, false, false, 0, null); 
	  conan.dispatchEvent(evt);
	}
					
	function waitForIt(now, interval, iteration){
		if(interval == null)
			interval = 100;
			
		var find;
			
		function run() {
			if(now())
				window.clearInterval(find);
				
			if(iteration &&  iteration <= 0)
				window.clearInterval(find);
			else
				iteration--;
		}
			
		find = window.setInterval(run,interval);

		return find;
	}

	function getElementsByClassNameAndText( node, className, text) {
		var elements = node.getElementsByClassName(className);
		var returnElements = new Array();
		
		for(var i in elements) {
			if(elements[i].innerHTML.indexOf(text) != -1)
				returnElements.push(elements[i]);
		}
		
		return returnElements;
	}

	function isDescendentElement(baseNode,node, levelMax){
		for(var i = 0; i < levelMax; i++)
		{
			if(baseNode == node || baseNode == node.parentNode)
				return true;
			else
				node = node.parentNode;
		}
		
		return false;
	}	
	
	function LOG(str) {
		if(navigator.appVersion.indexOf('Chrome') != -1)
			return;
			
		if(GM_log)
			GM_log(str);
	}
	
	function totalOffset(node) {  
	    var total = new Object();  
	    total.x = - frames[3].document.lastChild.scrollLeft; total.y = - frames[3].document.lastChild.scrollTop;

		do {
			total.y += node.offsetTop;
			total.x += node.offsetLeft;
			GM_log('Tag Name: ' + node.tagName 
					+ ' Id: ' + node.id  
					+ ' Class: ' + node.className + 'Total: ' + total.x + ',' + total.y);
			node = node.offsetParent;
		} while(node.offsetParent)
		
		return total;
	}
	
	//returns absolute position of some element within document  
	function getAbsolutePos(element) {  
	    var res = new Object();  
	    res.x = 0; res.y = 0;  
	    if (element !== null) {  
	        res.x = element.offsetLeft;  
	        res.y = element.offsetTop;  
	          
	        var offsetParent = element.offsetParent;  
	        var parentNode = element.parentNode;  
	        var borderWidth = null;  
	  
	        while (offsetParent != null) {  
	            res.x += offsetParent.offsetLeft;  
	            res.y += offsetParent.offsetTop;  
	              
	            var parentTagName = offsetParent.tagName.toLowerCase();   
	  
	            if ((__isIE && parentTagName != "table") || (__isFireFoxNew && parentTagName == "td")) {              
	                borderWidth = __getBorderWidth(offsetParent);  
	                res.x += borderWidth.left;  
	                res.y += borderWidth.top;  
	            }  
	              
	            if (offsetParent != document.body && offsetParent != document.documentElement) {  
	                res.x -= offsetParent.scrollLeft;  
	                res.y -= offsetParent.scrollTop;  
	            }  
	  
	            //next lines are necessary to support FireFox problem with offsetParent  
	            if (!__isIE) {  
	                while (offsetParent != parentNode && parentNode !== null) {  
	                    res.x -= parentNode.scrollLeft;  
	                    res.y -= parentNode.scrollTop;  
	                      
	                    if (__isFireFoxOld) {  
	                        borderWidth = kGetBorderWidth(parentNode);  
	                        res.x += borderWidth.left;  
	                        res.y += borderWidth.top;  
	                    }  
	                    parentNode = parentNode.parentNode;  
	                }      
	            }  
	  
	            parentNode = offsetParent.parentNode;  
	            offsetParent = offsetParent.offsetParent;  
	        }  
	    }  
	    return res;  
	}  
})(); //end anonymous function
} //end if