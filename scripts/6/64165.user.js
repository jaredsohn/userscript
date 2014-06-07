// ==UserScript==
// @name           TubeWall-2
// @namespace      http://userscripts.org/users/105016
// @description    电视墙-2
// @include        *
// @exclude        http://www.youtube.com/*
// ==/UserScript==

/*******************************************************\
* 
* 电视墙是 YouTube 辅助脚本。
* 
* 它可以将网页中的 YouTube链接 转化成 TubeWall链接，点击
* 后可直接观看。
* 
* 还可以将网页中的 YouTube播放器 转化成 TubeWall播放器，
* 这样网页中的YouTube视频就不会开天窗了。
* 
* 并且还提供多种视频格式下载功能。
* 支持浏览器：Firefox, Google Chrome 4+
*  
\*******************************************************/

var stamp = Number(new Date());
var iconYouTube = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAADQ0P8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv/Q0P8PCv8AAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoAAOoPCv8PCv8PCv////8+Pv+sqv////////8+Pv/Fw/////+jov8PCv+Jhv/////Ixv8PCv8PCv8PCv////8+Pv////8PCv////8+Pv////8PCv////+Ihf////8PCv8PCv8PCv8PCv8PCv////8+Pv////8PCv////8+Pv////8PCv////+Ihf/////////Ixv8PCv8PCv8PCv////8+Pv////8PCv////8+Pv////////+sqv8PCv+sqv/r6//Ixv8PCv8PCv8PCv////8PCv8PCv8PCv8PCv8PCv////8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv////////////8PCv8PCv8PCv8PCv////8PCv8PCv8PCv8PCv8PCv8PCv8PCv/Q0P8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv8PCv/Q0P////////////////////////////////////////////////////////////////////////+d4fMAAAD9+8////87gKsAAAC6dVT///9en8sAAACaUjb///////////////////+d4fMAAAD9+8+d4fMAAAD///8AAAD9+88WXYv9+88AAAD///////////////////+d4fMAAAD9+8+d4fMAAAD///8AAAD9+88AAAD///8AAAD///////////////////9en8sAAADbuJH///87gKsAAAC6dVT///8AAAD///8AAAD///////////////////8AAAD8lewAAAD///////////////////////////////////////////////9en8sPOWz///+aUjbbuJH///////////////////////////////////////8AAD4KAAA8awAAPmMAAC5hAABsZQAAcmkAAC50AABrZQAAY3IAAHRvAAAvawAAPgoAADxzAABpbgAAY28AAGFw';

