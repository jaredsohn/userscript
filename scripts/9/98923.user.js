// ==UserScript==
// @name           miniblogImgPop
// @namespace      imgPop
// @descript	   鼠标移过小图弹出浮动大图的脚本
// @include        http://*t.sina.com.cn/*
// @include        http://*t.house.sina.com.cn/*
// @include        http://*t.163.com/*
// @include        http://*t.sohu.com/*
// @include        http://*t.qq.com/*
// @include        http://*t.ifeng.com/*
// @include        http://*t.baidu.com/*
// @include        http://*t.titan24.com/*
// @include        http://*t.people.com.cn/*
// @include        http://*my.tianya.cn/*
// ==/UserScript==

// @author		afc163
// @blog		http://www.ilovespringna.com
// @date		2010.8.12
// @modified	2010.9.14
// @modified	2010.9.17	修改代码使其只多增加一个img标签，无论计算大图大小和显示大图都使用同一个img标签
// @modified	2010.9.20	imgHeight等于10px，表示图片层的上下边框大小之和，其图片尚未载入
// @modified	2010.10.14	1.扩展此功能至新浪微博，腾讯微博，搜狐微博，网易微博，人民微博，体坛微博，百度说吧等微博网站，并改名为miniblogImgPop;
//							2.改进代码使之适应ajax载入新微博时的情况，在网速过慢（10秒内未能载入新微博）的情况下会失效;
//							3.修改动画参数和代码结构以进一步优化代码性能;
//							4.不处理iframe中的微博页面以避免某些性能问题;
//							5.独立出miniblogsConfig，方便对大部分微博网站进行扩展。config格式如下：
//							{"微博域名":{
//								className:"feed_img",			//需要注册弹出事件的标签className
//								otherSrc:"dynamic-src",			//延迟载入时用于保存图片地址的额外标签，有的网站不需要此项
//								sFrag:"thumbnail",				//小图的图片地址中的特征段，用于替换
//								bFrag:"bmiddle",				//大图的图片地址中的特征段，用于替换
//								newFeedBtns:["feed_msg_new"]	//导致ajax载入新微博的按钮id列表
//							}}.
// @modified	2010.10.15	增加cache存储上次的图片数据，用于提高效率和修复chrome下t.sohu.com的bug，但未能完全修复。。。
// @modified	2010.11.17	修改top!=this为top!=window，使之和spidemonkey兼容
// @modified	2010.11.17	增加对天涯微博的支持
// @modified	2010.12.06	1.增加对凤凰微博的支持
//							2.修改一个低网速下出现的图片载入错位的bug
// @modified	2010.12.16	1.根据增加了一个z键固定图片功能，按住z键后所有图片浮出和消失功能会失效，
//							  改进后看大图片时，只需要按住z键便可以上下滚动页面
// @modified	2010.1.6	修改了在腾讯微博和搜狐微博下，新feed载入时的init方式，改为每2.5秒绑定一次
//							  

