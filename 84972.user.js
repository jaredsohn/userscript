// ==UserScript==
// @name YoukuSS
// @author NLF
// @description 优酷功能的增强(窗口大小控制,视频下载,循环播放等.)(support opera 10.1+,firefox 3.5+,chrome 5+)
// @mod_date 2011-6-3
// @version 1.9.7.1
// @namespace  http://userscripts.org/users/NLF
// @include http://*.youku.com/*
// @include http://www.soku.com/*
// @include http://www.flvcd.com/parse*
// @exclude http://v.youku.com/v_showMini/*
// @download http://bbs.operachina.com/viewtopic.php?f=41&t=62429
// ==/UserScript==

(function(){
	//下载地址解析iframe上..禁止加载JS.
	if(window.name=='N_downvideo')return;

	var prefs={
		SZ:2									,//初始化为屏幕尺寸  0:普通(优酷的默认大小);1:普屏(大);2:宽屏;3宽屏(大);
		centerPlayer:false			,//默认居中播放器窗口;
		EnableCS:true 				,//是否启用cookie保存最后的屏幕状态..;
		drag:true							,//按住下面设定的按键,鼠标左键拖曳播放器大小..;
			shortCuts:[false,true,false]		,//[shift键,ctrl键,alt键];
		download:true					,//视频下载功能..;
			HDD:true						,//默认解析超清模式视频的下载地址(如果存在的话);
		transition:true				,//切换屏幕大小时.动画过渡..;
		openmini:true					,//按住下面设定的按键,左键点击视频连接..mini窗口播放视频
			shortCuts2:[true,false,false]		,//[shift键,ctrl键,alt键];
		fastSwitch:true				,//使用数字键 1 2 3 4 5快速切换屏幕大小.
		Loop:false						,//循环播放
	};

	//封装 evaluate()方法
	function matchSingleNode(xpath,doc,root){
		doc=doc||document;
		root=root || doc;
		return doc.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	var pressButton=['shiftKey','ctrlKey','altKey'];
	if(prefs.openmini){
		var shortCuts2=prefs.shortCuts2;
		document.addEventListener('click',function(e){
			if(!((!shortCuts2[0] || e[pressButton[0]]) && (!shortCuts2[1] || e[pressButton[1]]) && (!shortCuts2[2] || e[pressButton[2]])))return;
			var target=e.target;
			var a=matchSingleNode('ancestor-or-self::a[1]',document,target);
			//alert(a);
			if(a){
				var ahref=a.href;
				var id=ahref.match(/https?:\/\/v\.youku\.com\/.*(id_[^\.]*)/i);
				var t_id;
				if(id){
					t_id=id[1];
				}else if(/^https?:\/\/v\.youku\.com\/v_playlist\/.+/i.test(ahref)){
					var ul=matchSingleNode('ancestor::ul[1]',document,a);
					if(ul){
						var t_img=matchSingleNode('./descendant::img[starts-with(@id,"PlayListFlag")]',document,ul);
						var img_id=t_img.id;
						if(img_id){
							id=img_id.match(/PlayListFlag_(.+)/i);
							if(id){
								t_id='id_'+id[1];
								//alert(t_id);
							};
						};
					};
				};
				if(t_id){
					e.preventDefault();
					var xwindow=window.open("http://v.youku.com/v_showMini/"+t_id+"_ft_0.html","minWin_"+Math.random(),"height=400,width=480,resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,status=no,alwaysRaised=yes,");
					var alt=target.alt || target.title;
					if(/^https?:\/\/v\.youku\.com\/.+/i.test(location.href) && alt){
						setTimeout(function(){xwindow.document.title=alt;},1000);
					};
					//alert(xwindow);
					//window.addEventListener('beforeunload',function(){alert('00')},false);
					location.href="javascript:if(typeof PlayerPause!=='undefined')PlayerPause(true);void(0);"
				};
			};
		},false);
	};


	if(!/^https?:\/\/v\.youku\.com\/.+/i.test(location.href))return;

	function setCookie(c_name,c_value,keepday,c_path,c_domain,c_secure){
		var scookie=c_name+'='+encodeURIComponent(c_value);
		if (keepday){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+Number(keepday));
			scookie+=';expires='+exdate.toGMTString();
		}
		if (c_path){
			scookie+=';path='+c_path;
		}
		if (c_domain){
			scookie+=';domain='+c_domain;
		}
		if (c_secure){
			scookie+=';secure='+c_secure;
		}
		document.cookie=scookie;
	};

	function getCookie(c_name){
		var sre="(?:;)?"+c_name+"=([^;]*);?";
		var ore=new RegExp(sre);
		if(ore.test(document.cookie)){
			return decodeURIComponent(RegExp.$1)
		}else{
			return '';
		};
	};

	if(prefs.EnableCS){
		var ykws=getCookie("ykws");
		if(ykws)prefs.SZ=ykws;
		var ykwsm=getCookie("ykwsm");
		if(ykwsm)prefs.centerPlayer=(ykwsm=='enable');
		//alert(prefs.centerPlayer);
	};

	var Style=document.createElement('style');
	Style.setAttribute('type','text/css');

	var shead=document.getElementsByTagName('head')[0];
	shead.appendChild(Style);


	//居中播放器,样式..
	var cstyle=Style.cloneNode(false);

	var cstyleText='\
		div.playBox{\
			width:930px!important;\
		}\
		div.player{\
			margin-left:auto!important;\
			margin-right:auto!important;\
		}\
	';

	var cstyleText2='\
		div.playBox{\
			width:auto!important;\
		}\
		div.player{\
			margin-left:0!important;\
			margin-right:0!important;\
		}\
	';


	cstyle.textContent=prefs.centerPlayer? cstyleText : cstyleText2;
	shead.appendChild(cstyle);



	var otherStyle=Style.cloneNode(false);
	//otherStyle.setAttribute('type','text/css');
	otherStyle.textContent='\
		div[id^="ab_"],\
		div#vphotvideo+div{\
			display:none!important;\
		}\
		div.guide{\
			margin-top:3px!important;\
			height:auto!important;\
			margin-bottom:6px!important;\
		}\
		div.base{\
			height:auto!important;\
			margin-bottom:2px!important;\
		}\
	';
	shead.appendChild(otherStyle);

	function Style_loader(cusStyle){
		switch(String(prefs.SZ)){
			case '0':{
				Style.textContent='\
					div#player{\
						width:610px;\
						height:499px;\
					}';
			};break;
			case '1':{
				Style.textContent='\
					div#player{\
						width:930px;\
						height:738px;\
					}\
					div.playBox{\
						width:930px;\
					}';
			};break;
			case '2':{
				Style.textContent='\
					div#player{\
						width:610px;\
						height:388px;\
					}';
			};break;
			case '3':{
				Style.textContent='\
					div#player{\
						width:930px;\
						height:569px;\
					}\
					div.playBox{\
						width:930px;\
					}';
			};break;
			case 'cus':{
				Style.textContent=cusStyle || getCookie("ykwsc");
			};break;
			default:{
			};break;
		};
	};
	Style_loader();

	function init(){

		var position=matchSingleNode('//div[@class="guide"]') || matchSingleNode('//div[@id="vpofficialtitle"]/div/h1[@class="title"]');
		//alert(position);

		if(position){
			position=position.appendChild(document.createElement('span'));
			position.id="youkuss";
			position.style.cssText='\
				margin-top:5px;\
				display:inline-block;\
			';
			var kaiguan=document.createElement('select');
			kaiguan.title="按住 ctrl 键,然后按住鼠标左键,移动鼠标,播放器大小会跟着变化."
			kaiguan.innerHTML='\
				<option value="0">【4:3】</option>\
				<option value="1">【4:3】_B</option>\
				<option value="2">【16:9】</option>\
				<option value="3">【16:9】_B</option>\
				<option value="cus">【自定义】</option>\
			';
			kaiguan.style.cssText='\
				margin-left:8px;\
				color:#014CCC;\
				display:inline!important;\
			';

			var YKplayer=document.getElementById('player');
			var divcleft=matchSingleNode('//div[@class="left"]');

			function changeStyle(){
				var tempV=this.value;
				var ccss;
				if(tempV=='cus'){
					var opWH=window.getComputedStyle(YKplayer,'');
					var opWidth=parseInt(opWH.width,10);
					var opHeight=parseInt(opWH.height,10);
					var cm=prompt('自定义屏幕大小:\n请输入宽和高\n格式:800,600(中间请用逗号分隔)',opWidth+','+opHeight);
					if(cm==null){
						csize(true);
						return;
					};
					if(!cm || cm.indexOf(',')==-1){
						alert('格式无效');
						csize(true);
						return;
					};
					var cm=cm.split(',');
					var width=parseInt(cm[0],10);
					var height=parseInt(cm[1],10);
					if(width==opWidth && height==opHeight){
						//没有更改大小..
						csize(true);
						return;
					};
					ccss='\
						div#player{\
							width:'+width+'px'+';\
							height:'+height+'px'+';\
						}\
					';
					if(width > parseInt(window.getComputedStyle(divcleft,'').width)){
						ccss+='\
							div.playBox{\
								width:930px!important;\
							}\
						';
					};
					setCookie("ykwsc",ccss,30,'/','v.youku.com');
				};
				prefs.SZ=cursel=tempV;
				setCookie("ykws",prefs.SZ,30,'/','v.youku.com');
				Style_loader(ccss);
			};

			kaiguan.addEventListener('change',changeStyle,false);


			position.appendChild(kaiguan);

		//根据屏幕状态初始化开关的状态
			var cursel,
						options=kaiguan.options;
			function csize(previous){
				var i,
							ii,
							options_x,
							options_x_v,
							xvalue=previous? cursel : prefs.SZ;
				for(i=0,ii=options.length;i<ii;i++){
					options_x=options[i];
					options_x_v=options_x.value;
					if(options_x_v==xvalue){
						options_x.selected=true;
						cursel=options_x_v;
						//alert(typeof cursel);
						break;
					};
				};
			};
			csize();

			if(prefs.fastSwitch){
				document.addEventListener('keypress',function(e){
					//alert(e.keyCode);
					//1 49,2 50,3 51,4 52;
					//alert(e.target)
					if(e.target.nodeName.toLowerCase()=='body'){
						var curV=kaiguan[kaiguan.selectedIndex].value;
						switch(e.keyCode){
							case 49:{
								if(curV=='0')return;
								options[0].selected=true;
								changeStyle.call(kaiguan);
							}break;
							case 50:{
								if(curV=='1')return;
								options[1].selected=true;
								changeStyle.call(kaiguan);
							}break;
							case 51:{
								if(curV=='2')return;
								options[2].selected=true;
								changeStyle.call(kaiguan);
							}break;
							case 52:{
								if(curV=='3')return;
								options[3].selected=true;
								changeStyle.call(kaiguan);
							}break;
							case 53:{
								if(curV=='cus')return;
								options[4].selected=true;
								changeStyle.call(kaiguan);
							}break;
							default:break;
						};
					};
				},false);
			};


			//居中
			var CPcheckbox;
			(function(){
				var a=document.createElement('a');
				a.style.cssText='\
					padding-left:10px;\
					font-size:12px!important;\
				';
				a.textContent='居中';
				input=document.createElement('input');
				CPcheckbox=input;
				input.type='checkbox';
				input.style.cssText='\
					vertical-align:middle;\
				';
				a.insertBefore(input,a.firstChild);
				position.appendChild(a);
				if(prefs.centerPlayer)input.checked=true;
				input.addEventListener('change',function(e){
					var checked=this.checked;
					if(checked){
						setCookie("ykwsm",'enable',30,'/','v.youku.com');
						cstyle.textContent=cstyleText;
					}else{
						setCookie("ykwsm",'disable',30,'/','v.youku.com');
						cstyle.textContent=cstyleText2;
					};
				},false);
			})();

			//循环播放
			(function(){
				var a=document.createElement('a');
				a.style.cssText='\
					padding-left:10px;\
					font-size:12px!important;\
				';
				a.textContent='循环';
				input=document.createElement('input');
				input.type='checkbox';
				input.style.cssText='\
					vertical-align:middle;\
				';
				a.insertBefore(input,a.firstChild);
				var input2=document.createElement('input');
				input2.type='number';
				input2.maxLength='4';
				input2.min='0';
				input2.style.cssText='\
					vertical-align:middle;\
					width:50px;\
				';
				var input3=input2.cloneNode(false);
				input2.value='0';
				input2.title='循环的开始(单位:秒)';
				input3.title='循环的结束,留空表示到视频结束(单位:秒)';

				position.appendChild(a);
				position.appendChild(input2);
				position.appendChild(document.createTextNode('－'));
				position.appendChild(input3);


				var loopStart;
				var loopEnd;
				var ffchecked;
				var intervalHandler=function(){
						var embed=document.getElementById('movie_player');
						if(!embed.getNsData)return;
						var data=embed.getNsData();
						if(ffchecked){//修正loopEnd变量.
							ffchecked=false;
							var alltime=parseInt(data.alltime,10);
							if(loopEnd==''){
								loopEnd=alltime;
								input3.value=alltime;
							}else{
								if(loopEnd>=alltime){
									loopEnd=alltime;
									input3.value=alltime;
								}else{
									loopEnd+=2;
								};
							};
						};
						if(parseInt(data.time,10)+2>=loopEnd){//空两秒的原因是,如果视频完全结束,nsseek方法将无效.
							embed.nsseek(loopStart);
						};
					};

				if(browser.firefox){//..GM个LJ扩展,元素上面的属性都过滤掉了.
					var hrefjs='javascript:('+intervalHandler.toString()+')()';
					intervalHandler=function(){//从地址栏访问,丫的.
						location.href=hrefjs;
					};
				};

				if(prefs.Loop){
					input.checked=true;
					change.call(input);
				};
				var intervalx;
				function clearI(){
					input2.disabled=input3.disabled=false;
					clearInterval(intervalx);
					intervalx=null;
				};
				function change(){
					var checked=this.checked;
					if(checked){
						ffchecked=true;
						var input2V=input2.value;
						if(input2V=='')input2.value=0;
						loopStart=Math.max(Number(input2.value),0);
						input2.value=loopStart;
						var input3V=input3.value;
						loopEnd=input3V;
						if(input3V!=''){
							input3V=Number(input3V);
							loopEnd=input3V;
							if(input3V<=loopStart){//如果结束时间,小于开始时间.
								input3.value='';
								loopEnd='';
							};
						};
						if(browser.firefox){//firefox抛出变量,让地址栏可以访问到
							unsafeWindow.loopEnd=loopEnd;
							unsafeWindow.loopStart=loopStart;
							unsafeWindow.ffchecked=ffchecked;
							unsafeWindow.input3=input3;
						};
						input2.disabled=input3.disabled=true;

						intervalHandler();
						if(intervalx){
							clearI();
						};
						intervalx=setInterval(intervalHandler,999);
					}else{
						clearI();
					};
				};
				input.addEventListener('change',change,false);
			})();


			//脱离
			(function(){
				var a=document.createElement('a');
				a.textContent='脱离';
				a.style.cssText='\
					padding-left:10px;\
					font-size:12px!important;\
				';
				YKplayer.style.cssText='\
					z-index:1000;\
					left:0;\
					top:0;\
				';
				var playArea=matchSingleNode('//div[@class="playArea"]');
				var divcright=matchSingleNode('//div[@class="right"]');
				a.addEventListener('click',function(){
					if(this.textContent=='脱离'){
						this.textContent='嵌入';
						CPcheckbox.disabled=true;
						YKplayer.style.paddingTop='16px';
						YKplayer.style.border='6px solid #ccc';
						YKplayer.style.backgroundColor='white';
						playArea.style.height='0';
						divcright.style.setProperty('margin-top',0,'important');
					}else{
						this.textContent='脱离';
						CPcheckbox.disabled=false;
						YKplayer.style.paddingTop='0';
						YKplayer.style.border='0';
						playArea.style.height='auto';
						YKplayer.style.top='0';
						YKplayer.style.left='0';
						divcright.style.removeProperty('margin-top');
					};
				},false);
				YKplayer.addEventListener('mousedown',function(e){
					if(a.textContent!='嵌入')return;
					e.preventDefault();
					var curTop=parseInt(this.style.top,10);
					var curLeft=parseInt(this.style.left,10);
					var curX=e.clientX;
					var curY=e.clientY;
					//alert(curTop);
					//alert(curX);
					var self=this;
					function pmove(e){
						self.style.top=e.clientY-curY+curTop+'px';
						self.style.left=e.clientX-curX+curLeft+'px';
					};
					document.addEventListener('mousemove',pmove,false);
					document.addEventListener('mouseup',function(){
						//alert(arguments.callee.toString())
						document.removeEventListener('mouseup',arguments.callee,false);
						document.removeEventListener('mousemove',pmove,false);
					},false);
				},false);
				position.appendChild(a);
			})();


			//视频下载..
			(function(){
				if(!prefs.download)return;
				var i_downbox;
				function V_download(e){
					if(!i_downbox){
						var url=location.href;
						i_downbox=document.createElement('div');
						i_downbox.style.cssText='\
							border:1px solid #ccc;\
							position:absolute;\
							z-index:1996;\
							border-radius:5px;\
							-moz-border-radius:5px;\
							background-color:white;\
							height:88px;\
							width:400px;\
							box-shadow:2px 2px 6px #ccc;\
							-moz-box-shadow:2px 2px 6px #ccc;\
							-webkit-box-shadow:2px 2px 6px #ccc;\
							top:2px;\
							overflow:hidden!important;\
							display:none;\
						';
						var iframe=document.createElement('iframe');
						iframe.frameBorder='0';
						iframe.width=iframe.height='100%';
						iframe.name='N_downvideo';
						i_downbox.appendChild(iframe);
						var i_src='http://www.flvcd.com/parse.php?kw='+url+(prefs.HDD? '&format=super' : '');
						iframe.src=i_src;
						//window.open('http://www.flvcd.com/parse.php?kw='+url+(prefs.HDD? '&format=super' : ''),'N_downvideo','width=300,height=100');
						document.body.appendChild(i_downbox);
					};

					if(i_downbox.style.display!='none'){
						i_downbox.style.display='none';
						this.textContent='下载(开)';
					}else{
						i_downbox.style.display='';
						var i_left=this.getBoundingClientRect().left+window.scrollX+this.offsetWidth;
						i_downbox.style.left=i_left+3+'px';
						this.textContent='下载(关)';
					};
				};
				var a=document.createElement('a');
				a.textContent='下载(开)';
				a.style.cssText='\
					padding-left:10px;\
					font-size:12px;\
				';
				a.href='javascript:';
				a.addEventListener('click',V_download,false);
				position.appendChild(a);
			})();


			//影院模式
			(function(){
				var blackDiv;
				function cinema(){
					if(!blackDiv){
						blackDiv=document.createElement('div');
						blackDiv.style.cssText='\
							background-color:black!important;\
							position:fixed!important;\
							opacity:0!important;\
							left:0!important;\
							top:0!important;\
							width:100%!important;\
							height:100%!important;\
							z-index:990!important;\
							-o-transition:opacity 0.2s ease-in-out;\
							-moz-transition:opacity 0.2s ease-in-out;\
							-webkit-transition:opacity 0.2s ease-in-out;\
						';
						blackDiv.addEventListener('click',function(){
							blackDiv.style.setProperty('opacity','0','important');
							setTimeout(function(){
								blackDiv.style.setProperty('display','none','important');
							},100);
						},false);
						document.body.appendChild(blackDiv);
					};
					blackDiv.style.setProperty('display','block','important');
					setTimeout(function(){
						blackDiv.style.setProperty('opacity','0.9','important');
					},1);
				};
				var a=document.createElement('a');
				a.textContent='影院';
				a.style.cssText='\
					padding-left:10px;\
					font-size:12px;\
				';
				a.href='javascript:';
				a.addEventListener('click',cinema,false);
				position.appendChild(a);
			})();

			//拖曳缩放播放器大小;
			(function(){
				if(!prefs.drag)return;
				function moveit(e){
					prefs.SZ='cus';
					var f_player_W=e.clientX-o_mouse_x+ player_W;
					var f_player_H=e.clientY-o_mouse_y+ player_H;
					var Div_right_MT=f_player_W>Div_left_W? '933px;' : 'auto;';
					clearTimeout(ys);
					ys=setTimeout(function(){
						Style.textContent='\
							div#player{\
								width:'+ f_player_W +'px;\
								height:'+ f_player_H +'px;\
							}\
							div.playBox{\
								width:'+Div_right_MT+';\
							}\
						';
					},10);
				};

				function moveover(e){
					csize();
					setCookie("ykwsc",Style.innerHTML,30,'/','v.youku.com');
					setCookie("ykws",prefs.SZ,30,'/','v.youku.com');
					document.removeEventListener('mousemove',moveit,false);
					document.removeEventListener('mouseup',moveover,false);
					if(tsiCFN)tsiCFN(false);//还原过渡
				};

				var Div_left=divcleft,
							Div_left_W,
							player=YKplayer,
							player_W,
							player_H,
							o_mouse_x,
							o_mouse_y,
							ys;
				var _pressButton=pressButton;
				var shortCuts=prefs.shortCuts;
				document.addEventListener('mousedown',function(e){
					if(e.button!=0 || !((!shortCuts[0] || e[_pressButton[0]]) && (!shortCuts[1] || e[_pressButton[1]]) && (!shortCuts[2] || e[_pressButton[2]])))return;
					e.preventDefault();
					if(tsiCFN)tsiCFN(true);//取消过渡
					Div_left_W=Div_left.offsetWidth;
					player_W=player.offsetWidth;
					player_H=player.offsetHeight;
					o_mouse_x=e.clientX;
					o_mouse_y=e.clientY;
					document.addEventListener('mousemove',moveit,false);
					document.addEventListener('mouseup',moveover,false);
				},false);
			})();
		};

		//动画过渡..
		var tsiCFN;
		(function(){
			if(!prefs.transition)return;
			var tsiStyle=document.createElement('style');
			tsiStyle.setAttribute('type','text/css');
			var tsiStyleText='\
				div#player{\
					-o-transition:width 0.2s ease-in-out,height 0.2s ease-in-out;\
					-webkit-transition:width 0.2s ease-in-out,height 0.2s ease-in-out;\
					-moz-transition:width 0.2s ease-in-out,height 0.2s ease-in-out;\
				}\
				div.right{\
					-o-transition:margin-top 0.2s ease-in-out 0.1s;\
					-webkit-transition:margin-top 0.2s ease-in-out 0.1s;\
					-moz-transition:margin-top 0.2s ease-in-out 0.1s;\
				}\
				div.playBox{\
					-o-transition:width 0.2s ease-in-out;\
					-webkit-transition:width 0.2s ease-in-out;\
					-moz-transition:width 0.2s ease-in-out;\
				}\
			';
			tsiStyle.textContent=tsiStyleText;
			tsiCFN=function(cancle){
				if(cancle){
					tsiStyle.textContent='';
				}else{
					tsiStyle.textContent=tsiStyleText;
				};
			};
			document.getElementsByTagName('head')[0].appendChild(tsiStyle);
		})();

	};
////////////////////////////////////

	var UA=navigator.userAgent.toLowerCase();
	var browser={
		opera:!!window.opera,
		chrome:!!(window.chrome || UA.indexOf('applewebkit')!=-1),
		firefox:UA.indexOf('firefox')!=-1,
	};

	if(browser.opera){
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	};
})();

