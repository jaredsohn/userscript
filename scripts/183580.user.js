// ==UserScript==
// @name        OU glossary tooltip
// @namespace   mustquit
// @description  tooltip for OU glossary links 
// @include     https://learn2.open.ac.uk/*
// @version     0.5.1
// @grant       none
// @updateURL	https://userscripts.org/scripts/source/183580.meta.js 
// @downloadURL https://userscripts.org/scripts/source/183580.user.js 
// ==/UserScript==


var ouPopup_NS = function () {
/********util******/
	var request = function(){
		var location = null;

		function xhr(url,callback){ 	
	    	var oReq = new XMLHttpRequest();
			oReq.open("GET", url, false);
			oReq.onload = function(){
				//console.log(oReq.responseText);
				callback(oReq);
			}
			oReq.send();
		}
		//dirty hack to get over xhr transparent redirect
		function updateLocation(url,callback){
			//console.log(url);
			var hidden_iframe = document.createElement('iframe');
			hidden_iframe.name = 'hidden_iframe';
			hidden_iframe.style.display = 'none';
			hidden_iframe.onload = function() {
			  //console.log(hidden_iframe.contentWindow.location.toString());
			  location = hidden_iframe.contentWindow.location.toString();
			  callback();
			}
			document.body.appendChild(hidden_iframe);
			
			var request = document.createElement('form');
			request.method = 'post';
			request.action = url;
			request.target = 'hidden_iframe';
			request.style.display = 'none';			
			document.body.appendChild(request);
			request.submit();
		}
		function requestPage(letter,callback){
			var page = new Page(letter);
			page.url = location + "&mode=letter&hook=" + page.letter + "&page=-1";
			
			xhr(page.url,function(oReq){
				var html = document.createElement('hackyhtml');
				html.innerHTML = oReq.responseText;
				var entries = html.getElementsByClassName('entry');
				for(var i=0; i<entries.length; i++)	{
					var entry = new Entry(
						entries[i].getElementsByClassName('concept')[0].textContent,
						entries[i].getElementsByClassName('no-overflow')[0].textContent);
					page.addEntry(entry);
					//console.log([entry.concept,entry.content].join("\n"));
				}
				//for filling popup
				callback(page);
			})
		};
		return {
			page: function(origURL,letter,callback){
				if (!location){
					ouPopup.update({content:"Retrieving course link..."})
					updateLocation(origURL,function(){requestPage(letter,callback)});
				}
				else {
					requestPage(letter,callback);
				}
			}
		}
	}();
/********core*********/
	function Page(letter) {
		this.letter = letter.toUpperCase();
		this.entries = [];
		this.addEntry = function(entry){
			this.entries.push(entry);
		};
		this.getEntry = function(concept){
			var entry;
			var found = false;
			var i = 0;
			//console.log(this.entries.length)
			while (!found && i < this.entries.length){
				entry = this.entries[i];
				var reg = new RegExp(concept,"i");
				var regPl = new RegExp(concept.substring(0,concept.length-1),"i");//plurals - can't deal with y - ies atm
				if (entry.concept.match(reg) || entry.concept.match(regPl)){ 
					found = true;
				}
				i++;
			}
			return found ? entry : null; 
		}
	}
	function Entry(concept,content){
		this.concept = concept;
		this.content = content;
	}
/**********coordinating obj*********/
	var glossary = function(){
		var pages =  []; 	
		function getPage(letter){
			var page;
			var found = false;
			var i = 0;
			while (!found && i < pages.length){
				page = pages[i];
				if (page.letter.toLowerCase() == letter.toLowerCase()){
					found = true;
				}
				i++;
			}
			return found ? page : null; 
		}
		return {
			addPage: function(page){
				pages.push(page);
			},
			getAndUpdate: function(origURL,concept){
				var firstLetter = concept.charAt(0);
				var page = getPage(firstLetter);
				if (page){
					//console.log("Using cached version of glossary page for letter " + page.letter + ".");
					ouPopup.update({
						head:'<a href="' + page.url + '">' + concept + '</a>',
						content:page.getEntry(concept).content
					});
				}
				else {
					request.page(origURL,firstLetter,function(page){
						//console.log("Requesting new glossary page for letter " + page.letter + ".");
						glossary.addPage(page);
						ouPopup.update({
							head:'<a href="' + page.url + '">' + concept + '</a>',
							content:page.getEntry(concept).content
						});
					})
				}
			}
		};
	}();
/*************** UI ******************/	
	var ouPopup = function(){
		var id = 'ouGlossPopup';
		var top = 3;
		var left = 3;
		var maxw = 300;
		var popup,head,content;
		var initial = "Loading...";
		var target; 
		var alpha = 0;
		
		function build(){
			popup = document.createElement('div');
			popup.style.display = "none";
			popup.setAttribute('id',id);
			popup.setAttribute('class', "unselectable");
			head = document.createElement('div');
			head.setAttribute('id',id + '-head');
			content = document.createElement('div');
			content.setAttribute('id',id + '-cont');
			popup.appendChild(head);
			popup.appendChild(content);
		}
		function initialFill(origLink){
			head.innerHTML = origLink;
			content.innerHTML = initial;
			popup = target.parentNode.insertBefore(popup,target);
			if (popup.offsetWidth > maxw){
				popup.style.width = maxw + 'px'
			}
		}
			
		var popupAnimate = function(){	
			var speed = 5; //lower is slower
			var delay = 20;
			var endalpha = 100;
			var intervalID  = 0;
			function fadeIn(){
				var a = alpha;
				if (a != endalpha){ 
					var i = speed;
					if (endalpha - a < speed){
						i = endalpha - a;
					}
					alpha = a + i; 
					popup.style.opacity = alpha * .01; 
				}
				else {
					clearInterval(intervalID);
				}
			}
			function fadeOut(){
				var a = alpha;
				if (a != 0){
					var i = speed;
					if (alpha < speed){
						i = a;
					}
					alpha = a - i;
					popup.style.opacity = alpha * .01;
				}
				else {
					clearInterval(intervalID);
					ouPopup.close()
				}
			}
			return {
				show: function(){
					popup.style.opacity = 0;
					popup.style.display = "inline-block";
					clearInterval(intervalID);
					intervalID  = setInterval(fadeIn,delay);
					
				},
				hide: function(e){
					clearInterval(intervalID);
					intervalID  = setInterval(fadeOut,delay);
				},
				clickHide: function(){
					if (popup && popup.style.display == "inline-block"){
						clearInterval(intervalID );
						intervalID  = setInterval(fadeOut,delay);
					}
				}
			};
		}();
		
		return {
			init: function(origLink,newTarget){
				var timeoutID = 0;
				if (popup == null){
					build();
				}
				if (popup.parentNode){
					ouPopup.close(); //in case there is one still open
				}
				target = newTarget;
				initialFill(origLink);
				popupAnimate.show(); 			
				popup.addEventListener('mouseout', function(e){timeoutID = window.setTimeout(popupAnimate.hide,200, e)}, false);
				popup.addEventListener('mouseover', function(e){window.clearTimeout(timeoutID)}, false);
			},
			close: function(){
				popup.style.opacity = 0;
				alpha = 0;
				popup.style.display = 'none';
				popup = popup.parentNode.removeChild(popup);
				//main.addEventListeners(target.parentNode);
			},
			update: function(args){
				if(args.head){
					head.innerHTML = args.head;
				}
				if(args.content){
					content.innerHTML = args.content;
				}
			}
		};
	}();
	
/**************Main*************/
	var main = function(){

		var styleSheet = function(){
			function addSheet(css) {
				var style = document.createElement('style');
				style.textContent = css;
				var head = document.getElementsByTagName('head')[0];
				if (head) {
					head.appendChild(style);
				}
			};
			return {
				addCss: function(){	addSheet(ttcss);}
			};
		}();
		function getConcept(el){
			return el.textContent;
		}
		function addEventListeners(target){
			var allLinks = target.getElementsByClassName('oucontent-olink');
			for (var i=0; i < allLinks.length; i++) {
				allLinks[i].addEventListener('mouseover', init, false); 
			}
		}
		function removeEventListeners(target){
			var allLinks = target.parentNode.getElementsByClassName('oucontent-olink');
			for (var i=0; i < allLinks.length; i++) {
				allLinks[i].removeEventListener('mouseover', init, false); 
			}
		}
		function init(e){
			var target = e.target.parentNode; //fires on <b> for some reason
			//removeEventListeners(target);
			if (target.className.indexOf('oucontent-olink') != -1){ 
				var origLink = target.outerHTML;
				ouPopup.init(origLink,target);
				var reg = /\"[^\"\s]*\"/; //the url between quotes
				var relative = origLink.match(reg).toString();
				if (relative){
					relative = relative.substring(1,relative.length-1);
					relative = relative.replace(/\&amp\;/,"&");
					var origURL = /*"https://learn2.open.ac.uk/mod/oucontent/" + */relative;
					var concept = getConcept(target)
					glossary.getAndUpdate(origURL,concept);
				}
			}	
		};
		return {
			onload: function(e){
				if(document.domain.match(/[\S]*.open.ac.uk/i)){
					styleSheet.addCss();
					addEventListeners(document.body);
				}
			}
		};
	}();
	document.addEventListener("DOMContentLoaded",function(e){main.onload(e)},false);
	
	var ttcss = "\
	#ouGlossPopup { \
		background-color: rgb(255, 255, 255);\
		z-index:99;\
		cursor: default;\
		display:inline-block;\
		border:1px solid #CCCCCC;\
		border-radius: 4px;\
		position:absolute;\
		width: 250px;\
		margin: -1px 0px 0px -3px;\
	box-shadow: 5px 2px 7px #888888;\
	}\
	#ouGlossPopup-head {\
		border-radius-top: 4px;\
		border-top-left-radius:4px;\
		border-top-right-radius:4px;\
		display:block;\
		padding-left: 2px;\
		height:20px;\
		background-color: #CEEFEE;\
		overflow:hidden;\
		vertical-align: center;\
	}\
	#ouGlossPopup-head a{\
		font-weight:bold;\
		color:#1F536B;	\
		padding-top: 3px;\
	} \
	#ouGlossPopup-head a:hover{\
		text-decoration:underline;\
	}\
	#ouGlossPopup-cont {\
		display:block;\
		margin:5px;\
		background-color: rgb(255, 255, 255);\
		color: #292929;\
		border-bottom-right-radius:4px;\
		border-bottom-left-radius:4px;\
	}\
	*.unselectable {\
	   -moz-user-select: -moz-none;\
	   -khtml-user-select: none;\
	   -webkit-user-select: none;\
	   -ms-user-select: none;\
	   user-select: none;\
	}"
}();
	