var TubeWall = {
	style: ''
		+'.TubeWall-'+stamp+'{'
				+'text-decoration: none;'
				+'display: inline-block;'
				+'border: 1px solid;'
				+'min-height: 18px;'
				+'padding: 2px;'
				+'padding-left: 20px;'
				+'-moz-border-radius:5px;'
				+'-webkit-border-radius:5px;'
				+'background: url('+iconYouTube+') no-repeat 2px 50% ;'
			+'}'
		
		+'.TubeWall-'+stamp+' img{'
			+'border: none;'
		+'}'
		
		+'.TubeWallLightbox-Content-'+stamp+'{'
			+'display:none;'
			+'position: fixed;'
			+'background-color: #fff;'
			+'border:#333 solid 5px;'
			+'-moz-border-radius:10px;'
			+'-webkit-border-radius:10px;'
			+'z-index: 2000;'
		+'}'

		+'.TubeWallLightbox-Overlay-'+stamp+'{'
			+'display: none;'
			+'height: 100%;'
			+'width: 100%;'
			+'position: fixed;'
			+'margin:0;'
			+'opacity: 0.5;'
			+'top:0;'
			+'left:0;'
			+'z-index:1000;'
			+'background-color: #000;'
		+'}'

		+'.TubeWall-'+stamp+':hover{'
			+'background-color: #ddeef6 !important;'
		+'}'

		+'.TubeWallPlayer-'+stamp+'{'
			+'-moz-border-radius:5px;'
			+'-webkit-border-radius:5px;'
			+'border: 1px solid;'
			+'display: inline-block;'
		+'}'

		+'.TubeWallPlayer-'+stamp+' a{'
			+'text-decoration: none;'
		+'}'

		+'.player-flash-'+stamp+'{'
			+'padding: 5px;'
		+'}'

		+'.tubewall-player-toolbar-'+stamp+'{'
			+'font-size: 1em;'
			+'margin: 0px;'
			+'padding: 2px;'
			+'padding-left: 23px;'
			+'border-top: 1px solid;'
			+'word-wrap: break-word;'
			+'background: url('+iconYouTube+') no-repeat 5px 50% !important;'
		+'}'

		+'.tubewall-menu-'+stamp+'{'
			+'position: relative;'
			+'display: inline-block;'
		+'}'

		+'.tubewall-menu-popup-'+stamp+'{'
			+'position: absolute;'
			+'border: #000 solid 1px;'
			+'background: #fff;'
			+'-moz-border-radius:5px;'
			+'-webkit-border-radius:5px;'
		+'}'
		+'.tubewall-menu-popup-'+stamp+' input{'
			+'width: 190px;'
			+'text-align: left;'
			+'border: solid 1px;'
			+'margin: 2px;'
		+'}'

		+'.tubewall-menu-item-over-'+stamp+'{'
			+'background: #000;'
			+'color: #fff;'
			+'font-weight: bold;'
		+'}',

	 reg: /^https?:\/\/www\.youtube\.com\/watch\?(?:.*&)?v=([_\-\d\w]+)/gi,
	reg1: /^https?:\/\/www\.youtube\.com\/v\/([_\-\d\w]+)/gi,
	
	playerCache: {},

	lightbox: function(){
		
		if(this._lightbox)
			return this._lightbox;

		this._lightbox = {};
		this._lightbox.overlay = document.createElement('div');
		this._lightbox.overlay.setAttribute('class','TubeWallLightbox-Overlay-'+stamp);
		this._lightbox.content = document.createElement('div');
		this._lightbox.content.setAttribute('class','TubeWallLightbox-Content-'+stamp);

		this._lightbox.show = function(elem){
			this.overlay.style.display = "block";
			
			if(elem){
				this.content.innerHTML = '';
				this.content.appendChild(elem);
			}

			this.content.style.display = "block";
			this.content.style.top = (window.innerHeight - this.content.clientHeight) * 0.618 / 2 + 'px';
			this.content.style.left = (window.innerWidth - this.content.clientWidth) / 2 + 'px';
			
		};
		
		this._lightbox.hide = function(){
			this.overlay.style.display="none";
			this.content.style.display="none";	
		};

		this._lightbox.overlay.addEventListener('click',(function(box){
			return function(){
				box.hide();
			}
		})(this._lightbox),true);

		document.body.appendChild(this._lightbox.overlay);
		document.body.appendChild(this._lightbox.content);
		
		return this._lightbox;
	},
	
	run: function(){
		var p = TubeWall.process;
		document.addEventListener('DOMNodeInserted', function(e){
			p(e.target);
		}, true);
		p();
		
		var style = document.createElement('style');
		style.innerHTML = TubeWall.style;
		document.getElementsByTagName('head')[0].appendChild(style);
	},
	
	process: function(elem){
		TubeWall.processLink(elem);
		TubeWall.processPlayer(elem);
	},

	processLink: function(elem){
		elem = elem || document;

		if(!elem.getElementsByTagName)
			return;

		var a = elem.getElementsByTagName('a');
		
		function click(m){
			return function(e){
				if(!TubeWall.playerCache[m[1]]){
					var height = window.innerHeight * 0.618;
					var width = height * window.screen.width / window.screen.height;
					TubeWall.playerCache[m[1]] = TubeWall.createPlayer(m[1],width, height);
				}

				var player = TubeWall.playerCache[m[1]];
				TubeWall.lightbox().show(player);
				e.preventDefault();
			}
		}
		
		for(var i=0,l = a.length; i<l; i++){
			var m;
			while((m = TubeWall.reg.exec(a[i].href)) != null){
				a[i].addEventListener('click', click(m),true);
				a[i].className += (' ' + 'TubeWall-'+stamp);
			}
		}

	},
	
	processPlayer: function(elem){
		elem = elem || document;

		if(!elem.getElementsByTagName)
			return;

		var embed = elem.getElementsByTagName('embed');

		for(var i=0,l = embed.length; i<l; i++) {
			
			var src = embed[i].getAttribute('src');
			var width = embed[i].getAttribute('width');
			var height = embed[i].getAttribute('height');
			var m = null;
			while((m = TubeWall.reg1.exec(src)) != null){
				var player = TubeWall.createPlayer(m[1],width,height);
				embed[i].parentNode.insertBefore( player, embed[i].nextSibling );
				embed[i].parentNode.removeChild(embed[i]);
				src = null; // I don't know why, but it works.
			}
		}

	},
	
	createPlayer: function(videoId, width, height){
		width = width || 640;
		height = height || 505;

		var flashvars = "file="+ TubeWall.server + videoId + "/video.mp4&amp;image=http://i.ytimg.com/vi/" + videoId + "/0.jpg";

		var player = document.createElement('div');
		player.className = 'TubeWallPlayer-' + stamp;
		
		var playerFlash = document.createElement('div');
		playerFlash.className = 'player-flash-' + stamp;
		
		playerFlash.innerHTML =
			 '<embed '
			+' src="http://developer.longtailvideo.com/player/tags/mediaplayer-4.5/player.swf"'
			+' quality="high"'
			+' allowfullscreen="true"'
			+' wmode="Transparent"'
			+' type="application/x-shockwave-flash"'
			+' width="'+width+'"'
			+' height="'+height+'"'
			+' flashvars="'+flashvars+'"'
			+' ></embed>';

		var titleMenu = TubeWall.createMenu('<b>TubeWall-2&nbsp;</b>');
		
		var downloadMenu = TubeWall.createMenu('<input type="button" value="下载视频">');
		downloadMenu.addMenuItem(TubeWall.createMenuItem('<form action="'+TubeWall.server+videoId+'/5" method="post"><input type="submit" value="Normal/Low Quality (FLV)"></form>'));
		downloadMenu.addMenuItem(TubeWall.createMenuItem('<form action="'+TubeWall.server+videoId+'/35" method="post"><input type="submit" value="High Quality (FLV)"></form>'));
		downloadMenu.addMenuItem(TubeWall.createMenuItem('<form action="'+TubeWall.server+videoId+'/18" method="post"><input type="submit" value="High Quality (MP4)"></form>'));
		downloadMenu.addMenuItem(TubeWall.createMenuItem('<form action="'+TubeWall.server+videoId+'/22" method="post"><input type="submit" value="True High Def (720p)"></form>'));
		downloadMenu.addMenuItem(TubeWall.createMenuItem('<form action="'+TubeWall.server+videoId+'/37" method="post"><input type="submit" value="True High Def (1080p)"></form>'));
		downloadMenu.addMenuItem(TubeWall.createMenuItem('<form action="'+TubeWall.server+videoId+'/17" method="post"><input type="submit" value="Cellphone Format (3GP)"></form>'));
		
		
		var helpMenu = TubeWall.createMenu('<input type="button" value="帮助">');
		helpMenu.addMenuItem(TubeWall.createMenuItem('<form action="http://userscripts.org/topics/39914" target="_blank"><input type="submit" value="如何找视频？"></form>'));
		helpMenu.addMenuItem(TubeWall.createMenuItem('<form action="http://userscripts.org/topics/40234" target="_blank"><input type="submit" value="关于视频下载格式"></form>'));
		helpMenu.addMenuItem(TubeWall.createMenuItem('<form action="http://userscripts.org/scripts/source/62296.user.js" target="_blank"><input type="submit" value="更新脚本"></form>'));
		helpMenu.addMenuItem(TubeWall.createMenuItem('<form action="http://userscripts.org/scripts/discuss/62296" target="_blank"><input type="submit" value="反馈"></form>'));
		helpMenu.addMenuItem(TubeWall.createMenuItem('<form action="http://userscripts.org/scripts/show/62296" target="_blank"><input type="submit" value="关于TubeWall-2"></form>'));
		
		
		var playerToolbar = TubeWall.createToolbar();
		playerToolbar.addMenu(titleMenu);
		playerToolbar.addMenu(downloadMenu);
		playerToolbar.addMenu(helpMenu);

		player.appendChild(playerFlash);
		player.appendChild(playerToolbar.getElement());

		return player;

	},
	
	createToolbar: function(){
		var bar = {};
		bar._menus = [];

		bar.getElement = function(){
			if(this._element)
				return this._element;

			this._element = document.createElement('div');
			this._element.className = 'tubewall-player-toolbar-' + stamp;
			for(var i=0,l=this._menus.length; i<l; i++){
				this._element.appendChild(this._menus[i].getElement());
			}
			return this._element;
		};

		bar.addMenu = function(menu){
			this._menus.push(menu);
			menu.setToolbar(this);
		};

		return bar;
	},
	
	createMenuItem: function(html){
		var item = {};
		item._html = html;
		item.getElement = function(){
			if(this._element)
				return this._element;

			this._element = document.createElement('div');
			this._element.innerHTML = this._html;
			this._element.addEventListener('mouseover',function(e){
				e.target.className = 'tubewall-menu-item-over-' + stamp;
			},true);
			this._element.addEventListener('mouseout',function(e){
				e.target.className = '';
			},true);
			return this._element;
		};

		return item;
	},

	server: 'http://tubewall.zobyhost.com/',

	createMenu: function(html){
		
		var menu = {};
		menu._items = [];
		menu._html = html;
		
		menu.getElement = function(){
			if(this._element)
				return this._element;

			this._button = document.createElement('div');
			this._button.innerHTML = this._html;

			this._button.addEventListener('click',(function(tb, self){
				return function(){
					if(tb){
						ms = tb._menus;
						snapshot = self._popup.style.display;
						for(var i=0,l=ms.length; i<l; i++){
							ms[i]._popup.style.display = 'none';
						}

						if(snapshot == 'block'){
							self._popup.style.display='none';
						}else{
							self._popup.style.display='block';
						}
					}
				};
			})(this._toolbar, this),true);
			
			this._popup = document.createElement('div');
			this._popup.className = 'tubewall-menu-popup-' + stamp;
			this._popup.style.display = 'none';
			for(var i=0,l=this._items.length; i<l; i++){
				this._popup.appendChild(this._items[i].getElement());
			}
			this._popup.addEventListener('click',(function(pop){
				return function(){
					pop.style.display = 'none';
				}
			})(this._popup),true);

			this._element = document.createElement('div');
			this._element.className = 'tubewall-menu-' + stamp;
			this._element.appendChild(this._button);
			this._element.appendChild(this._popup);
			return this._element;
		};

		menu.addMenuItem = function(item){
			this._items.push(item);
		};

		menu.setToolbar = function(toolbar){
			this._toolbar = toolbar;
		};

		return menu;
	}

	
};

TubeWall.run();