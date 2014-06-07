// ==UserScript==
// @name        Random
// @namespace   http://eeems.ca
// @description Rondom page content replacing
// @include     *
// @version     1.2
// ==/UserScript==
// create a TreeWalker of all text nodes
(function(){
	var running = false,
		article = ["the", "a", "one", "some", "any"],
		noun = ["boy", "girl", "dog", "town", "car"],
		verb = ["drove", "jumped", "ran", "walked", "skipped"],
		preposition = ["to", "from", "over", "under", "on"],
		image = ['http://thepeacefulmom.com/wp-content/uploads/2010/06/Rosemary-Roasted-Chicken.ashx_.jpg','http://chickenloverlife.files.wordpress.com/2012/02/happy-chicken.jpg','http://4.bp.blogspot.com/-a6nm0cppdCM/T-98BYbQLhI/AAAAAAAAC14/Q2IOdS0xWjY/s320/chicken.jpg','http://www.worldanimalfoundation.net/i/chicken3.jpg','http://www.eyeonannapolis.net/wp-content/uploads/2012/03/chicken.jpg'],
		get = function(array){
			return array[Math.floor(Math.random()*array.length)];
		},
		sentance = function(){
				rArticle = get(article);
			return rArticle.charAt(0).toUpperCase()+rArticle.slice(1)+' '+get(verb)+' '+get(preposition)+' '+get(article)+' '+get(noun)+'.';
		},
		observeDOM = (function(){
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
		update = function(){
			if(!running){
				running = true;
				var nodes = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),
					// some temp references for performance
					node,
					i;
				// iterate through all text nodes
				while (nodes.nextNode()) {
					node = nodes.currentNode;
					if(node.nodeValue.trim() != ''){
					   var l = node.nodeValue.length,
						   s = '';
					   while(s.length < l){
						  s += sentance();
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
					   node.src = get(image);
				   }
				}
				nodes  = document.getElementsByTagName('*');
				for(i in nodes){
				   node = nodes[i];
				   if(typeof node.style != 'undefined'){
					   if(node.style.backgroundImage != ''){
						   node.style.height = node.clientHeight+'px';
						   node.style.width = node.clientWidth+'px';
						   node.style.backgroundImage = 'url('+get(image)+')';
					   }
				   }
				   if(typeof node.title != 'undefined'){
					   var l = node.title.length,
						   s = '';
					   while(s.length < l){
						  s += sentance();
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
						  s += sentance();
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
							   node.style.backgroundImage = 'url('+get(image)+')';
							   console.log(node.style.backgroundImage+'');
						   }else if(node.style.background.indexOf('url(') != -1){
							   console.log(node.style.background+'');
							   node.style.backgroundImage = 'url('+get(image)+')';
						   }
					   }
				   }
				}
				running = false;
			}
		},
		ready = function(){
			// Observe a specific DOM element
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