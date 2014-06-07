// ==UserScript==
// @name         Delicious Thumbnail & Favicon
// @namespace    Yamamaya
// @include      * 
// @version      2.3.1
// ==/UserScript==


(function(){ 	
 var USER = document.getElementById('signedInAs');
 var DELICIOUS_INFO = eval(GM_getValue('delicious-site-info')) || {};
 var THUMBNAIL_API_URL = [
    'http://open.thumbshots.org/image.pxf?url=',
    'http://images.websnapr.com/?url=',
    'http://capture.heartrails.com/?',
    'http://api.thumbalizr.com/?url=',
    'http://img.simpleapi.net/small/',
    'http://mozshot.nemui.org/shot?'
 ];
 var GET_THUMBNAIL_WIDTH = DELICIOUS_INFO.thumbnailWidth || '90';
 var GET_THUMBNAIL_HEIGHT = DELICIOUS_INFO.thumbnailHeight || '70';
 var GET_THUMBNAIL_SIZE_TOGGLE = DELICIOUS_INFO.thumbnailSizeToggle || 'sidebar-list toggle on';
 var GET_THUMBNAIL_API = DELICIOUS_INFO.thumbnailApi || THUMBNAIL_API_URL[0];		
 var GET_THUMBNAIL_API_TOGGLE = DELICIOUS_INFO.thumbnailApiToggle || 'sidebar-list toggle on';
 var GET_TOTAL_VISITED = DELICIOUS_INFO.totalVisited || (DELICIOUS_INFO.totalVisited = {});
 var GET_TOTAL_VISITED_ON_OFF = DELICIOUS_INFO.totalVisitedOnOff || 'on';
 var GET_TOTAL_VISITED_TOGGLE = DELICIOUS_INFO.totalVisitedToggle || 'sidebar-list toggle on';
 var GET_MOST_VISITED_TOGGLE  =  DELICIOUS_INFO.mostVisitedToggle || 'sidebar-list toggle on';

 if(location.hostname.match(/delicious\.com/)){
 	function delicious(){	
		var self = this;
		
		this.popUpThumbnail = new Image();
		var popUpStyle = this.popUpThumbnail.style;
		popUpStyle.width = '120px';
		popUpStyle.height = '90px';
		popUpStyle.border = '1px solid #333333';
		popUpStyle.zIndex = '9999';
		popUpStyle.position = 'absolute';
		popUpStyle.display = 'none';
		document.body.appendChild(this.popUpThumbnail);
		
		var size = [
			{
			 	name:   'Small',
				width:  '70',
				height: '60'
			},
			{
			 	name:   'Medium',
				width:  '90',
				height: '70'
			},
			{
			 	name:   'Large',
				width:  '120',
				height: '90'
			}
		];
		this.sizeSetBox = document.createElement('ul');
		this.sizeSetBox.id = 'sizeSetBox';
		this.sizeSetBox.className = 'list';
		createSideBarContents(size);
     
		var totalVisitedOnOff = ['on','off'];
		this.totalVisitedBox = document.createElement('ul');
		this.totalVisitedBox.id = 'totalVisitedBox';
		this.totalVisitedBox.className = 'list';   
		createSideBarContents(totalVisitedOnOff);

		this.thumbnailApiSetBox = document.createElement('ul');
		this.thumbnailApiSetBox.id = 'thubnailApi-setBox';
		this.thumbnailApiSetBox.className = 'list';
		createSideBarContents(THUMBNAIL_API_URL);
		
		this.mostVisitedBox = document.createElement('ul');
		this.mostVisitedBox.id = 'mostVisitedBox';
		this.mostVisitedBox.className = 'list';
		var mostVisitedSort =sortBig(GET_TOTAL_VISITED);
		createSideBarContents(mostVisitedSort);
		if(this.mostVisitedBox.childNodes.length < 1)
			this.mostVisitedBox.innerHTML = '<li style="margin:10px 20px 0px 20px; font-size:15px;">No Result</li>';
		this.mostVisitedBox.lastChild.style.marginBottom = '10px';
		
		
		function createSideBarContents(array){
			var appendNode;
			for(var i=0,n=0,l=array.length;i<l;i++){
				var Array = array[i];
				var li = document.createElement('li');
				var a = document.createElement('a');
				var span = document.createElement('span');
				switch(array){
					case size:
						appendNode = self.sizeSetBox;
						var sizeName   = Array.name;
						var sizeWidth  = Array.width;
						var sizeHeight = Array.height;			
						span.className = 'm thumbnail-size-changeButton';
						span.setAttribute('thumbnailWidth',sizeWidth);
						span.setAttribute('thumbnailHeight',sizeHeight);
						span.innerHTML = sizeName;						
						if(sizeWidth === GET_THUMBNAIL_WIDTH)
							li.className = 'isCurrentTag';	
						break;
					
					case totalVisitedOnOff:
						appendNode = self.totalVisitedBox;
						span.className = 'm total-visited-onOffButton';
						span.innerHTML = Array;
					    if(Array === GET_TOTAL_VISITED_ON_OFF)
							li.className = 'isCurrentTag';	
						break;
					
					case THUMBNAIL_API_URL:
						appendNode = self.thumbnailApiSetBox;
						span.className = 'm thumbnail-Api-url-setButton';
						span.innerHTML = Array.split('/')[2];
						span.setAttribute('api',Array);						
						if(Array === GET_THUMBNAIL_API)
							li.className = 'isCurrentTag';	
						break;	
						
					case mostVisitedSort:
						appendNode = self.mostVisitedBox;
						if(Array.title === null) continue;
						n++;
						var japanese = new RegExp('[^!-~ ]').test(Array.title);
						a.href = Array.url;
						a.target = '_blank';
						a.title = Array.title;
						(japanese) ? 
						span.textContent = Array.title.substr(0,14):
						span.textContent = Array.title.substr(0,25);
						var em = document.createElement('em');
						em.textContent = Array.total;
						span.appendChild(em);
						
						setTimeout((function(s){
							return function(){
								s.setAttribute('style', 'padding-right:' + (em.offsetWidth + 15) + 'px');
							}
						})(span),1000);
						
						if(n > 10)
							return;
													
						break;
				}
				
				if((l-i)=== 1)
					li.style.marginBottom = '10px';			
				
				li.appendChild(a);
				a.appendChild(span);
				appendNode.appendChild(li);				
			};				
		};
		
		function sortBig(info){
			var r = [];
			for(var i in info){
				var siteInfo = {
					url: info[i].url || i,
					title: info[i].title || null,
					total: info[i].total
				};
				r.push(siteInfo);
			};
		
			r = aArraySort(r,'total');
			return r;
		
			function aArraySort(r,key){
				r.sort(function(a,b){
					return a[key] < b[key] ? 1: -1;
				});
				return r;
			};  		
		};	
 	};
 
 	delicious.prototype = {
 		init: function(){
			var self = this;	    
			var path = [
				'.//h4/a[@class="inlinesave action" or @class="action" or @class="inlinesave"]',
				'.//span[@class="saverem"]',
				'.//h4/div[@class="editdel"]'
			].join(' | ');
		
			GM_registerMenuCommand('Delicious Thumbnail & Favicon - clear total visited', clearTotalVisited); 		
		
			Delicious();
	   
			window.AutoPagerize && window.AutoPagerize.addFilter(function(doc){
				Delicious();
			});
 	   
			document.addEventListener('click',this,false);	
			document.addEventListener('mouseover',this,false);
			document.addEventListener('mouseout',this,false);	
			document.addEventListener('DOMNodeInserted',this,false);
		
			function Delicious(){		
				$X('.//a[contains(@class,"taggedlink") and not(preceding-sibling::div)]').forEach(function(link){
					self.addFaviconAndThumbnail(link);
					if(USER === null) return;
					if(location.href.match(USER.href)){
						if(GET_TOTAL_VISITED.hasOwnProperty(link.href)){
							if(GET_TOTAL_VISITED[link.href].title === undefined){
								GET_TOTAL_VISITED[link.href].title = link.textContent;
								setValue();
							}
						}
					}
				});
				$X(path).forEach(function(link){
					self.saveButton(link);
				});
				$X('.//h5[@class="tag-chain-label"]').forEach(function(e){
					self.tagChainLabel(e);
				});
			};
			
		},
		handleEvent: function(e){
			var self = this;
			switch(e.type){
				case 'click':
				 clickEvent(e);
			 	 break;
			
				case 'mouseover':
				 totalVisitedToggle(e);
				 popUpThumbnail(e);
			 	 break;
			 
				case 'mouseout':
			 	 totalVisitedToggle(e);
				 popUpThumbnail(e);
				 break; 
				
				case 'DOMNodeInserted':
				 mp3PlayerStyle(e);
				 break;
			}
		
			function clickEvent(e){
				var target = e.target, totalVisitedEle;
				if(e.button === 0 && (target.className === 'taggedlink' || target.alt === 'thumb' || target.className === 'imgThumb')){
					var url = target.href || target.parentNode.href;
					if(typeof GET_TOTAL_VISITED[url] !== 'object') GET_TOTAL_VISITED[url] = {};
					GET_TOTAL_VISITED[url] = GET_TOTAL_VISITED[url] || (GET_TOTAL_VISITED[url] = {});
					GET_TOTAL_VISITED[url].url = url;
					if(USER){
						if(location.href.match(USER.href)){
							GET_TOTAL_VISITED[url].title = target.textContent || target.title;
						}
					}
					GET_TOTAL_VISITED[url].total = GET_TOTAL_VISITED[url].total + 1 || 1;
					setValue();
					
					if(target.className === 'taggedlink'){
						totalVisitedEle = target.parentNode.parentNode.nextSibling.firstChild;
					}
					else				
					if(target.alt === 'thumb'){
						totalVisitedEle = target.parentNode.parentNode.nextSibling.firstChild.nextSibling.nextSibling.firstChild;
					}
					else
					if(target.className === 'imgThumb'){
						totalVisitedEle = target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.firstChild;
					}
					var totalVisited = Number(totalVisitedEle.textContent) + 1;
					totalVisitedEle.textContent = totalVisited;
				}		
			};
		
			function popUpThumbnail(e){
				var target = e.target;
				if((target.parentNode.parentNode.parentNode.id === 'mostVisitedBox') && (target.parentNode.parentNode.parentNode.className === 'list') || 
				   (target.parentNode.parentNode.id === 'mostVisitedBox') && (target.parentNode.parentNode.className === 'list') || 
				   (target.parentNode.id === 'mostVisitedBox') && (target.parentNode.className === 'list')){
					var style = self.popUpThumbnail.style;
					switch(e.type){
				 		case 'mouseover':
							var url = target.href || target.parentNode.href || target.firstChild.href;
							if(url === undefined) return;
							self.popUpThumbnail.src = 'http://open.thumbshots.org/image.pxf?url=' + url;
							style.display = '';
							style.top = (e.pageY + (10)) + 'px';
							((e.pageX + (self.popUpThumbnail.offsetWidth)) > window.innerWidth) ?
								style.left = (window.innerWidth - self.popUpThumbnail.offsetWidth - 50) + 'px':
								style.left = (e.pageX - (self.popUpThumbnail.offsetWidth/2)) + 'px';
							break;
						case 'mouseout':		
							if(style.display === '')
								style.display = 'none';
							break;
				 	}		
				}
			};
		
			function totalVisitedToggle(e){
				var target = e.target;
				if(target.className === 'delicious-total-visited-container' || (target.parentNode.className === 'delicious-total-visited-container' && target.nodeName.toLowerCase() === 'span')){
					var visited;
					(target.nodeName.toLowerCase() === 'div') ?
				 	 visited = target.firstChild.nextSibling: visited = target.nextSibling;
				 	switch(e.type){
				 		case 'mouseover':
				     		if(visited.style.visibility === 'hidden')
				  	   		 	visited.style.visibility = 'visible';			 	
				 			break;
						case 'mouseout':		
				 			if(visited.style.visibility === 'visible') 
					 			visited.style.visibility = 'hidden';
							break;
				 	}
				}	 						
			};	
			
			function mp3PlayerStyle(e){
				var target = e.target;
				if(target.className === 'ymp-skin' && (target.nodeName.toLowerCase() === 'em')){
					var style = 'a.ymp-btn-page-play, a.ymp-btn-page-pause {padding-left:0px !important;}'
							  + 'a.ymp-btn-page-play em.ymp-skin, a.ymp-btn-page-pause em.ymp-skin {left:-25px; top:0px;}'
					GM_addStyle(style);	
				}
			};
		},		
		addFaviconAndThumbnail: function(link){
			if(link.parentNode.nodeName.toLowerCase() !== 'h4') return;	
			this.addFavicon(link);	
			this.addThumbnail(link);
			this.addLinkContainer(link);	   
			this.addTotalVisited(link);
		},
		addTotalVisited: function(link){
			var totalVisited;
			var div = document.createElement('div');
			var divStyle = div.style;
			div.className = 'delicious-total-visited-container';
			if((link.offsetHeight < 40) && ($X('.//a[@class="inlinesave"]').length === 0))
				divStyle.marginTop = '20px';
			if(link.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.className === 'image'){
				divStyle.marginTop = '0px';
				divStyle.marginBottom = '20px';
				link.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute('style','clear:both;');
			}	
			if(GET_TOTAL_VISITED.hasOwnProperty(link.href))
				totalVisited = GET_TOTAL_VISITED[link.href].total || 0;
			else
			     totalVisited = 0;
			var span = document.createElement('span');
			var text = document.createTextNode(totalVisited);
			var visited = document.createElement('h5');
			var visitedStyle = visited.style;
			var visitedText = document.createTextNode('VISITED');
			visitedStyle.visibility = 'hidden';
			span.appendChild(text);
			visited.appendChild(visitedText);
			div.appendChild(span);
			div.appendChild(visited);
			var insertPoint = link.parentNode.parentNode.nextSibling;
			insertPoint.parentNode.insertBefore(div,insertPoint);
		},
		addFavicon: function(link){
			var fBox = document.createElement('div');
			var fStyle = fBox.style;
			fStyle.cssFloat = 'left';
			fStyle.minWidth = '16px';
			fStyle.minHeight = '16px';
			fStyle.margin = '0px 7px';
			var favi = document.createElement('img');
			favi.src = 'http://' + link.hostname + '/favicon.ico';
			favi.width = '16';
		
			favi.removeEventListener('error', revertIcon, false);
			favi.addEventListener('error', revertIcon, false);
   
			var parent = link.parentNode;
			fBox.appendChild(favi);
			parent.insertBefore(fBox,link);		
		},	
		addThumbnail: function(link){
			var self = this;
			var parent = link.parentNode;
			if(parent.parentNode.parentNode.firstChild.nextSibling.className != 'image'){
				if(parent.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.className != 'image') {
					var tBox = document.createElement('div');
					tBox.style.cssFloat = 'left';
					tBox.style.margin = '0px 3px 3px 0px';
					var a = document.createElement('a');
					a.href = link.href;
					a.target = '_blank';
					var thumb = document.createElement('img');
					thumb.src = GET_THUMBNAIL_API + link.href;
					thumb.alt = 'thumb';
					thumb.title = link.textContent;
					thumb.width = GET_THUMBNAIL_WIDTH;
					thumb.height = GET_THUMBNAIL_HEIGHT;
					thumb.style.border = '1px solid #c4c4c4';
					thumb.removeEventListener('error',revertImg,false);
					thumb.addEventListener('error',revertImg,false);
					a.appendChild(thumb);
					tBox.appendChild(a);
					parent.parentNode.parentNode.insertBefore(tBox, parent.parentNode);	     
				}
			}	
		},
		addLinkContainer: function(link){
			link.style.display = 'block';
			link.style.paddingLeft = '5px';
			var linkContainer = document.createElement('div');
			linkContainer.style.marginLeft = '30px';
			link.parentNode.replaceChild(linkContainer,link);
			linkContainer.appendChild(link);	
		},
		saveButton: function(link){
			if(!link) return;
			if(link.parentNode.nodeName.toLowerCase() == 'div') return;
			var saveBox = document.createElement('div');
			saveBox.style.marginTop = '5px';
			saveBox.style.marginLeft = '30px';
			link.parentNode.replaceChild(saveBox,link);
			saveBox.appendChild(link);
		},
		tagChainLabel: function(e){
			if(e.parentNode.className === 'tag-chain-label-container') return;
			var targetPoint = e.nextSibling.nextSibling;
			if(e.nextSibling.nextSibling.className !== 'tagdisplay')
				targetPoint = e.nextSibling.nextSibling.nextSibling;
			var container = document.createElement('div');
			container.className = 'tag-chain-label-container';
			container.setAttribute('style','float:right; position:relative;');
			container.appendChild(e);
			targetPoint.insertBefore(container,targetPoint.firstChild);	
			if(e.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.offsetHeight > 20){
				e.parentNode.parentNode.setAttribute('style','margin-top:50px !important;');
			}
		},
		sideBar: function(){
			if(!(/\/url\//.test(location.href))){
				var self = this;
				var insertEle = document.getElementById('sidebar');
				
				function sideBarContents(className,text,appendEle,top){
					var toggle = document.createElement('div');
					toggle.style.marginBottom = '10px';		
					if(top && location.href.match(/search\?(p=|context=)/)) 
						toggle.style.marginTop = '25px';								
					toggle.className = className;
					var h3 = document.createElement('h3');
					toggle.appendChild(h3);
					var span = document.createElement('span');
					span.className = 'toggle-button';
					span.innerHTML = text;
					h3.appendChild(span);
					toggle.appendChild(appendEle);		 
					insertEle.insertBefore(toggle, insertEle.firstChild);
					span.addEventListener('click', function(e){
						setToggleOnOff(e);
					}, false);  				
				};
			
				if(location.href !== 'http://' + location.hostname + '/'){	
					sideBarContents(GET_THUMBNAIL_API_TOGGLE,'Thumbnail Api Url',this.thumbnailApiSetBox);
					sideBarContents(GET_THUMBNAIL_SIZE_TOGGLE,'Thumbnail Size',this.sizeSetBox);
				}
				
				sideBarContents(GET_MOST_VISITED_TOGGLE,'Most Visited Top 10',this.mostVisitedBox);
				sideBarContents(GET_TOTAL_VISITED_TOGGLE,'Total Visited',this.totalVisitedBox,true);


				document.addEventListener('click',function(e){
					var target = e.target;
					if(e.button !== 0) return;
					switch(target.className){
						case 'm thumbnail-Api-url-setButton':
							thumbnailAipUrlChangeEvent(target);
							break;
				  
						case 'm thumbnail-size-changeButton':
							thumbnailSizeChangeEvent(target);
							break;
						
						case 'm total-visited-onOffButton':
					  		totalVisitedOnOffChangeEvent(target);
							break;
						e.preventDefault();  
					}
				},false);
				
				if((insertEle.firstChild.id !== 'sidenav-title')){
					var sidenavTitle = document.getElementById('sidenav-title');
					if(sidenavTitle)
						sidenavTitle.firstChild.nextSibling.style.marginTop = '10px'
				}
	
				function setToggleOnOff(e){
					var target = e.target;
					var toggleBox = target.parentNode.parentNode;
					var toggleClass = toggleBox.className;
					(toggleClass === 'sidebar-list toggle on') ? toggleClass = 'sidebar-list toggle off': toggleClass = 'sidebar-list toggle on';	      	
					switch(target.textContent){
						case 'Thumbnail Api Url':
							DELICIOUS_INFO.thumbnailApiToggle = toggleClass;
							break;
						case 'Thumbnail Size':
							DELICIOUS_INFO.thumbnailSizeToggle = toggleClass;
							break;
						case 'Total Visited':
							DELICIOUS_INFO.totalVisitedToggle = toggleClass;	
							break;
						case 'Most Visited Top 10':
							DELICIOUS_INFO.mostVisitedToggle = toggleClass;
							break;
					}
					setValue();
				};

				function thumbnailAipUrlChangeEvent(target){
			 		var style = target.style;
			 		var api = target.getAttribute('api');
					DELICIOUS_INFO.thumbnailApi = api;	
					setValue();
					
					sideBarButtonStyleChangeEvent('id("thubnailApi-setBox")/li[@class="isCurrentTag"]',target);
				 
					$X('.//a/img[@alt="thumb"]').forEach(function(img){
					    var imgSrc = img.src;
					    var nowApiUrl = imgSrc.match(/^https?:\/\/.*https?:\/\//);
						if(nowApiUrl !== null){
							nowApiUrl = nowApiUrl.toString().replace(/https?:\/\/$/, "");
							var api = target.getAttribute('api');
							imgSrc = imgSrc.replace(nowApiUrl, api);
							img.setAttribute('src', imgSrc);
						}
					});		 	
				};

				function totalVisitedOnOffChangeEvent(target){
					var style;
					var targetStyle = target.style;
					
					(target.parentNode.parentNode.className === 'isCurrentTag') ?
					 target.parentNode.parentNode.className = '': target.parentNode.parentNode.className = 'isCurrentTag';				
					
					if(target.textContent.match(/^on/ig)){
						target.parentNode.parentNode.nextSibling.className = '';
						style = '.delicious-total-visited-container {display:block !important;}';
					}
					else{
						target.parentNode.parentNode.previousSibling.className = '';
						style = '.delicious-total-visited-container {display:none !important;}';
					}				
					GM_addStyle(style);
					DELICIOUS_INFO.totalVisitedOnOff = target.textContent;
					setValue();
				};
		
				function thumbnailSizeChangeEvent(target){
					var path = 'id("sizeSetBox")/li[@class="isCurrentTag"]';
					var width = target.getAttribute('thumbnailWidth');
					var height = target.getAttribute('thumbnailHeight');
					
					switch(target.textContent.toLowerCase()){
						case 'small': 
							sideBarButtonStyleChangeEvent(path,target);
							setThumbnailInfo(width,height);
							nowThumbnailSizeChange(width,height);
							break;
						case 'medium': 
							sideBarButtonStyleChangeEvent(path,target);
							setThumbnailInfo(width,height);
							nowThumbnailSizeChange(width,height);
							break;
						case 'large': 
							sideBarButtonStyleChangeEvent(path,target);
							setThumbnailInfo(width,height);
							nowThumbnailSizeChange(width,height);
							break;					 
					}	
				
					function setThumbnailInfo(w,h){
						DELICIOUS_INFO.thumbnailWidth = w;
						DELICIOUS_INFO.thumbnailHeight = h;
						setValue();
					};
			   
					function nowThumbnailSizeChange(width,height){
						var style = 'a > img[alt="thumb"] {width:'+width+'px; height:'+height+'px; }';
						GM_addStyle(style);						
					};	 
				};		
		 
				function sideBarButtonStyleChangeEvent(path,target){
					$X(path).forEach(function(li){
						li.className = '';
					});
					target.parentNode.parentNode.className = 'isCurrentTag';
				};		  
		 		 
			}
			return this;		  
		},
		addStyle: function(){
			var description = Number(GET_THUMBNAIL_WIDTH) + 40;
        	var style = '#content a:visited, #bookmarklist a:visited {opacity: 0.5 !important;}'
					  + 'ul.bookmarks li.post h4 a {background-color: #EFF5FB;}'
					  + 'ul.bookmarks li.post h4 a:visited {opacity: 0.5;}'
	               	  + 'ul.bookmarks li.post h4 a:hover {color: #fff; text-decoration: none; background-color: #3472D0;}'
	                  + '.main #popular ul.bookmarks li.post .bookmark {padding-left:80px;}'
	               	  + 'ul li.post .bookmark .full-url {margin: 5px 3px;}'
	               	  + 'ul.bookmarks li.post .TITLEONLY h4 a.taggedlink, ul.bookmarks li.post .TITLEONLY h4 .editdel {float: none;}'
	               	  + 'ul.bookmarks li.post h4 .editdel a.action {padding: 0px 5px;}'
	                  + '.full-url {display:none !important;}'
	               	  + 'div.tagdisplay {margin-left: 0em;}'						  
	  
	 	              + 'img[width][height][alt="thumb"]:hover {opacity: 0.6; border: 1px solid #3472D0 !important;}'   
				 
					  + 'div.delicious-total-visited-container {float:right; position:relative;}'
				      + 'div.delicious-total-visited-container > span {font-size:100%; font-weight:bold; color:#FFFFFF; background-color:#7CBA0F; padding:4px 5px; cursor:pointer;}'
				      + 'div.delicious-total-visited-container > h5 {font-size:76%; position:absolute; top:1px; right:-6.3em; width:6em;}'
		
			if(!(/\/url\//.test(location.href)) && (location.pathname.length > 1)){
			  	style += 'ul.bookmarks li.post .description {margin-left: ' + description + 'px; margin-bottom: 10px; width: 82%;}';
		  		style += 'div.tagdisplay {margin-top: 0px;}';
			}     
			if(GET_TOTAL_VISITED_ON_OFF === 'off')
				style += 'div.delicious-total-visited-container {display:none;}';
					
			GM_addStyle(style);	   
			return this;		
		}
 	};	
 
 	new delicious().addStyle().sideBar().init();	
	totalVisitedCount(); 
 }
 else{
 	if(document.referrer.match(/^https?:\/\/(www.)?delicious\.com/)) 
		return;
	totalVisitedCount();	
 }	
 	

 function revertIcon(event) {
 	var no_favicon = 'data:image/gif;base64,R0lGODlhEAAQAKIAAMXFxf///+/v79/f3/f398zMzObm5v///yH5BAUUAAcALAAAAAAQABAAAANGeFbcPSfGQoK9gQAoSyagIBiBsXUfSIjfeXiqKmDFhH3iGNTvjbM8jy9GCPpSIOMxprwRmxdi0XakUauWYAU7PQwc4MchAQA7';
	this.src = no_favicon;
 };
 
 function revertImg(event) {
    var img = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAKKAooDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEz+J7DI59cZPbvWbJrWkRSPDLqenxyxkCSN722R4yfuqyNKGDE8AAE5wO4zznxEvrrSvAvjHUbOUw3dl4e1i7tZk+/BJDYSMjIePm8wbuvcnOQK/J2QLK7SShppJARNLOVlklJ/iY+WhDA8hg2QQCMdgD9jLfUbC7YraXtpduoyyW1zBM6j1ZUkJA+uKt7hkL3IJA9lIDfkWAP1GM1+Omn315pN9BqGj3B0y9gkikiuLRTA6yxOHjeRg7eaFcBirBQ2OSM1+nPwi+IFv8RPCdrqmQmq2Pl2GuQlNrJfpAjmRRk5huYzFNG+QWO9CimMgAHqdITjHBPPOMcD1OSOB3xk+gNLTJfuMR2VjnOCMK2CPU9sccE/QgFa51Cysyou7u1tS4zH9pubeDzAOpQSyKWAOATjgkVFDq+l3EqQwajYTSvkJHFe2skjEdlRJmdv+AqfevzU+O2o3mofFDxVDeXE9zb6fexWllbSSn7PaxJZWrERQkOgZ2YsXwGGSBwxry2wvLjSru31DT5prG7tZopobi2kKTK0ciSFQyiMbXRHU7g/O3AA3GgD9jQQeRn05BB/IgGlqhpckk2madNMxeWWxtJJWJyWke3jZ2JwuSWJJOBnPSrU08NvHJLNIkUcUbzSyOwRI4owWkkd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9rjwwmOS2htrlFiSzFu0cUkaWsES7Yog4kRQBU074STQat4f1LV/HfijxF/wi2pR6jotnqj2TQ22LSa1dJBBBE80sqTPGLiV3lWJGVXPmSZAPG/GGr+EfFXxS8S6R8T/ABO2keEfCKWVhonht769s49Xv5rVLi71G7uLAid4kdsL9oZlRCELAAkdd4JW38FfFO08G+GNTbUvAfi3wpc+J9HsRetf2+j3Vpc7GOk3Qlk2Wl2N5YOVEgIL7yAa9G8X/CTQPFGpHXre6vPDviCSF7a61fSltyuoWbR+SLXU7C9juLK9j8kLEWlh3bF2ghNqrg+DfghpXgrXrPxDYeIdYmu47C8sb+CW20sWN5BdzNcNBAiabnTbJbhjKtrYvDFuO4AsSxAPdqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z';
	this.src = img;
 };
	
 function setValue(){
	GM_setValue('delicious-site-info',DELICIOUS_INFO.toSource());
 };

 function clearTotalVisited(){
	DELICIOUS_INFO.totalVisited = undefined;
	GM_setValue('delicious-site-info',DELICIOUS_INFO.toSource());
 };

 function totalVisitedCount(){
	var url = location.href;
	if(typeof GET_TOTAL_VISITED[url] !== 'object') GET_TOTAL_VISITED[url] = {};
	GET_TOTAL_VISITED[url] = GET_TOTAL_VISITED[url] || (GET_TOTAL_VISITED[url] = {});
	GET_TOTAL_VISITED[url].url = url;
	GET_TOTAL_VISITED[url].total = GET_TOTAL_VISITED[url].total + 1 || 1;
	setValue();  	
 };
 
 function $X(exp, ctx){
    var xp = (ctx && ctx.ownerDocument || document).evaluate(exp, ctx || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
    r = [];
    for (var i = 0;i < xp.snapshotLength;++i) r.push(xp.snapshotItem(i));
    return r;
 };
 
})();