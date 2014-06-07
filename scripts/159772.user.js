// ==UserScript==
// @name		BGMOnBilibili
// @namespace		http://dothack.tk/
// @version		0.2.1
// @description		利用Bangumi在Bilibili上追(新)番- -b
// @include		http://www.bilibili.tv/*
// @grant		GM_xmlhttpRequest
// @updateURL		https://userscripts.org/scripts/source/159772.meta.js
// @downloadURL		https://userscripts.org/scripts/source/159772.user.js
// @copyright  		2013+, dothack.tk
// ==/UserScript==

BOB = {
	config: {
		//设置项的值一般大小写敏感
		waitTime: 60000, //观看时间超过1分钟便将此话记录为"已观看"(泡面番你懂的)
		BGM: 'bangumi.tv', // 解决某些情况自动跳转无法登陆其中一个站点问题 需要时可替换为'bgm.tv'等
		locale: 'CN', //设置显示番组名称的默认语言，'CN'即显示中文，'JP'则日文
		scrollSpeed: 50, //侧边栏上滑轮滚动的速度，数值越大滚动幅度越大，不建议设置为10以下
		notify: 'on', //是否提示在当前页面检测到的番组和进度信息(在该提示信息消失前可作出选择是否发送该进度)
		notificationWaitTime: 3500, //提示用消息栏的停留时间(当鼠标移至消息栏时，计时停止，直至鼠标移开)；当'notify'置为'off'时，此项不可用
		restrictedMode: 'off', //番组名匹配模式，当频繁遭遇检测到的番组牛头不对马嘴的情况时，可以设置为'on'
		MAMA: 'off' //添加HTML5播放器，能在非IE浏览器中获得较低的资源消耗(源自"妈妈再也不用担心我的macbook发烫了计划"，详见http://zythum.sinaapp.com/youkuhtml5playerbookmark/)
	},
	
	getEpisode: function(){
		var titleFull = document.head.innerHTML.match(/<title>(.*?)\ -\ /)[1];
		var epArr = titleFull.match(/\d{2,3}/g);
		if(titleFull.match(/\d{4,}/m) != null)
			epArr = null
		if(epArr != null){
			var len = epArr.length;
			var episode = -1;
			var index = titleFull.indexOf(epArr[len - 1]);
			var titleIndex = titleFull.search(/[\)）\]】]/) + 1;
			if(titleFull.search(/[\(（\[【]/) != 0)
				titleIndex = 0;
			if(len > 1){
				var preIndex = titleFull.indexOf(epArr[len - 2]);
				var start = preIndex + epArr[len - 2].length;
				if(index < start)
					index = start + titleFull.substr(start).indexOf(epArr[len - 1]);
			}
			if(titleIndex != 0 && index > titleIndex){
				var tmp = index + epArr[len - 1].length;
				if(!(titleFull[tmp] == ')' && titleFull.length == tmp + 1))
					episode = epArr[len - 1];
			}
			console.log('episode: ' + episode);
			return parseInt(episode, 10);
		}else
			return -1;
	},

	getAnimeName: function(){
		var self = this;
		var nameRaw = document.head.innerHTML.match(/<title>.*?[\)）\]】](.*?)\ *\d{2,3}\D*?(?:\((\d+)\))*\ -\ /);
		if(nameRaw == null){
			if(self.config.restrictedMode == 'off')
				nameRaw = document.head.innerHTML.match(/<title>(.*?)\d{2,3}\D*?(?:\((\d+)\))*\ -\ /);
			else
				return '';
		}
		var name = [];
		if(nameRaw != null){
			name.push(nameRaw[1]);
			var tagRaw = document.body.innerHTML.match(/kwtags\(\[.*?\],\[/)[0].split('\'');
			for(var i in tagRaw){
				if(i%2 != 0 && typeof(tagRaw[i]) == 'string')
				name.push(tagRaw[i]);
			}
		}
		else
			return '';
		return name;
	},

	getAnimeId: function(name, callback){
		var self = this;
		if(name == '')
			callback(-1, '',  '', '');
		console.log('animeName/tags: ' + name);
		setTimeout(
			function(){
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://' + self.config.BGM + '/calendar',
					headers: {
						'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'
					},
					onreadystatechange: function(response){
						if(response.readyState == 4)
							console.log('getAnimeId_1: Sent');
					},
					onload: function(response){
						var animeIdRaw = null;
						for(var i = 0; i < name.length; i++){
							if(name[i] == '')
								continue;
							var reExp = new RegExp('(http://lain.bgm.tv/pic/cover/.*?)\'.*?(?:\n.*?){3,4}<a href=\"/subject/([0-9]+)\".*?' + name[i] + '.*?</.*?'); 
							animeIdRaw = response.responseText.match(reExp);
							if(animeIdRaw != null){
								callback(parseInt(animeIdRaw[2], 10), name[i], animeIdRaw[1].replace(/cover\/./, 'cover/g'));
								break;
							}
						}
						//console.log(name);
						if(animeIdRaw == null && name.length != 0 && name[0] != ''){
							//not tested out yet. for bangmi which is NOT on bgm.tv/calendar.
							setTimeout(
								function(){
									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://' + self.config.BGM + '/subject_search/' + encodeURIComponent(name[0]) + '?cat=2',
										headers: {
											'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'
										},
										onreadystatechange: function(response){
											if(response.readyState == 4)
												console.log('getAnimeId_2: Sent');
										},
										onload: function(response){
											var hasResult = response.responseText.match(/<ul\ id=\"browserItemList\".*?>([\s\S]*?)<\/ul>/m)[1];
											if(hasResult != '' && typeof(hasResult) != 'undefined' ){
												var result = response.responseText.match(/<a\ href=\"\/subject\/(.*?)\"\ class[\s\S]*?(http:\/\/lain\.bgm\.tv\/pic\/cover.*?)\"[\s\S]*?<small\ class=\"grey\">(.*?)<\/small/);
												callback(parseInt(result[1], 10), result[3], result[2].replace(/cover\/./, 'cover/g'));
											}
											else{
												callback(-1, name[0], '', '')
											}
										}
									});
								}
							, 0)
						}
					}
				});
			}
		, 0);
	},

	getUid: function(callback){
		var self = this;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://' + self.config.BGM,
					headers: {
						'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'
					},
					onreadystatechange: function(response){
						if(response.readyState == 4)
							console.log('getUid: Sent');
					},
					onload: function(response){
						var uid = '';
						var container = response.responseText.match(/<div\ class=\"badgeUser\">([\s\S]*?)<\/div>/)[1]
						var match = container.match(/<a class=\"name\" href=\".*?\/user\/(.*?)\">/);
						if(match)
							uid = match[1];
						callback(uid);
					}
				});
			}
		,0)
	},

	getAllProgress: function(uid, callback){
		var self = this;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://api.bgm.tv/user/' + uid + '/collection?cat=watching&rand=' + Math.random(),
					headers:{
						'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'
					},
					onreadystatechange: function(response){
						if (response.readyState == 4) {
							console.log('getAllProgress: Sent');
						};
					},
					onload: function(response){
						var BGMList = [];
						try{
							var doingList = JSON.parse(response.responseText);
							//console.log(doingList);
							for(var i = 0; i < doingList.length; i++){
								var id = doingList[i]['subject']['id'],
									name = doingList[i]['name'],
									nameCN = doingList[i]['subject']['name_cn'],
									epStatus = doingList[i]['ep_status'],
									eps = doingList[i]['subject']['eps'],
									image = doingList[i]['subject']['images']['small'],
									airWeekday = doingList[i]['subject']['air_weekday'];
								BGMList.push([id, name, nameCN, epStatus, eps, image, airWeekday]);
							}
						}
						catch(e){
							console.log(e.name + ': ' +e.message);
						}
						finally{
							callback(BGMList);
						}
					}
				});
			}
		,0);
	},

	sendData: function(id, animeId, episode){
		var self = this;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://' + self.config.BGM + '/subject/'+ animeId +'/interest/update',
					headers: {
						'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Referer': 'http://' + self.config.BGM,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'referer=subject&interest=' + id + '&update=' + encodeURIComponent('保存'),
					onreadystatechange: function(response){
						if(response.readyState == 4)
							console.log('sentData_step1: Sent');
					},
					onload: function(response){
						setTimeout(function(){
							GM_xmlhttpRequest({
								method: 'POST',
								url: 'http://' + self.config.BGM + '/subject/set/watched/'+ animeId,
								headers: {
									'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
									'Referer': 'http://' + self.config.BGM,
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data: 'referer=subject&submit=' + encodeURIComponent('更新') +'&watchedeps=' + episode,
								onreadystatechange: function(response){
									if(response.readyState == 4)
										console.log('sentData_step2: Sent');
								},
								onload: function(response){
									//console.log(response.responseText);
								}
							});
						}
						, self.config.waitTime);
					}
				});
			}
		, 0)
	},

	fadeIn: function(ele, speed, opacity){
		speed = speed || 10;
		opacity = opacity || 1.00;
		ele.style.display = 'block';
		ele.style.opacity = 0;
		var val = 0;
		(function(){
			ele.style.opacity = val;
			val += 0.05;
			if(val <= opacity){
				setTimeout(arguments.callee, speed);
			}else
				ele.style.opacity = 1;
				ele.style.display = 'block';
		})();
	},

	fadeOut: function(ele, speed, opacity){
		speed = speed || 10;
		opacity = opacity || 0;
		var val = 1.00;
		(function(){
			ele.style.opacity = val;
			val -= 0.05;
			if(val >= opacity){
				setTimeout(arguments.callee, speed);
			}else if(val < 0){
				ele.style.opacity = 0;
				ele.style.display = 'none';
			}
		})();
	},

	insertCss: function(css){
		var style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		document.head.appendChild(style);
	},

	mouseScroll: function(ele, fn){
		var roll = function(event){
			var delta = 0,
				e = arguments[0] || window.event;
			delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
			fn(delta);
			event.stopPropagation();
			event.preventDefault();
		}
		if(navigator.userAgent.indexOf('Firefox') > -1){
			ele.addEventListener('DOMMouseScroll', roll, false);
		}else{
			ele.onmousewheel = roll;
		}
	},

	showWatching: function(ele, BGMList){
		var self = this;
		var weekdayNames={'0': '今日', '1': '周一', '2': '周二','3': '周三', '4': '周四', '5': '周五', '6': '周六', '7': '周日'};
		if(BGMList.length == 0)
			return 0;
		var docFrag = document.createDocumentFragment(),
			pane = document.createElement('div'),
			subList = document.createElement('ul');
		pane.setAttribute('class', 'pane');
		for(var i = 0; i < BGMList.length; i++){
			if(BGMList[i][3] == BGMList[i][4]){
				self.toggleState(2, BGMList[i][0]);
				continue;
			}
			var sub = document.createElement('li');
			var epNext = ' ' + (parseInt(BGMList[i][3], 10) + 1),
				name = (self.config.locale == 'CN') ? BGMList[i][2] : BGMList[i][1],
				eps = '[' + BGMList[i][3] + '/' + BGMList[i][4]+ ']',
				image = BGMList[i][5];
			var now = new Date(),
				dayCurrent = now.getDay();
			var airWeekday = (dayCurrent == BGMList[i][6]) ? weekdayNames['0'] : weekdayNames[BGMList[i][6]];
			sub.innerHTML = '<a href=\"http://www.bilibili.tv/search?keyword='+ name + epNext + '\"><img src=\"' + image + '\" alt=\"' + name + '\" title=\"' + name + ' ' + eps + ' ' + airWeekday + '放送\" /></a>';
			subList.appendChild(sub);
		}
		//console.log(subList);
		pane.appendChild(subList);
		docFrag.appendChild(pane);
		ele.innerHTML = '';
		ele.appendChild(docFrag);
	},

	toggleState: function(state, animeId){
		var self = this;
		setTimeout(
			function(){
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://' + self.config.BGM + '/subject/'+ animeId +'/interest/update',
					headers: {
						'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Referer': 'http://' + self.config.BGM,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'referer=subject&interest=' + state + '&update=' + encodeURIComponent('保存'),
					onreadystatechange: function(response){
						if(response.readyState == 4)
							console.log('toggleState: Sent; StateCurrent: ' + state);
					},
					onload: function(response){
						//console.log(response.responseText);
					}
				});
			}
		, 0)
	},

	showNotification: function(animeId, name, episode, image){
		var self = this;
		//console.log(self.isLogin);
		var notification = document.createElement('div');
		if(name.length > 24)
			name = name.substr(0, 22) + '...';
		notification.setAttribute('id', 'BOBNotification');
		notification.innerHTML = '<div><img src="' + image + '" alt="' + name + '" /></div><div><p><i>--- </i>检测到：</p>' + (self.isLogin ? '' : '<p><i><b>！尚未登陆</b></i><p>') +'<p>' + name + '</p><p>' + episode + '话</p>\
		<p>是否正确？<input type="radio" id="BOBChoice1" value="correct" name="choice"' + (self.isLogin ? ' checked="checked"' : '') + '>YES<input type="radio" value="wrong" name="choice"' + (self.isLogin ? '' : ' checked="checked"') + '>NO</p></div>';
		var notificationClass = '#BOBNotification{position: fixed; z-index: 9999999; display: block; padding: 5px 3px 5px 3px; background: #2AF; border: 1px solid #8BE; width: 200px; margin-top: 5px; margin-left: ' + (document.documentElement.clientWidth - 220) + 'px;}\n\
			#BOBNotification div{display: table-cell; vertical-align: middle; font: 12px/1.125 Microsoft YaHei,Helvetica,sans-serif}\n\
			#BOBNotification img{margin-right: 5px}';
		self.insertCss(notificationClass);
		document.body.insertBefore(notification,document.body.firstChild);
		self.fadeIn(notification);
		var listener = function(event){
			if(event.type == 'mouseover'){
				clearTimeout(timer);
				//console.log('timer: '+timer+' cleared');
				notification.removeEventListener('mouseover', listener, false);
			}
			else{
				var relate = event.relatedTarget;
				if(relate == null || relate.tagName == 'DIV' || relate.tagName == 'BODY'){
					if(relate != notification){
						notification.addEventListener('mouseover', listener, false);
						timer = setTimeout(function(){
							self.userChoice(notification, animeId, episode);
							self.fadeOut(notification, 60);
							notification.removeEventListener('mouseout', listener, false);
							notification.removeEventListener('mouseover', listener, false);
						}, self.config.notificationWaitTime - 1000);
					}
				}
			}
		};
		var timer = setTimeout(function(){
			self.userChoice(notification, animeId, episode);
			self.fadeOut(notification, 60);
			//console.log('timer fired');
			notification.removeEventListener('mouseover', listener, false);
			notification.removeEventListener('mouseout', listener, false);
		}, self.config.notificationWaitTime)
		notification.addEventListener('mouseover', listener, false);
		notification.addEventListener('mouseout', listener, false);
	},

	userChoice: function(ele, animeId, episode){
		var self = this;
		var items = ele.getElementsByTagName('INPUT');
		for(var i =0; i < items.length; i ++){
			if(items[i].checked == true){
				if(items[i].value == 'correct'){
					self.sendData(3, animeId, episode);
					ele.lastChild.lastChild.innerHTML = '√ 确认发送当前进度信息';
				}
				else{
					ele.lastChild.lastChild.innerHTML = 'X 已取消发送此进度信息'
				}		
			}
		}
	},

	mama: function(){
		var l = document.createElement('link');
		l.setAttribute('rel','stylesheet');
		l.setAttribute('media','all');
		l.setAttribute('href','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.css');
		document.body.appendChild(l);
		var s = document.createElement('script');
		s.setAttribute('src','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.js');
		document.body.appendChild(s);
	}
}

