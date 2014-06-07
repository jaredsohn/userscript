// ==UserScript==
// @name           PureTNA Quick Thumbnail Preview
// @namespace      http://www.userscripts.org
// @include        http://www.puretna.com/browse.php*
// @include        http://puretna.com/browse.php*
// @include        http://www.puretna.com/wishlist.php*
// @include        http://puretna.com/wishlist.php*
// @include        http://www.puretna.com/userdetails.php*
// @include        http://puretna.com/userdetails.php*
// @require        http://usocheckup.redirectme.net/55431.js
// ==/UserScript==

PTnASearch = {
	hasTimeout : false,
	picId : 0,
	picNo : 1,
	mouseX : 0,
	mouseY : 0,
	img : null,
	div : null,
	visible : false,
	keepVisible : false,
	request : null,
	descRequest : null,
	thxRequest : null,
	descInterval : null,
	direction : 1,
	autoSearch : null,
	autoComment : null,
	autoCommentMessage : null,
	retriesMax : 5,
	retries : 0,
	console : {
			log: function(msg) {},
			info: function(msg) {},
			warn: function(msg) {},
			error: function(msg) {},
			debug: function(msg) {}
		},
	switchAutoThanks : function() {
			PTnASearch.autoThanks = !PTnASearch.autoThanks;
			try {
				GM_setValue('_PTNASEARCH_AUTO_THANKS_', PTnASearch.autoThanks);
			} catch(e) {
				PTnASearch.console.warn(e);
			}
			var msg = PTnASearch.autoThanks ?
						'You will now automatically thank the uploader when you download a torrent with PureTnA Quick Thumbnail Preview.' :
						'You will no longer automatically thank the uploader when you download a torrent with PureTnA Quick Thumbnail Preview.';
			alert(msg);
		},
	switchAutoComment : function() {
			PTnASearch.autoComment = !PTnASearch.autoComment;
			try {
				GM_setValue('_PTNASEARCH_AUTO_COMMENT_', PTnASearch.autoComment);
			} catch(e) {
				PTnASearch.console.warn(e);
			}
			var msg = PTnASearch.autoComment ?
						'You will now automatically leave a comment when you download a torrent with PureTnA Quick Thumbnail Preview.\n\t(Your current message: '+PTnASearch.autoCommentMessage+')' :
						'You will no longer automatically leave a comment when you download a torrent with PureTnA Quick Thumbnail Preview.';
			alert(msg);
		},
	editAutoComment : function() {
			PTnASearch.autoCommentMessage = prompt('Please enter you auto-comment message:', GM_getValue('_PTNASEARCH_AUTO_COMMENT_MESSAGE_')?GM_getValue('_PTNASEARCH_AUTO_COMMENT_MESSAGE_'):'');
			try {
				GM_setValue('_PTNASEARCH_AUTO_COMMENT_MESSAGE_', PTnASearch.autoCommentMessage);
			} catch(e) {
				PTnASearch.console.warn(e);
			}
		},
	editHiddenCategories : function() {
			PTnASearch.hiddenCategories = prompt('Seperate several categories with a |', GM_getValue('_PTNASEARCH_HIDE_CATEGORY_')?GM_getValue('_PTNASEARCH_HIDE_CATEGORY_').replace(/\\([\(\)])/g,'$1'):'');
			try {
				GM_setValue('_PTNASEARCH_HIDE_CATEGORY_', PTnASearch.hiddenCategories.replace("(","\\(").replace(")","\\)"));
			} catch(e) {
				PTnASearch.console.warn(e);
			}
		},
	mouseOverListener : function(e) {
			if (!PTnASearch.keepVisible) {
				PTnASearch.visible = true;
				PTnASearch.picNo = 1;
				if (this.parentNode.nextSibling.tagName != 'TD') {
					if (this.parentNode.nextSibling.nextSibling.firstChild.href != undefined)
						PTnASearch.picId = this.parentNode.nextSibling.nextSibling.firstChild.href.replace(/.*id=(\d+).*$/,'$1');
					else
						PTnASearch.picId = this.parentNode.parentNode.parentNode.parentNode.href.replace(/.*id=(\d+).*$/,'$1');
				} else {
					if (this.parentNode.nextSibling.firstChild.href != undefined)
						PTnASearch.picId = this.parentNode.nextSibling.firstChild.href.replace(/.*id=(\d+).*$/,'$1');
					else
						PTnASearch.picId = this.parentNode.parentNode.parentNode.parentNode.href.replace(/.*id=(\d+).*$/,'$1');
				}
				PTnASearch.mouseX = e.pageX;
				PTnASearch.mouseY = e.pageY-document.body.scrollTop;
				PTnASearch.showPic();
			}
		},
	mouseOutListener : function() {
			if (!PTnASearch.keepVisible) {
				PTnASearch.visible = false;
				if (PTnASearch.hasTimeout)
					window.setTimeout(PTnASearch.hideDiv, 100);
				else
					PTnASearch.hideDiv();
			}
		},
	mouseMoveListener : function(e) {
			if (PTnASearch.visible && !PTnASearch.keepVisible) {
				PTnASearch.mouseX = e.pageX;
				PTnASearch.mouseY = e.pageY-document.body.scrollTop;
				PTnASearch.makeVisible();
			}
		},
	hideDiv : function() {
			window.clearInterval(PTnASearch.descInterval);
			if(!PTnASearch.visible) PTnASearch.div.style.display = 'none';
		},
	mouseScrollListener : function(e) {
			window.clearInterval(PTnASearch.descInterval);
			if (PTnASearch.visible) {
				if (e.detail > 0) {
					PTnASearch.picNo++;
					PTnASearch.showPic();
				} else if (e.detail < 0) {
					PTnASearch.picNo--;
					PTnASearch.showPic();
				}
				e.stopPropagation();
				e.preventDefault();
			}
		},
	keyUpListener : function(e) {
			window.clearInterval(PTnASearch.descInterval);
			if (PTnASearch.visible) {
				switch(e.keyCode) {
				case 39:
					PTnASearch.picNo++;
					PTnASearch.showPic();
					break;
				case 37:
					PTnASearch.picNo--;
					PTnASearch.showPic();
					break;
				case 16:
					if (PTnASearch.img.alt != 'No Image' && PTnASearch.img.alt != 'Loading...' && PTnASearch.img.src != location.href)
						window.open(PTnASearch.img.src);
					break;
				case 46:
					PTnASearch.downloadTorrent();
					break;
				case 17:
					PTnASearch.thxRequest = new XMLHttpRequest();
					if (location.href.substring(0,11) == "http://www.")
						PTnASearch.thxRequest.open('GET', 'http://www.puretna.com/details.php?id='+PTnASearch.picId+'&thank='+PTnASearch.picId, true);
					else
						PTnASearch.thxRequest.open('GET', 'http://puretna.com/details.php?id='+PTnASearch.picId+'&thank='+PTnASearch.picId, true);
					PTnASearch.thxRequest.send(null);
					PTnASearch.msg.innerHTML = '&nbsp;&nbsp;&nbsp;Thanks for the thanks!';
					if (PTnASearch.hasTimeout)
						window.setTimeout(function() { PTnASearch.msg.innerHTML = ''; }, 2000);
					break;
				case 45:
					if (PTnASearch.description.innerHTML == '') {
						PTnASearch.descRequest = new XMLHttpRequest();
						if (location.href.substring(0,11) == "http://www.")
							PTnASearch.descRequest.open('GET', 'http://www.puretna.com/details.php?id='+PTnASearch.picId, true);
						else
							PTnASearch.descRequest.open('GET', 'http://puretna.com/details.php?id='+PTnASearch.picId, true);
						PTnASearch.descRequest.onreadystatechange = PTnASearch.descriptionListener;
						PTnASearch.descRequest.send(null);
					} else {
						PTnASearch.description.innerHTML = '';
					}
					break;
				}
			}
			if (e.ctrlKey) {
				var page = 0;
				if (location.search.search(/page=\d+/) != -1)
					var page = location.search.replace(/^.*page=(\d+).*$/, '$1')*1;
				switch (e.keyCode) {
				case 37:
					if (page == NaN || page == 0) {
						if (PTnASearch.hasTimeout) {
							document.getElementsByTagName('center')[1].style.background = 'red';
							window.setTimeout(function() { document.getElementsByTagName('center')[1].style.background = ''; }, 1000);
						}
					} else {
					page--;
					location.search = location.search.replace(/&?page=\d+/i, '') + '&page='+page;
					}
					break;
				case 39:
					page++;
					location.search = location.search.replace(/&?page=\d+/i, '') + '&page='+page;
					break;
				}
			}
		},
	downloadTorrent : function() {
		if (PTnASearch.autoThanks) {
			PTnASearch.thxRequest = new XMLHttpRequest();
			if (location.href.substring(0,11) == "http://www.")
				PTnASearch.thxRequest.open('GET', 'http://www.puretna.com/details.php?id='+PTnASearch.picId+'&thank='+PTnASearch.picId, true);
			else
				PTnASearch.thxRequest.open('GET', 'http://puretna.com/details.php?id='+PTnASearch.picId+'&thank='+PTnASearch.picId, true);
			PTnASearch.thxRequest.send(null);
		}
		if (PTnASearch.autoComment) {
			try {
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://www.puretna.com/comment.php?action=add",
					data: "tid="+PTnASearch.picId+"&text="+encodeURIComponent(PTnASearch.autoCommentMessage),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {}
				});
			} catch(e) {
				PTnASearch.console.warn(e);
			}
		}
		window.location.href = 'http://down.puretna.com/download.php?&i='+PTnASearch.picId;
	},
	descriptionListener : function() {
			if (PTnASearch.descRequest.readyState == 4) {
				PTnASearch.description.innerHTML = PTnASearch.descRequest.responseText.replace(/[\n\r]+/g, '').replace(/^.+Description<\/td><td valign="top" align=left>(.*?)<\/td>.+$/i, '$1');
			}
			if (PTnASearch.hasTimeout && PTnASearch.description.scrollHeight > PTnASearch.description.offsetHeight) {
				PTnASearch.direction = 1;
				PTnASearch.description.scrollTop = 0;
				PTnASearch.descInterval = window.setInterval(PTnASearch.scrollDescription, 100);
			}
		},
	scrollDescription : function() {
			if ((PTnASearch.description.scrollTop+PTnASearch.description.offsetHeight < PTnASearch.description.scrollHeight && PTnASearch.direction > 0) ||
					(PTnASearch.description.scrollTop > 0 && PTnASearch.direction < 0))
				PTnASearch.description.scrollTop += PTnASearch.direction*3;
			else {
				PTnASearch.direction *= 2;
				if (PTnASearch.direction == 32)
					PTnASearch.description.scrollTop = PTnASearch.description.scrollHeight - PTnASearch.description.offsetHeight;
				else if (PTnASearch.direction == -32)
					PTnASearch.description.scrollTop = 0;
				if (Math.abs(PTnASearch.direction) == 32)
					PTnASearch.direction = -1 * (PTnASearch.direction / Math.abs(PTnASearch.direction));
			}
		},
	dblClickListener : function(e) {
			window.location.href = 'http://www.puretna.com/details.php?id='+PTnASearch.picId;
		},
	windowResizeListener : function(e) {
			var img = document.getElementById('ptnasearch_keepimg');
			if (img.offsetHeight < window.innerHeight) {
				img.style.top = Math.floor((window.innerHeight - img.offsetHeight) / 2) + 'px';
			} else {
				img.style.top = '0';
			}
		},
	keepLoadListener : function(e) {
			var img = document.getElementById('ptnasearch_keepimg');
			img.src = PTnASearch.img.src;
			PTnASearch.windowResizeListener(null);
		},
	singleClickListener : function(e) {
			if (!PTnASearch.keepVisible) {
				PTnASearch.keepVisible = true;
				document.body.style.overflow = 'hidden';
				
				var blocker = document.createElement('div');
				blocker.id = 'ptnasearch_blocker';
				blocker.style.position = 'fixed';
				blocker.style.zIndex = 2000;
				blocker.style.background = 'rgba(0,0,0, 0.975)'
				blocker.style.width = '100%';
				blocker.style.height = '100%';
				blocker.style.top = 0;
				blocker.style.left = 0;
				blocker.style.overflowY = 'auto';
				document.body.appendChild(blocker);
				
				var img = document.createElement('img');
				img.id = 'ptnasearch_keepimg';
				img.src = PTnASearch.img.src;
				img.style.maxHeight = '100%';
				img.style.maxWidth = '100%';
				img.style.display = 'block';
				img.style.margin = 'auto';
				img.style.position = 'relative';
				img.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); img.style.maxHeight = img.style.maxHeight==''?'100%':''; }, false);
				blocker.appendChild(img);
				
				var actions = document.createElement('div');
				actions.id = 'PTnASearch_actions';
				var style = document.createElement('style');
				style.innerHTML = '#PTnASearch_actions { opacity: 0; } #PTnASearch_actions:hover { opacity: 1; } #PTnASearch_actions > p.next { float: right; } #PTnASearch_actions > p.prev { float: left; }';
				actions.appendChild(style);
				actions.style.position = 'fixed';
				actions.style.zIndex = 2002;
				actions.style.top = 0;
				actions.style.left = 0;
				actions.style.width = '100%';
				actions.style.background = 'rgba(50,50,50,0.8)';
				blocker.appendChild(actions);
				var next = document.createElement('p');
				next.appendChild(document.createTextNode('>>'));
				next.style.color = 'rgba(255,255,255, 0.588)';
				next.style.fontWeight = 'bold';
				next.style.fontSize = '20px';
				next.className = 'next';
				next.style.cursor = 'pointer';
				next.style.marginRight = '5px';
				next.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); PTnASearch.picNo++; PTnASearch.showPic(); }, false);
				actions.appendChild(next);
				var prev = document.createElement('p');
				prev.appendChild(document.createTextNode('<<'));
				prev.style.color = 'rgba(255,255,255, 0.588)';
				prev.style.fontWeight = 'bold';
				prev.style.fontSize = '20px';
				prev.className = 'prev';
				prev.style.cursor = 'pointer';
				prev.style.marginRight = '5px';
				prev.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); PTnASearch.picNo--; PTnASearch.showPic(); }, false);
				actions.appendChild(prev);
				
				var others = document.createElement('p');
				others.style.color = 'rgba(255,255,255, 0.588)';
				others.style.fontWeight = 'bold';
				others.style.textAlign = 'center';
				others.style.fontSize = '20px';
				actions.appendChild(others);
				blocker.addEventListener('click', PTnASearch.singleClickListener, false);
				var dl = document.createElement('span');
				dl.appendChild(document.createTextNode('DOWNLOAD'));
				dl.style.cursor = 'pointer';
				dl.style.margin = '0 5px';
				dl.className = 'dl';
				dl.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); PTnASearch.downloadTorrent(); }, false);
				others.appendChild(dl);
				
				
				window.addEventListener('resize', PTnASearch.windowResizeListener, false);
				PTnASearch.img.addEventListener('load', PTnASearch.keepLoadListener, false);
				PTnASearch.windowResizeListener(null);
			} else { 
				PTnASearch.keepVisible = false;
				document.body.style.overflow = '';
				PTnASearch.mouseOutListener(null);
				window.removeEventListener('resize', PTnASearch.windowResizeListener, false);
				PTnASearch.img.removeEventListener('load', PTnASearch.keepLoadListener, false);
				var blocker = document.getElementById('ptnasearch_blocker');
				blocker.parentNode.removeChild(blocker);
				blocker = null;
			}
	
	//document.title += '.';
			/*PTnASearch.keepVisible = !PTnASearch.keepVisible;
			if (!PTnASearch.keepVisible) {
				document.removeEventListener('click', PTnASearch.singleClickListener, false);
				PTnASearch.mouseOutListener();
				var actions = document.getElementById('PTnASearch_actions');
				actions.parentNode.removeChild(actions);
				actions = null;
			} else {
				document.addEventListener('click', PTnASearch.singleClickListener, false);
				var actions = document.createElement('div');
				actions.id = 'PTnASearch_actions';
				var style = document.createElement('style');
				style.innerHTML = '#PTnASearch_actions { opacity: 0; } #PTnASearch_actions:hover { opacity: 1; } #PTnASearch_actions > p.next { float: right; } #PTnASearch_actions > p.dl { float: left; }';
				actions.appendChild(style);
				actions.style.position = 'absolute';
				actions.style.zIndex = 9999;
				actions.style.top = 0;
				actions.style.left = 0;
				actions.style.width = '100%';
				actions.style.background = 'rgba(50,50,50,0.3)';
				PTnASearch.div.appendChild(actions);
				var next = document.createElement('p');
				next.appendChild(document.createTextNode('NEXT'));
				next.style.color = 'rgba(255,255,255, 0.588)';
				next.style.fontWeight = 'bold';
				next.style.fontSize = '20px';
				next.className = 'next';
				next.style.cursor = 'pointer';
				next.style.marginRight = '5px';
				next.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); PTnASearch.picNo++; PTnASearch.showPic(); }, true);
				actions.appendChild(next);
				var dl = document.createElement('p');
				dl.appendChild(document.createTextNode('DOWNLOAD'));
				dl.style.color = 'rgba(255,255,255, 0.588)';
				dl.style.fontWeight = 'bold';
				dl.style.textAlign = 'left';
				dl.style.fontSize = '20px';
				dl.style.cursor = 'pointer';
				dl.style.marginLeft = '5px';
				dl.className = 'dl';
				dl.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); PTnASearch.downloadTorrent(); }, true);
				actions.appendChild(dl);
				
			}
			//e.preventDefault();
			e.stopPropagation();*/
		},
	errorListener : function(e) {
			if (PTnASearch.retries < PTnASearch.retriesMax) {
				console.info('retry'+PTnASearch.retries);
				PTnASearch.retries++;
				this.src = '';
				PTnASearch.showPic();
				return;
			} else {
				if (PTnASearch.picNo != 1) {
					if (PTnASearch.hasTimeout) {
													   PTnASearch.div.style.borderColor = 'red';
						window.setTimeout(function() { PTnASearch.div.style.borderColor = '';	},250);
						window.setTimeout(function() { PTnASearch.div.style.borderColor = 'red';},500);
						window.setTimeout(function() { PTnASearch.div.style.borderColor = '';	},750);
					}
					PTnASearch.picNo = 1;
					PTnASearch.showPic();
					return;
				}
				PTnASearch.img.alt = 'No Image';
				PTnASearch.img.setAttribute('style', 'max-width:inherit;max-height:inherit');
				PTnASearch.makeVisible();
			}
		},
	loadListener : function() {
			PTnASearch.img.src = PTnASearch.img.title;
			PTnASearch.img.alt = PTnASearch.picNo;
			PTnASearch.img.setAttribute('style', 'max-width:inherit;max-height:inherit');
			PTnASearch.retries = 0;
		},
	makeVisible : function() {
			if (PTnASearch.visible)
				PTnASearch.div.style.display = 'block';
			PTnASearch.div.style.left = (PTnASearch.mouseX+15) + 'px';
			PTnASearch.div.style.maxWidth = (window.innerWidth - PTnASearch.mouseX - 41) + 'px';
			PTnASearch.div.style.maxHeight = (window.innerHeight-4) + 'px';
			PTnASearch.div.style.top = (PTnASearch.mouseY+PTnASearch.div.offsetHeight<=window.innerHeight? 
												PTnASearch.mouseY : 
												window.innerHeight-PTnASearch.div.offsetHeight)+'px';
		},
	readyStateChangeListener : function() {
			if (PTnASearch.request.readyState == 4) {
				var pic = PTnASearch.request.responseText.replace(/\n|\r/g," ").replace(/^.+(http:[^"]+fetch\.php[^"]+)".+$/,"$1").replace("amp;","");
				var img = new Image();
				img.src = pic;
				PTnASearch.img.title = pic;
				img.addEventListener('error', PTnASearch.errorListener, true);
				img.addEventListener('load', PTnASearch.loadListener, true);
			}
		},
	showPic : function() {

			window.clearInterval(PTnASearch.descInterval);
			PTnASearch.msg.innerHTML = '';
			PTnASearch.description.innerHTML = '';
			PTnASearch.img.alt = 'Loading...';
			PTnASearch.img.src = '';
			PTnASearch.makeVisible();
			PTnASearch.request = new XMLHttpRequest();
			if (location.href.substring(0,11) == "http://www.")
				PTnASearch.request.open('GET', "http://www.puretna.com/fullpic.php?pid="+PTnASearch.picId.replace("amp;","")+"-"+PTnASearch.picNo, true);
			else
				PTnASearch.request.open('GET', "http://puretna.com/fullpic.php?pid="+PTnASearch.picId.replace("amp;","")+"-"+PTnASearch.picNo, true);
			PTnASearch.request.setRequestHeader("Cache-Control", "no-cache");
			PTnASearch.request.onreadystatechange = PTnASearch.readyStateChangeListener;
			PTnASearch.request.send(null);
		},
	init : function() {
			window.setTimeout(function() { PTnASearch.hasTimeout = true; }, 0);
			
			try {
			if (console === undefined) {
				PTnASearch.console = {
					log: function(msg) {},
					info: function(msg) {},
					warn: function(msg) {},
					error: function(msg) {},
					debug: function(msg) {}
				};
			} else {
				PTnASearch.console = console;
			}
			} catch(e) {
				PTnASearch.console.warn(e);
			}
			
			PTnASearch.div = document.createElement('div');
			PTnASearch.div.style.position = 'fixed';
			PTnASearch.div.style.display = 'none';
			PTnASearch.div.style.border = '2px solid black';
			PTnASearch.div.style.background = 'white';
			PTnASearch.div.style.color = 'black';
			PTnASearch.div.id = 'PTnASearch_div';
			PTnASearch.img = document.createElement('img');
			PTnASearch.img.id = 'PTnASearch_img';
			PTnASearch.img.addEventListener('load', PTnASearch.makeVisible, false);
			PTnASearch.msg = document.createElement('h1');
			PTnASearch.msg.style.position = 'absolute';
			PTnASearch.msg.style.top = '0px';
			PTnASearch.msg.style.left = '0px';
			PTnASearch.msg.style.fontSize = '20px';
			PTnASearch.msg.style.background = 'white';
			PTnASearch.msg.style.width = '100%';
			PTnASearch.description = document.createElement('div');
			PTnASearch.description.style.position = 'absolute';
			PTnASearch.description.style.bottom = '0px';
			PTnASearch.description.style.left = '0px';
			PTnASearch.description.style.width = '100%';
			PTnASearch.description.style.background = 'rgba(0,0,0,0.9)';
			PTnASearch.description.style.color = 'rgb(255,255,255)';
			PTnASearch.description.style.maxHeight = '100%';
			PTnASearch.description.style.overflow = 'hidden';
			PTnASearch.div.appendChild(PTnASearch.description);
			PTnASearch.div.appendChild(PTnASearch.msg);
			document.getElementsByTagName('body')[0].appendChild(PTnASearch.div);
			PTnASearch.div.appendChild(PTnASearch.img);
			/*var inp = document.getElementsByTagName('input');
			var searchfield;
			for (var i=0;i<inp.length;i++)
			if (inp[i].type == 'text')
				searchfield = inp[i];
			var searchReg;
			var searchstr;
			try {
				searchstr = searchfield.value.replace(/([\(\)\[\]\+]|([^\s])-([^\s]))/g, '$2 $3').replace(/\s\s+/, ' ');
			} catch (err) {
				searchstr = '';
			}
			searchstr = searchstr.split(/[\s\+]/);
			searchparts = [];
			for (var i=0;i<searchstr.length;i++) {
				if (searchstr[i] !== null && searchstr[i][0] == '"') {
					var j=i+1;
					while (j < searchstr.length && searchstr[j-1][searchstr[j-1].length-1] != '"') {
						searchstr[i] += ' '+searchstr[j];
						searchstr[j] = null;
					}
					searchstr[i] = searchstr[i].replace(/"/gi,'');
				}
				if (searchstr[i] !== null && searchstr[i].length > 0 && searchstr[i][0] != '-')
					searchparts[searchparts.length] = searchstr[i];
			}
			console.info(searchparts);
			searchRegStr = '';
			for (var i=0;i<searchparts.length;i++) {
				searchRegStr += searchparts[i];
				if (i+1 < searchparts.length)
					searchRegStr += '|';
			}
			try {
				searchReg = new RegExp("("+searchRegStr+")", "ig");
			} catch (err) {
				PTnASearch.console.warn(e);
				searchReg = '';
			}*/
			var links = document.getElementsByTagName('a');
			var hideReg;
			try {
				hideReg = new RegExp("\\s"+(GM_getValue('_PTNASEARCH_HIDE_CATEGORY_')==null?'':GM_getValue('_PTNASEARCH_HIDE_CATEGORY_'))+"(,|$)", "i");
			} catch(e) {
				PTnASearch.console.warn(e);
				hideReg = '';
			}
			for (var i=0;i<links.length;i++) {
				if (links[i].href.search("details.php") > -1 && links[i].href.search("filelist") == -1 && links[i].href.search("comments") == -1 && links[i].href.search("userdetails") == -1) {
					if (document.location.href.search(/browse\.php/i) > -1) {
						if(links[i].parentNode.parentNode.nextSibling.nextSibling.children[0].innerHTML.search(hideReg) > -1) {
							links[i].parentNode.parentNode.style.display = 'none';
							links[i].parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
						}
						//if (searchRegStr != '')
							//links[i].innerHTML = links[i].innerHTML.replace(searchReg, '<span style="font-size: 1.3em;background: yellow;color:black;padding: 0 2px;">$1</span>');
					}
					if (links[i].parentNode.previousSibling.previousSibling !== null && links[i].parentNode.previousSibling.previousSibling !== undefined) {
						links[i].parentNode.previousSibling.previousSibling.firstChild.addEventListener('mouseover', PTnASearch.mouseOverListener, true);
						links[i].parentNode.previousSibling.previousSibling.firstChild.addEventListener('mouseout', PTnASearch.mouseOutListener, true);
						links[i].parentNode.previousSibling.previousSibling.firstChild.addEventListener('dblclick', PTnASearch.dblClickListener, true);
						links[i].parentNode.previousSibling.previousSibling.firstChild.addEventListener('click', PTnASearch.singleClickListener, true);
					} else {
						links[i].parentNode.previousSibling.firstChild.addEventListener('mouseover', PTnASearch.mouseOverListener, true);
						links[i].parentNode.previousSibling.firstChild.addEventListener('mouseout', PTnASearch.mouseOutListener, true);
						links[i].parentNode.previousSibling.firstChild.addEventListener('dblclick', PTnASearch.dblClickListener, true);
						links[i].parentNode.previousSibling.firstChild.addEventListener('click', PTnASearch.singleClickListener, true);
					}
				}
			}
			document.body.addEventListener('mousemove', PTnASearch.mouseMoveListener, true);
			document.body.addEventListener('DOMMouseScroll', PTnASearch.mouseScrollListener, true);
			window.addEventListener('keyup', PTnASearch.keyUpListener, true);
			window.focus();
			
			try {
				PTnASearch.autoSearch = GM_getValue('_PTNASEARCH_AUTO_THANKS_');
				PTnASearch.autoComment = GM_getValue('_PTNASEARCH_AUTO_COMMENT_');
				PTnASearch.autoCommentMessage = GM_getValue('_PTNASEARCH_AUTO_COMMENT_MESSAGE_');
			} catch(e) {
				PTnASearch.console.warn(e);
			}
			if (PTnASearch.autoThanks === undefined || PTnASearch.autoThanks === null)
				PTnASearch.autoThanks = true;
			if (PTnASearch.autoComment === undefined || PTnASearch.autoComment === null)
				PTnASearch.autoComment = false;
			if (PTnASearch.autoCommentMessage === undefined || PTnASearch.autoCommentMessage === null)
				PTnASearch.autoCommentMessage = 'Thank you!';
			try {
				GM_registerMenuCommand('[PTnA] Switch auto-thanks on/off', PTnASearch.switchAutoThanks);
				GM_registerMenuCommand('[PTnA] Switch auto-comment on/off', PTnASearch.switchAutoComment);
				GM_registerMenuCommand('[PTnA] Edit auto-comment', PTnASearch.editAutoComment);
				GM_registerMenuCommand('[PTnA] Edit hidden categories', PTnASearch.editHiddenCategories);
			} catch(e) {
				PTnASearch.console.warn(e);
			}
		}
};
PTnASearch.init();