//下载功能..iframe
(function(){
	if(window.name!='N_downvideo')return;
	var head=document.getElementsByTagName('head')[0];

	if(window.opera){
		var style=document.createElement('style');
		style.type='text/css';
		style.textContent='\
			*{\
				display:none!important;\
			}\
		';
		head.appendChild(style);
		//alert(0);
	};

	function init(){
		//alert(document.title);
		var as=document.links,
					tempa,
					tempa_h,
					tempa_in,
					dua=[],
					hdd=[];
		for(var i=0,ii=as.length;i<ii;i++){
			tempa=as[i];
			tempa_h=as[i].href;
			if(/^https?:\/\/f\.youku\.com\/player\/getFlvPath/i.test(tempa_h)){
				dua.push(tempa_h);
				continue;
			};
			//if(hdd)continue;
			
			tempa_in=tempa.textContent;
			//console.log('test',tempa_in)
			if(/高清模式解析/i.test(tempa_in)){
				hdd.push([tempa_h,tempa_in]);
			}else if(/标清模式解析/i.test(tempa_in)){
				hdd.push([tempa_h,tempa_in]);
			}else if(/超清模式解析/i.test(tempa_in)){
				hdd.push([tempa_h,tempa_in]);
			};
		};

		head.parentNode.removeChild(head);
		var body=document.body;
		body.innerHTML='';

		if(dua.length==0){
			body.innerHTML='解析失败.两次解析时间最少间隔5秒<br /><a href="'+location.href+'">点击重试</a>'
			//alert('解析失败');
		}else{
			//alert(dua.length);
			var DurlN;
			var ii=dua.length;
			var div_title=document.createElement('div');
			var h4inner='本视频一共有 <b>'+ii+'</b> 段';
			var dla=document.createElement('a');
			dla.href='javascript:';
			dla.textContent=dla.title='全部下载';
			dla.style.cssText='\
				float:right;\
				margin-right:20px;\
			';
			dla.addEventListener('click',function(){
				for(var i=0;i<ii;i++){
					//alert(dua[i]);
					setTimeout((function(href){
						return function(){
							//alert(href);
							window.open(href);
							//location.href=href;
						};
					})(dua[i]),10);
					//location.href=dua[i];
				};
			},false);

			hdd.forEach(function(ele,index,array){
				//console.log(ele);
				h4inner+='<a style="color:red;padding-left:8px;font-size:12px;" href="'+ele[0]+'">'+ele[1]+'</a>';
			});

			div_title.innerHTML=h4inner;
			div_title.appendChild(dla);
			body.appendChild(div_title);
			body.appendChild(document.createElement('hr'));
			for(var i=0;i<ii;i++){
				DurlN=document.createElement('a');
				DurlN.style.cssText='\
					padding-right:10px;\
					font-size:13px;';
				DurlN.textContent='第 '+(i+1)+' 段';
				DurlN.href=dua[i];
				body.appendChild(DurlN);
			};
		};
	};

	if(window.opera){
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	};
})();