(function(){
	//dont handle iframe situation
	if(top != window) return;
	var imgPop = (function(){
		//var date = null; //用于计算运行时间，调试使用
		var that = this,
			cache = {};
		cache.timer = null,
		cache.timerHeight = null,
		cache.siteName = "",
		cache.initRepeatCount = 0,			/* init函数重复自调用的次数 */
		cache.lastInitFeedsNumber = 0,		/* 上次执行时注册over事件的小图数量，刷新页面后为0 */
		cache.loc = window.location.href,
		cache.imgInfo = {},
		cache.zPressing = false;
		
		var miniblogsConfig = {
			"t.sina.com.cn":{
				className:"feed_img",
				otherSrc:"dynamic-src",
				sFrag:"thumbnail",
				bFrag:"bmiddle",
				bottomAddFeed:true,
				newFeedBtns:["feed_msg_new"]
			},
			"t.house.sina.com.cn":{
				className:"feed_img",
				otherSrc:"dynamic-src",
				sFrag:"thumbnail",
				bFrag:"bmiddle",
				bottomAddFeed:false,
				newFeedBtns:[]
			},
			"t.sohu.com":{
				className:"pic",
				otherSrc:"lazysrc",
				sFrag:["/f_","_1.jpg"],
				bFrag:["/m_","_0.jpg"],
				bottomAddFeed:true,
				newFeedBtns:["notice_container"]
			},
			"t.163.com":{
				className:"status-sPhoto",
				otherSrc:"",
				sFrag:"120&h=120",
				bFrag:"460",
				bottomAddFeed:false,
				newFeedBtns:["news","btn_more"]
			},
			"t.qq.com":{
				className:"pic",
				otherSrc:"crs",
				sFrag:"/160",
				bFrag:"/460",
				bottomAddFeed:true,
				newFeedBtns:["talkNew","moreList"]
			},
			"t.baidu.com":{
				className:"img-pre",
				otherSrc:"",
				sFrag:"",
				bFrag:"",
				bottomAddFeed:false,
				newFeedBtns:["timeline_count","list_more"]
			},
			"t.titan24.com":{
				className:"feedUserImg",
				otherSrc:"",
				sFrag:"_thumbnail",
				bFrag:"_middle",
				bottomAddFeed:false,
				newFeedBtns:[]
			},
			"t.people.com.cn":{
				className:"miniImg",
				otherSrc:"",
				sFrag:"/s_",
				bFrag:"/b_",
				bottomAddFeed:false,
				newFeedBtns:[]
			},
			"t.ifeng.com":{
				className:"t_img zoom_in_image",
				otherSrc:"",
				sFrag:"/128x160_",
				bFrag:"/520x0_",
				bottomAddFeed:false,
				newFeedBtns:["increment","more_tweet"]
			},
			"my.tianya.cn":{
				className:"boximg",
				otherSrc:"",
				sFrag:"small",
				bFrag:"middle",
				bottomAddFeed:false,
				newFeedBtns:["tt-list-hd","tt-list-more"]
			}
		};

		var $ = function(id){
			return document.getElementById(id);	
		};
		var $C = function(tag){
			return document.createElement(tag);
		};
		var $CN = function(className){
			return document.getElementsByClassName(className);
		};
		var getPos = function(source){
			var pt = {x:0,y:0,width:source.offsetWidth,height:source.offsetHeight};
			do{
				pt.x += source.offsetLeft;
				pt.y += source.offsetTop;
				source = source.offsetParent;
			}while(source);
			return pt;
		};
		var getImgSize = function(imgsrc){
			var cInfo = cache.imgInfo;
			//console.info(imgsrc + " [" + cInfo.src + "] " + cInfo.height);
			if(cInfo[imgsrc] && cInfo[imgsrc].height){
				//console.info(imgsrc+" : cache aimed 1");
				return function(){
					//console.info("cache aimed 2");
					return {
						width: cInfo[imgsrc].width,
						height: cInfo[imgsrc].height
					};
				};
			}
			else{
				var img = $("imgPop"), size, w, h;
				if(img){
					img.src = "";
					img.removeAttribute("src");
				}
				else{
					img = createImgPop(imgsrc);
				};
				//console.info("~~~~~~~imgsrc : "+img.src+" "+img.offsetHeight);
				img.src = imgsrc;
				//console.info("!!!!!!!imgsrc : "+img.src+" "+img.offsetHeight);
				return function(){
					w = parseInt(img.offsetWidth);
					h = parseInt(img.offsetHeight);
					if(w === cInfo.width && h === cInfo.height){
						return {width:0, height:0};
					}
					else{
						return {width:w, height:h};
					}
				};
			}
		};
		var saveImgInfo = function(o){
			//保存上一次图片的信息，用以缓存
			if(!cache.imgInfo[o.src] && parseInt(o.offsetHeight) !== 10 && parseInt(o.offsetHeight) !== 30){
				cache.imgInfo[o.src] = {width:parseInt(o.offsetWidth), height:parseInt(o.offsetHeight)};
				//console.info(o.src+" : cache added.");
			}
		};
		var getSiteName = function(){
			if(cache.siteName) return cache.siteName;
			var i, each;
			for(each in miniblogsConfig){
				if(cache.loc.indexOf(each) != -1){
					cache.siteName = each;
					return each;
				}
			}
			return "";
		};
		var getFeedImgs = function(){
			var i, each;
			for(each in miniblogsConfig){
				if(cache.loc.indexOf(each) != -1 && miniblogsConfig[each]){
					return $CN(miniblogsConfig[each]["className"]);
				}
			}
			throw "miniblogsConfig not found.";
		};
		var getBigImgsrc = function(obj){
			var tempimgs,
				tempimg,
				imgsrc,
				i,
				l,
				sname = getSiteName(),
				config = (sname && miniblogsConfig[sname]);
			tempimgs = obj.getElementsByTagName("IMG");
			if(tempimgs == null || tempimgs.length == 0){
				throw "取图片地址异常";
			}
			else{
				tempimg = tempimgs[0];
			}
			//针对各网站的特殊处理
			switch(sname){
				case "t.baidu.com":
					return /baiduTalk.imgScale\(this,\'(.*)\'\)/.exec(obj.innerHTML)[1];
					break;
				case "t.ifeng.com":
					break;
				case "my.tianya.cn":
					return tempimg.getAttribute("_exurl");
					break;	
			}
			//一般处理
			imgsrc = tempimg.getAttribute("src") || tempimg.getAttribute(config["otherSrc"]);
			//console.info(imgsrc);
			imgsrc = decodeURIComponent(imgsrc);
			if(typeof config["sFrag"] === "object"){
				for(i=0, l=config["sFrag"].length; i<l; i++){
					imgsrc = imgsrc.replace(config["sFrag"][i],config["bFrag"][i]);
				}
			}
			else{
				imgsrc = imgsrc.replace(config["sFrag"],config["bFrag"]);
			}
			return imgsrc;
		};
		//当用户点击新微博按钮或更多按钮时，如果微博网站使用ajax载入，新载入的微博无法弹出大图
		//所以需要给新微博按钮和更多按钮，绑定执行init函数
		var newFeedBand = function(){
			var sname = getSiteName(),
				i = 0,
				theBtn,
				btns = miniblogsConfig[sname]["newFeedBtns"],
				l = (btns && btns.length);
			if(!btns || !l) return;

			for(i=0; i<l; i++){
				if(btns[i].nodeType === 1){
					theBtn = btns[i];
				}
				else{
					btns[i] && (theBtn = $(btns[i]));
					if(!theBtn){ theBtn = $CN(btns[i])[0]; };
				}
				theBtn && theBtn.addEventListener("click", function(){
					imgPop.init();
				}, false);
			}

			//console.info(sname);
			//针对t.qq.com滚动页面时自动载入微博,但效率比较低
			if(miniblogsConfig[sname]['bottomAddFeed'] === true){
				var feedLen = getFeedImgs().length;
				var timer = setInterval(function(){
					if(getFeedImgs().length !== feedLen){
						feedLen = getFeedImgs().length;
						imgPop.init();
					}
				}, 2500);
			}
		};
		var _fade = function(spec,callback){
			var obj = spec.obj,
				fromOpacity,
				toOpacity;
			spec.from = spec.from || obj.style.opacity * 100;
			fromOpacity = spec.from/100;
			toOpacity = spec.to/100;
			//利用新浪包的函数进行渐变
			/*
			if(unsafeWindow.App && unsafeWindow.App.opacity){
				unsafeWindow.App.opacity(obj, {
					'first': spec.from,
					'last': spec.to,
					'time': 1.25
				},callback);
				return;
			}
			*/
			//自己的函数进行渐变
			cache.timer && clearInterval(cache.timer);
			cache.timer = setInterval(function(){
				//console.info(obj.style.opacity + " " + toOpacity);
				if(obj.style.opacity < toOpacity){
					obj.style.opacity = parseFloat(obj.style.opacity) + 0.2;
				}
				else if(obj.style.opacity > toOpacity){
					//修复一个chrome下图片不消失的bug
					var temp = parseFloat(obj.style.opacity) - 0.2;
					temp = (temp <= 0.01) ? 0 : temp;
					obj.style.opacity = temp;
				}
				else if(obj.style.opacity == toOpacity){
					callback && callback.call(this);
					clearInterval(cache.timer);
				}
				else
					throw "fadeTo函数异常";
			},25);
		};
		var createImgPop = function(imgsrc, ifShow){
			ifShow = ifShow || false;
			$("imgPop") && document.body.removeChild($("imgPop"));
			var temp = $C("img"),
				scrollTop;
			temp.id = "imgPop";
			temp.src = imgsrc;
			temp.style.position = "absolute";
			temp.style.visibility = "hidden";
			temp.style.border = "5px solid #fff";
			if(ifShow){
				//for firefox & chrome 's diff
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				temp.style.top = scrollTop+(window.innerHeight-imgHeight)/2 + "px";
				temp.style.left = pos.x+pos.width+80+"px";
				temp.style.zIndex = "500";
				temp.style.opacity = 0;
				temp.style.cssText += "-moz-box-shadow:4px 4px 15px #333;";
				temp.style.cssText += "-webkit-box-shadow:4px 4px 15px #333;";
				temp.style.visibility = "";
			}
			document.body.appendChild(temp);
			return temp;
		};
		var appendPod = function(imgsrc,pos,imgSizeFunc){
			//防止图片未载入时获取图片大小为0的情况
			//alert(imgSizeFunc().height);
			var imgHeight = imgSizeFunc().height,
				that,
				imgPop,
				scrollTop;
			//console.info(imgHeight);
			//imgHeight等于10px,30px，很主观地判断其图片尚未载入
			if(!imgHeight || imgHeight <= 30){
				that = this;
				cache.timerHeight = setTimeout(function(){
					appendPod.call(that,imgsrc,pos,imgSizeFunc);
				},25);
				return;
			}
		
			imgPop = $("imgPop");
			if(!imgPop){
				createImgPop(imgsrc,true);
			}
			else{
				//for firefox & chrome 's diff
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				imgPop.style.top = scrollTop+(window.innerHeight-imgHeight)/2 + "px";
				imgPop.style.left = pos.x+pos.width+80+"px";
				imgPop.style.border = "5px solid #fff";
				imgPop.style.zIndex = "500";
				imgPop.style.opacity = 0;
				imgPop.style.cssText += "-moz-box-shadow:4px 4px 15px #000;";
				imgPop.style.cssText += "-webkit-box-shadow:4px 4px 15px #000;";
				imgPop.style.visibility = "";
				imgPop.src = imgsrc;

				//针对t.ifeng.com修正图片位置
				if(getSiteName() === "t.ifeng.com"){
					imgPop.style.left = pos.x+pos.width+80-350+"px";
				}
			}
			_fade({obj:imgPop,to:100});
			div_bigImg = null;
			bigImg = null;

			//保存上一次图片的信息，用以缓存
			saveImgInfo(imgPop);
		};
		var removePop = function(){
			return function(e){
				if(cache.zPressing === false){
					e.stopPropagation();
					cache.timer && clearInterval(cache.timer);
					var theObj = $("imgPop");

					//保存上一次图片的信息，用以缓存
					//saveImgInfo(theObj);

					if(theObj){
						_fade({obj:theObj,to:0},function(){
							theObj.src = "";
							theObj.removeAttribute("src");
						});
					}
				}
			};
		};
		var imgHover = function(img){
			var imgsrc = getBigImgsrc(img), getSize;
			return function(e){
				//console.info("shift pressing : " + cache.shiftPressing);
				if(cache.zPressing === false){
					//console.time("test2");
					e.stopPropagation();
					cache.timerHeight && clearInterval(cache.timerHeight);
					cache.timer && clearInterval(cache.timer);
					getSize = getImgSize(imgsrc);
					appendPod(imgsrc,getPos(img),getSize);
					//console.timeEnd("test2");
				}
			};
		};
		var imgOut = function(){
			return removePop();
		};

		var addShiftListener = function(){
			window.addEventListener("keydown",function(e){
				if(e.keyCode === 90){
					cache.zPressing = true;
				}
			},false);
			window.addEventListener("keyup",function(e){
				if(e.keyCode === 90){
					cache.zPressing = false;
					removePop()(e);
				}
			},false);
		};
		
		return {
			init: function(){
				var i = 0, 
					l,
					that,
					initFunc,
					repeatInter,
					imgs = getFeedImgs();
				//console.info(cache.initRepeatCount);
				//由于网易微博采用ajax载入微博，因此一开始找不到小图，即imgs.length为0或imgs.length没有增加
				//当找不到小图时，每隔一秒调用一次init，直到微博载入为止
				//这样判断的缺点是：如果页面上的确没有小图，会不断调用这个函数
				//所以需要再做一次判断，当大于10次的时候，不再调用
				if(imgs.length === cache.lastInitFeedsNumber){
					if(cache.initRepeatCount >= 10){
						return;
					}
					initFunc = arguments.callee;
					that = this;
					cache.initRepeatCount++;
					repeatInter = setTimeout(function(){
						initFunc.call(that);
					},1000);
					return;
				}
				cache.initRepeatCount = 0;

				//对ajax载入新微博的按钮们绑定新的click事件，点击时执行init函数
				newFeedBand();

				//alert(imgs.length);
				//注册每一个小图的over事件
				for(i=0,l=imgs.length; i<l; i++){
					var img = imgs[i];
					if(img.getAttribute("register") !== "true"){
						img.addEventListener("mouseover", imgHover(imgs[i]), false);					
						img.addEventListener("mouseout", imgOut(), false);
						img.setAttribute("register","true");
					}
				}
				//本次init执行注册了cache.lastInitFeedsNumber个小图的over事件
				cache.lastInitFeedsNumber = imgs.length;

				//绑定按键z事件，使图片不会消失，方便看大图
				addShiftListener();
			}
		};
	})();
	imgPop.init();
})();