document.addEventListener('DOMContentLoaded', function(event){
	setTimeout(
		function(){
			var BGMPlugin = document.createElement('div');
			BGMPlugin.setAttribute('id', 'BGMPlugin');
			BGMPlugin.innerHTML = '<img src="http://bgm.tv/favicon.ico" alt="BGMPlugin" />';
			document.body.insertBefore(BGMPlugin,document.body.firstChild);
			BGMPlugin.style.cssText = 'position: fixed; display: block; margin-left: 5px; margin-top: 5px; z-index: 9999999;';

			var watchingList = document.createElement('div');
			watchingList.setAttribute('id', 'watchingList');
			document.body.insertBefore(watchingList,document.body.firstChild);
			var watchingListClass = '#watchingList{position:fixed;z-index: 9999999;background-color:#1F1F1F;height:' + document.documentElement.clientHeight + 'px;width:100px;border:1px solid black;border-left:0px;display:none;overflow:hidden;}\n\
				#watchingList li{border:1px solid #1F1F1F;}\n\
				.pane{position:relative;}';
			BOB.insertCss(watchingListClass);

			BGMPlugin.addEventListener('mouseover', function(event){
				//console.log(event.target);
				BOB.fadeOut(BGMPlugin);
				BOB.fadeIn(watchingList);
			}, false);
			watchingList.addEventListener('mouseout', function(event){
				if(event.relatedTarget != null && event.relatedTarget.tagName != 'IMG' && event.relatedTarget.tagName != 'LI'){
					//console.log(event.target.tagName + event.currentTarget.tagName + event.relatedTarget.tagName);
					BOB.fadeOut(watchingList);
					BOB.fadeIn(BGMPlugin);
				}
			}, false);
			if(document.location.pathname.indexOf('bdad') == -1){
				var organize = function(BGMList){
					if(BGMList.length == 0){
						watchingList.innerHTML = '<div class=\"pane\"><a href=\"http://' + BOB.config.BGM + '/login\" target="_blank" style=\"color:white;\"><img src=\"http://lain.bgm.tv/pic/user/l/icon.jpg\" alt=\"尚未登陆\" style=\"border:3px solid #1F1F1F;\"/><p>尚未登陆' + BOB.config.BGM + '</p></a></div>';
						return 0;
					}
					BOB.showWatching(watchingList, BGMList);
					BOB.mouseScroll(watchingList.firstChild,function(delta){
						var obj = watchingList.firstChild,
							previous = parseInt(obj.offsetTop, 10),
							increasement = delta * BOB.config.scrollSpeed,
							minTop = document.documentElement.clientHeight - watchingList.firstChild.clientHeight;
						var current = (previous + increasement > 0) ? 0 : previous + increasement;
						current = (current < minTop) ? minTop : current;
						obj.style.top = current + "px";
					})
				}
				BOB.getUid(function(uid){
					console.log('uid: ' + uid);
					if(uid == ''){
						watchingList.innerHTML = '<div class=\"pane\"><a href=\"http://' + BOB.config.BGM + '/login\" target="_blank" style=\"color:white;\"><img src=\"http://lain.bgm.tv/pic/user/l/icon.jpg\" alt=\"尚未登陆\" style=\"border:3px solid #1F1F1F;\"/><p>尚未登陆' + BOB.config.BGM + '</p></a></div>';
						BOB.isLogin = false;
						return 0;
					}
					BOB.isLogin = true;
					BOB.getAllProgress(uid, organize);
				});
			}

			if(document.location.pathname.indexOf('/video/av') != -1){
				if(BOB.config.MAMA == 'on')
					BOB.mama();
				var episode = BOB.getEpisode();
				if (episode == -1)
					return -1;
				BOB.getAnimeId(BOB.getAnimeName(), function(animeId, animeName, image){
					console.log('animeId: ' + animeId);
					if(animeId != -1){
						if(BOB.config.notify == 'on')
							(function(){
								if(typeof(BOB.isLogin) == 'undefined')
									setTimeout(arguments.callee, 1000);
								else
									BOB.showNotification(animeId, animeName, episode, image);
							})();
						else
							BOB.sendData(3, animeId, episode);
					}
				});
			}
		}
		, 0);
}, false);