//自动更新模块
(function(){
	//不支持chrome
	if(window.chrome)return;
	if(window.navigator.userAgent.search(/applewebkit/i)!=-1)return;
	var operaObj=window.opera;
	if(operaObj){
		var operaSS=operaObj.scriptStorage;
		if(!operaSS)return;

		//alert(operaSS.key(4))
		if(window.name=='operaUJSCMIframe'){
			document.addEventListener('DOMContentLoaded',function(){
				window.parent.postMessage('operaUJSCMIframe:'+document.body.textContent,'*');
			},false);
		};
	};

	if(window.self!=window.top)return;

	//--必须填的3个参数
	var prefs={
		id:'84972'											,//上传在 userscript上的脚本 编号.. 如地址 http://userscripts.org/scripts/show/84937 id为 84937
		curVersion:'1.9.7.1'						,//当前的版本号
		userJSName:'YoukuSS'		,//用户脚本的名字
	};
	//--必须填的3个参数

	var id=prefs.id,
				curVersion=prefs.curVersion,
				userJSName=prefs.userJSName;

	var metaData='http://userscripts.org/scripts/source/'+id+'.meta.js',
				downloadPage='http://userscripts.org/scripts/show/'+id,
				downloadAddress='http://userscripts.org/scripts/source/'+id+'.user.js',
				curURL=location.href;

	var GM_log=this.GM_log,
			GM_getValue=this.GM_getValue,
			GM_setValue=this.GM_setValue,
			GM_registerMenuCommand=this.GM_registerMenuCommand,
			GM_xmlhttpRequest=this.GM_xmlhttpRequest,
			GM_openInTab=this.GM_openInTab,
			GM_addStyle=this.GM_addStyle;

	//for opera
	if(operaObj){
		var idRandom,
					hashRandom;
		var idRE=new RegExp('@uso:script\\s+'+id,'i');
		//alert(idRE)
		var crossMessage=function(url,loadFN){
			if(window.name=='operaUJSCMIframe')return;
			window.addEventListener('message',function(e){
				var data=e.data,
							origin=e.origin;//发送消息的框架所在的域名
				//alert(data);
				if(data.indexOf('operaUJSCMIframe:')==0 && data.length>17 && data.search(idRE)!=-1){
					window.removeEventListener('message',arguments.callee,false);
					//alert(e.source)//跨域的情况下,将返回安全警告
					//alert(origin);
					//alert(data);
					//alert(Oiframe);
					var iframe=document.getElementById('operaUJSCMIframe'+idRandom);
					if(iframe)iframe.parentNode.removeChild(iframe);
					loadFN(data.slice(17));
				};
			},false);
			var Oiframe=document.createElement('iframe');
			Oiframe.name='operaUJSCMIframe';
			idRandom=Math.random();
			Oiframe.id='operaUJSCMIframe'+idRandom;//保证是独一无二的Id,这样在删除的时候,不会删除其他JS创建的iframe.
			Oiframe.src=url;
			Oiframe.style.setProperty('display','none','important');
			function apppendIframe(){
				apppendPosition.appendChild(Oiframe);
			};
			var apppendPosition=document.body;
			if(!apppendPosition){
				document.addEventListener('DOMContentLoaded',function(){
					apppendPosition=document.body;
					apppendIframe();
				},false);
			}else{
				apppendIframe();
			};
		};

		GM_log=console.log;
		GM_getValue=function(key,defaultValue){
			var value=operaSS.getItem(key);
			if(!value)return defaultValue;
			value=eval(value);
			var Vtype=value[1];
			value=decodeURIComponent(value[0]);
			switch(Vtype){
				case 'boolean':{
					return value=='true'? true:false;
				}break;
				case 'number':{
					return Number(value)
				}break;
				case 'string':{
					return value;
				}break;
				default:{
					//console.log(Vtype);
				}break;
			};
		};
		GM_setValue=function(key,value){
			if(!key || !value)return;
			key=String(key);
			operaSS.setItem(key,'["'+encodeURIComponent(String(value))+'","'+((typeof value).toLowerCase())+'"]');
		};
		GM_registerMenuCommand=function(){
			
		};
		GM_xmlhttpRequest=function(){
			
		};
		GM_openInTab=window.open;
		GM_addStyle=function(css){
			var style=document.createElement('style');
			style.type='text/css';
			style.textContent=css;
			document.getElementsByTagName('head')[0].appendChild(style);
		};
	};



	var checking;
	function checkUpdate(manual){
		if(checking)return;
		GM_setValue(id+'_lastCT',String(curT));
		checking=true;
		//manual=true;

		function getInfo(txt){
			//alert(txt);
			var latestVersion=txt.match(/@\s*version\s*([\d\.]+)\s*/i);
			if(latestVersion){
				latestVersion=latestVersion[1];
			}else{
				checking=false;
				if(manual)alert('检查失败,版本号不符合要求(版本号必须由 数字 和 . 组成),并且递增.');
				return;
			};
			//alert(latestVersion);

			var description=txt.match(/@\s*description\s*(.+)/i);
			if(description){
				description=description[1];
			};
			//alert(description);

			var author=txt.match(/@\s*author\s*(.+)\s*/i);
			if(author){
				author=author[1];
			};

			var timestamp=txt.match(/@\s*uso:timestamp\s*(.+)\s*/i);
			if(timestamp){
				timestamp=timestamp[1];
			};
			//alert(timestamp);

			//对比版本号
			var needUpdate;
			var xlatestVersion=latestVersion;
			var latestVersion=latestVersion.split('.');
			var lVLength=latestVersion.length;
			var currentVersion=curVersion.split('.');
			var cVLength=currentVersion.length;
			var lV_x;
			var cV_x;
			for(var i=0;i<lVLength;i++){
				lV_x=Number(latestVersion[i]);
				cV_x=(i>=cVLength)? 0 : Number(currentVersion[i]);
				if(lV_x>cV_x){
					needUpdate=true;
					break;
				}else if(lV_x<cV_x){
					break;
				};
			};
			checking=false;

			if(isDownloadPage){
				var install_script=document.getElementById('install_script');
				if(install_script){
					var userjs=install_script.getElementsByClassName('userjs');
					if(userjs){
						userjs=userjs[0];
						userjs.style.cssText='\
							font-size:14px!important;\
							color:black!important;\
						';
						if(needUpdate){
							userjs.style.setProperty('color','red','important');
							if(operaObj){
								userjs.textContent='更新:请右键另存为,然后改名为:'+userJSName+'.js';
							}else{
								userjs.textContent='更新:立即安装';
							}
						}else{
							userjs.textContent='不需要更新';
						};
					};
				};
			}else{
				if(needUpdate){
					var ok=confirm('找到了一个更新!'+'\n\nJS名字: '+userJSName+(author? ('\n作者: '+author) : '')+'\n描述: '+(description? description : '无')+'\n\n当前版本号: '+curVersion+'\n最新版本号: '+xlatestVersion+(timestamp? ('\n\n更新时间: '+timestamp):'')+'\n\n你是否要升级到最新呢?');
					if(ok){
						location.href=operaObj? downloadPage : downloadAddress;
					};
				}else{
					//手动更新才提示这个..
					if(manual){
						alert('已经是最新的了!'+'\n\nJS名字: '+userJSName+(author? ('\n作者: '+author) : '')+'\n描述: '+(description? description : '无')+'\n\n当前版本号: '+curVersion+'\n');
					};
				};
			};
		};

		if(operaObj){
			crossMessage(metaData,function(data){
				getInfo(data);
			});

		}else{
			GM_xmlhttpRequest({
				method: "GET",
				url:metaData,
				onload: function(rsp){
					if(rsp.status!=200){
						checking=false;
						if(manual){
							alert('网络故障,检查失败,请稍后再试试!')
						};
						return;
					};
					getInfo(rsp.responseText);
				}
			});
		};
	};

	function checkUpdateM(){
		checkUpdate(true);
	};

	if(operaObj){
		//alert(userJSName+'_checkUpdate');
		window[userJSName+'_checkUpdate']=checkUpdateM;
	};
	//javascript:Super_prefetch_checkUpdate();


	var registerMenuCommand=GM_getValue(id+'_registerMenuCommand',null);
	//alert(registerMenuCommand)
	if(registerMenuCommand===null){
		registerMenuCommand=true;
		GM_setValue(id+'_registerMenuCommand',registerMenuCommand);
	};
	if(registerMenuCommand){
		GM_registerMenuCommand('检查 '+userJSName+' 更新',checkUpdateM);
	};

	var autoUpdate=GM_getValue(id+'_autoUpdate',null);
	//alert(autoUpdate)
	if(autoUpdate===null){
		autoUpdate=true;
		GM_setValue(id+'_autoUpdate',autoUpdate);
	};
	if(!autoUpdate)return;

	var interval=GM_getValue(id+'_interval',null);
	//alert(interval)
	if(interval===null){
		interval='7';
		GM_setValue(id+'_interval',interval);
	};
	interval=Number(interval);


	var needCheck;
	var curT=new Date().getTime();
	//alert(typeof curT);

	var lastCT=GM_getValue(id+'_lastCT',null);
	//alert(lastCT);

	if(lastCT===null){
		needCheck=true;
	}else{
		var oneDay=86400000;//毫秒
		lastCT=Number(lastCT);
		needCheck=(((curT-lastCT)/oneDay)>=interval);
	};

	//如果在下载页面.
	var isDownloadPage=(curURL.indexOf(downloadPage)==0);
	//needCheck=true;
	if(needCheck || isDownloadPage)checkUpdate();
})();
