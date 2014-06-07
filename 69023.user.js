// ==UserScript==
// @name          Google Reader Starred Counter(repair)
// @description   "Google Reader Starred Counter(Yamamaya)" is Repair
// @namespace     zuzu
// @version       1.0.0
// @include       http://*google.tld/reader/view*
// @include       https://*google.tld/reader/view*
// ==/UserScript==
/*************************************************
 This script is based on 
  Google Reader Starred Counter
   http://userscripts.org/scripts/show/48094

  The script to which it referred
   http://userscripts.org/scripts/show/12601
   Function waitForReady();
***************************************************/


(function(){
	var W = (typeof(unsafeWindow) !== 'undefined') ? unsafeWindow : window;
	var USER_ID = W['_USER_ID'];
	var INFO = {};
	var LOADING_IMG = 'data:image/gif;base64,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';
	
	var googleReader = {
		init: function(){
			var starredEle = this.counterEle();
			starredEle.innerHTML = '<img src="'+LOADING_IMG+'" style="border:none !important; vertical-align:middle !important;" alt=" "/>'
			this.requestStar(starredEle);
			this.starEvent(starredEle);
		},
		requestStar: function(ele){
			var xhr = new XMLHttpRequest();
			xhr.open('get','/reader/atom/user/'+USER_ID+'/state/com.google/starred?n=1000',true);
			xhr.onload = function(){
				if(xhr.status === 200){
					var xml = xhr.responseXML;
					var entry = xml.getElementsByTagName('entry');
					ele.innerHTML = '('+ entry.length +')';
					INFO.starred = entry.length;
				}
				else{
					alert('error');
				}
			};
			xhr.send(null);			
		},
		starEvent: function(star){
			var tid = null;
			
			document.addEventListener('click',function(e){
				var target = e.target;
				if(e.button !== 0 || star.textContent === '') return;
				if(target.className.match(/^item-star/)){
					var n = star.textContent.replace(/\(|\)/gm,'');
					if(target.className.match(/^item-star-active/)){
						INFO.starred++;
						star.innerHTML = '('+INFO.starred+')';
				
						if(tid !== null){
							clearTimeout(tid);
							tid = null;
						}
						tid = effect();
					}
					else{
						if(Number(n) !== 0){
							INFO.starred--;
							star.innerHTML = '('+INFO.starred+')';		
		
							if(tid !== null){
								clearTimeout(tid);
								tid = null;
							}	
							tid = effect();
						}
					}
				}
			},false);
			
			document.addEventListener('keydown',function(e){
				var currentEntry = document.getElementById('current-entry');
				if(currentEntry !== null){
					if(e.keyCode === 83 && !e.shiftKey && !e.altKey && !e.ctrlKey){
						var n = star.textContent.replace(/\(|\)/gm,'');
						var itemStar = currentEntry.getElementsByClassName('entry-icons')[0].firstChild;
						if(!/^item-star-active/.test(itemStar.className)){
							INFO.starred++;
							star.innerHTML = '('+INFO.starred+')';
				
							if(tid !== null){
								clearTimeout(tid);
								tid = null;
							}
							tid = effect();						
						}
						else{
							if(Number(n) !== 0){
								INFO.starred--;
								star.innerHTML = '('+INFO.starred+')';		
		
								if(tid !== null){
									clearTimeout(tid);
									tid = null;
								}	
								tid = effect();
							}						
						}
					}
				}
			},false);
			
			function effect(){
				var n = 1;
 				var style = star.style;
				style.backgroundColor = 'hsla(60,100%,50%,1)';
				if(tid === null){
					tid = setTimeout(function(){
						tid = (function(){
							n = n - 0.1;
							style.backgroundColor = 'hsla(60,100%,50%,'+n+')';
							if(n > 0){
								return  tid = setTimeout(arguments.callee,100);
							}
							else{
								style.backgroundColor = '';
								tid = null;
							}
						})();						
					},1000);	
				}
				return tid;
			};			
		},
		counterEle: function(){
			var point = document.getElementById('star-selector');
			point = point.getElementsByTagName('a')[0];
			var span = document.createElement('span');
			var style = span.style;
			style.fontWeight = 'bold';
			style.marginLeft = '4px';
			point.appendChild(span);
			return span;
		}
	};

	function waitForReady() {
	  if (document.getElementById('star-selector')) {
	    googleReader.init();
	  }
	  else {
	    window.setTimeout(waitForReady, 500);
	  }
	}
	
	waitForReady();
})();