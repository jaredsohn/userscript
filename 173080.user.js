// ==UserScript==
// @name        Chicken
// @namespace   http://eeems.ca
// @description Chicken
// @include     *
// @version     1.3
// ==/UserScript==
// create a TreeWalker of all text nodes
(function(){
	var observeDOM = (function(){
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
				eventListenerSupported = window.addEventListener;
		
			return function(obj, callback){
				if( MutationObserver ){
					// define a new observer
					var obs = new MutationObserver(function(mutations, observer){
						if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
							callback();
					});
					// have the observer observe foo for changes in children
					obs.observe( obj, { childList:true, subtree:true });
				}
				else if( eventListenerSupported ){
					obj.addEventListener('DOMNodeInserted', callback, false);
					obj.addEventListener('DOMNodeRemoved', callback, false);
				}
			}
		})(),
		running = false,
		update = function(){
			if(!running){
				running = true;
				var nodes = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),
					// some temp references for performance
					node,
					i,
					chicken = 'http://thepeacefulmom.com/wp-content/uploads/2010/06/Rosemary-Roasted-Chicken.ashx_.jpg';
				// iterate through all text nodes
				while (nodes.nextNode()) {
					node = nodes.currentNode;
					if(node.nodeValue.trim() != ''){
					   var l = node.nodeValue.length,
						   s = '';
					   while(s.length < l){
						  s += 'chicken ';
					   }
					   if(s.length > l){
						  s = s.substr(0,l);
					   }
					   node.nodeValue = s;
					}
				}
				nodes = document.getElementsByTagName('img');
				for(i in nodes){
				   node = nodes[i];
				   if(typeof node.style != 'undefined'){
					   node.style.height = node.clientHeight+'px';
					   node.style.width = node.clientWidth+'px';
					   node.src = chicken;
				   }
				}
				nodes  = document.getElementsByTagName('*');
				for(i in nodes){
				   node = nodes[i];
				   if(typeof node.style != 'undefined'){
					   if(node.style.backgroundImage != ''){
						   node.style.height = node.clientHeight+'px';
						   node.style.width = node.clientWidth+'px';
						   node.style.backgroundImage = 'url('+chicken+')';
					   }
				   }
				   if(typeof node.title != 'undefined'){
					   var l = node.title.length,
						   s = '';
					   while(s.length < l){
						  s += 'chicken ';
					   }
					   if(s.length > l){
						  s = s.substr(0,l);
					   }
					   node.title = s;
				   }
				   if(typeof node.alt != 'undefined'){
					   var l = node.title.length,
						   s = '';
					   while(s.length < l){
						  s += 'chicken ';
					   }
					   if(s.length > l){
						  s = s.substr(0,l);
					   }
					   node.alt = s;
				   }
				}
				nodes  = document.styleSheets;
				for(i in nodes){
				   var cssRules = nodes[i].cssRules;
				   for(ii in cssRules){
					   node = cssRules[ii];
					   if(typeof node.style != 'undefined'){
						   if(node.style.backgroundImage != '' && node.style.backgroundImage != 'none'){
							   console.log(node.style.backgroundImage+'');
							   node.style.backgroundImage = 'url('+chicken+')';
							   console.log(node.style.backgroundImage+'');
						   }else if(node.style.background.indexOf('url(') != -1){
							   console.log(node.style.background+'');
							   node.style.backgroundImage = 'url('+chicken+')';
						   }
					   }
				   }
				}
				running = false;
			}
		},
		ready = function(){
			// Observe a specific DOM element:
			observeDOM(document.body,update);
			update();
		};
	if(window.addEventListener){
		window.addEventListener('load',ready,false);
	}
	else if(window.attachEvent){
		window.attachEvent('onload',ready);
	}
})();