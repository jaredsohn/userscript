// ==UserScript==
// @name YoukuSS
// @author NLF
// @description 优酷功能的增强(窗口大小控制,视频下载等.)(support opera 10.1+,firefox 3.5+,chrome 5+)
// @mod_date 2010-9-15
// @version 1.9.4.0
// @namespace  http://userscripts.org/users/NLF
// @include http://*.youku.com/*
// @include http://www.soku.com/*
// @include http://www.flvcd.com/parse*
// @exclude http://v.youku.com/v_showMini/*
// @download http://bbs.operachina.com/viewtopic.php?f=41&t=62429
// ==/UserScript==

(function (){
	//下载地址解析iframe上..禁止加载JS.
	if(window.name=='N_downvideo')return;

	var prefs={
		SZ:2									,//初始化为屏幕尺寸  0:普通(优酷的默认大小);1:普屏(大);2:宽屏;3宽屏(大);
		centerPlayer:false			,//默认居中播放器窗口;
		EnableCS:true 				,//是否启用cookie保存最后的屏幕状态..;
		drag:true							,//按住下面设定的按键,鼠标左键拖曳播放器大小..;
			shortCuts:[false,true,false]		,//[shift键,ctrl键,alt键];
		replacec:true					,//美化原开关灯按钮..;
		download:true					,//视频下载功能..;
			HDD:true						,//默认解析高清模式视频的下载地址(如果存在的话);
		transition:true				,//切换屏幕大小时.动画过渡..;
		openmini:true					,//按住下面设定的按键,左键点击视频连接..mini窗口播放视频
			shortCuts2:[true,false,false]		,//[shift键,ctrl键,alt键];
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

	var cstyle=Style.cloneNode(false);
	//alert(cstyle.outerHTML);
	//cstyle.setAttribute('type','text/css');
	var cstyleText='\
		div.playBox{\
			width:930px!important;\
		}\
		.fn .updown{\
			width:301px!important;\
		}\
		.fn .up,\
		.fn .down,\
		.fn .collection,\
		.fn .share,\
		.fn .transmit{\
			width:150px!important;\
		}\
		.fn .download{\
			width:173px!important;\
		}\
		div.right{\
			margin-top:auto!important;\
		}\
	';
	if(prefs.centerPlayer)cstyle.textContent=cstyleText;
	shead.appendChild(cstyle);

	var otherStyle=Style.cloneNode(false);
	//otherStyle.setAttribute('type','text/css');
	otherStyle.textContent='\
		div[id^="ab_"],\
		div#vphotvideo+div{\
			display:none!important;\
		}\
		div#player:hover{\
			cursor:pointer;\
		}\
	';
	shead.appendChild(otherStyle);

	function Style_loader(){
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
					div.right{\
						margin-top:738px;\
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
					div.right{\
						margin-top:569px;\
					}';
			};break;
			case 'cus':{
				Style.textContent=getCookie("ykwsc");
			};break;
			default:{
			};break;
		};
	};
	Style_loader();

	function init(){
		//移除原页面的宽屏切换按钮.
		var o_wsb=matchSingleNode('//span[@class="turn"][a[starts-with(@id,"modeturn")]]');
		if(o_wsb)o_wsb.parentNode.removeChild(o_wsb);

		var position=matchSingleNode('//div[@class="guide"]') || matchSingleNode('//div[@id="vpofficialtitle"]/div/h1[@class="title"]');
		//alert(position);

		if(position){
			position=position.appendChild(document.createElement('span'));
			position.id="youkuss";
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
			kaiguan.addEventListener('change',function(){
				var tempV=this.value;
				if(tempV=='cus'){
					var opWidth=parseInt(window.getComputedStyle(YKplayer,'').width,10);
					var opHeight=parseInt(window.getComputedStyle(YKplayer,'').height,10);
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
					var ccss='\
						div#player{\
							width:'+width+'px'+';\
							height:'+height+'px'+';\
						}\
					';
					if(width > parseInt(window.getComputedStyle(divcleft,'').width)){
						ccss+='\
							div.right{\
								margin-top:'+height+'px'+';\
							}\
						';
					};
					setCookie("ykwsc",ccss,30,'/','v.youku.com');
				};
				prefs.SZ=cursel=tempV;
				setCookie("ykws",prefs.SZ,30,'/','v.youku.com');
				Style_loader();
			},false);


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

			var CPspan=document.createElement('a');
			CPspan.style.cssText='\
				padding-left:10px;\
				font-size:12px!important;\
			';
			CPspan.textContent='居中';
			var CPcheckbox=document.createElement('input');
			CPcheckbox.type='checkbox';
			CPspan.insertBefore(CPcheckbox,CPspan.firstChild);
			position.appendChild(CPspan);
			if(prefs.centerPlayer)CPcheckbox.checked=true;
			CPcheckbox.addEventListener('click',function(e){
				var curS=this.checked;
				if(curS){
					setCookie("ykwsm",'enable',30,'/','v.youku.com');
					cstyle.textContent=cstyleText;
				}else{
					setCookie("ykwsm",'disable',30,'/','v.youku.com');
					cstyle.textContent='\
						div.playBox{\
							width:610px!important;\
						}\
					';
				};
			},false);

			var relative=document.createElement('a');
			relative.textContent='脱离';
			relative.style.cssText='\
				padding-left:10px;\
				font-size:12px!important;\
			';
			YKplayer.style.cssText='\
				z-index:2000;\
				left:0;\
				top:0;\
			';
			var playArea=matchSingleNode('//div[@class="playArea"]');
			var divcright=matchSingleNode('//div[@class="right"]');
			relative.addEventListener('click',function(){
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
				if(relative.textContent!='嵌入')return;
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
			position.appendChild(relative);

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
							z-index:1000;\
							border-radius:5px;\
							-moz-border-radius:5px;\
							background-color:white;\
							height:88px;\
							box-shadow:2px 2px 6px #ccc;\
							-moz-box-shadow:2px 2px 6px #ccc;\
							-webkit-box-shadow:2px 2px 6px #ccc;\
							top:2px;\
							overflow:hidden!important;\
							display:none;\
						';
						var iframe=document.createElement('iframe');
						iframe.frameBorder=0;
						iframe.width=iframe.height='100%';
						iframe.name='N_downvideo';
						i_downbox.appendChild(iframe);
						var i_src='http://www.flvcd.com/parse.php?kw='+url+(prefs.HDD? '&format=high' : '');
						iframe.src=i_src;
						document.body.appendChild(i_downbox);
					};

					if(i_downbox.style.display!='none'){
						i_downbox.style.display='none';
						this.textContent='下载视频(开)';
					}else{
						i_downbox.style.display='';
						var i_left=this.getBoundingClientRect().left+window.scrollX+this.offsetWidth;
						i_downbox.style.left=i_left+3+'px';
						this.textContent='下载视频(关)';
					};
				};
				var a=document.createElement('a');
				a.textContent='下载视频(开)';
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
							z-index:1010!important;\
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
				a.textContent='影院模式';
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
					var Div_right_MT=f_player_W>Div_left_W? f_player_H : 0;
					clearTimeout(ys);
					ys=setTimeout(function(){
						Style.textContent='\
							div#player{\
								width:'+ f_player_W +'px;\
								height:'+ f_player_H +'px;\
							}\
							div.right{\
								margin-top:'+Div_right_MT+'px;\
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

		//关灯美化..
		(function(){
			if(!prefs.replacec)return;
			var spana=matchSingleNode('//span[@class="turn"][a[starts-with(@id,"lightturn")]]');
			//alert(spana);
			if(!spana)return;
			var lightImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABCCAYAAABjJzf7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlz  AAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAARs  SURBVEiJ7ZbNT1xVGIefc+6dGeAOA9MOlMKCSjWFjtDGVg2xJWPRhUsXdeHGaKJRN/oP1JX7rmw0  McaNraluTKDxq820okEa6UecGShtoZEiCNNhmJk79/McF3wUF100bnmTd3HOeZ7kTc5v8YqzZ88C  IKVECNEL9CmlWpRShGFYDoKgUK/XpxzHAcBkvYTW+nhzc/ORdDo9FI/H22q1mlsul5dzudx4tVpt  B34BtPQ8D9/3+yzLOprJZN5NJBJPhWEYq1QqYblcThw7dux1y7KO1Gq1vrW1NaTneTiOkx4YGDjh  +74Kw9AVQgjDMAzHcZyFhYXS4ODgkG3bacdxMG3bRmvdkkwm97muawPa8zzPtm1XKaWDIHBTqVSX  bdutWmvMarWK1lq7rusUi8U1QNu27ZZKJVdKKWKxmCmECGzbVlprzFqthtZ6eWpqKhePx/cVi8Wi  UkpLKUVzc3MkmUwmCoXCrOM4y1prpOM41Ov1yQsXLvyeSqWilmXFLMsyk8lkrLW1tSkej0fPnTv3  q+d5k77vYwwODqKUWiuVSub8/Lw7PDz8ghDCtywrsnv37j1nzpw5Pzc3Ny6EyAMYPT092LZNEAQL  i4uL7d3d3amOjo52wzCMqampW6Ojo2PAz4AGkL7vs9EqDMObExMT1yKRSGMkEmmamJi4BtwE1MYH  I/P5PNtqPp/PV6SUhpTSyOfzFWB+8/Hy5csPyUwmw8mTJ+nv739nZGREnz59WhuG8Wk6nSadTm9x  m1kim82SyWQA6O3txfd9AHK53PYJkBvdACSz2exegJWVFVZXVzeZvcAuoAmQAjCA5o3LhBAiDpwC  OrXWHwIPgApQAspCa83jlHwsekfYEXaEHWFH2BEeUeLrj7YdBL1An9YkNaA1a1qTC0IKYbjObG1k  wFBLx8Gj6cx7mZbO7i7HWdCl+7N/T499O/Zg4U4ncAnQxqvHAUi3dj794ok3v3g/lki0a+3Iam1G  uOru3gPPvXF0aXa6WF0tlkPFolQKwpBDAy99MByqmlTK88HEMBoIgnJQWh0Xh19+OxOEPBsoMIP1  2VKtnfv3B0HFBamDoKxcdwmlfKGUF+7qeqLbC9ij9UPB9NyVoGbfCoWQynWXqFZvm1LGZCTSKtCG  7/lIrcH0AwCW7+XGphNd8nC1Ol1XyheGEZWxWKewrJ7IXP76tOezCCCDEPyA38ZHv7pmNfY70Whb  tKGhw2hq2i8t60kjFtnnXPrmkxuhIhuEYLzyPGhNqVqtN67cn+eZobcOCWmE0WibjMcPxL777OOR  pb9mLgHjALJchYoNfsCPd3KTd+7+mbsZjbZHTDNu3L7xx83ZwtVbwPdb0QgVbHSoNVcKVy/mTTMe  MYx4tHD1Yh64AoRbQvbGf6Iyc2960hXCEFKa4t70pAvMbD5++QOY2euQvQ6vvdxOW1tb7cqknB0Y  a2yfmZnh1Odu8ng/NVhntmeJ8z/9QyZzECjS19eL50XZDm6NxCM2snJ5eZP5fxvZvzGZVZUdEni2  AAAAAElFTkSuQmCC';
			spana.style.cssText+='\
				padding-left:20px;\
				background-image:url("'+lightImage+'");\
				background-repeat:no-repeat;\
			';
			function lightC(){
				if(getCookie('light')=='off'){
					spana.style.backgroundPosition='0 -50px';
				}else{
					spana.style.backgroundPosition='0 0';
				};
			};
			lightC();
			spana.addEventListener('click',lightC,false)
		})();

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

	if(window.opera){
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
	};

	function init(){
		//alert(document.title);
		var as=document.links,
					tempa,
					tempa_h,
					tempa_in,
					dua=[],
					hdd,
					hdd_t;
		for(var i=0,ii=as.length;i<ii;i++){
			tempa=as[i];
			tempa_h=as[i].href;
			if(/^https?:\/\/f\.youku\.com\/player\/getFlvPath/i.test(tempa_h)){
				dua.push(tempa_h);
				continue;
			};
			if(hdd)continue;
			tempa_in=tempa.textContent;
			if(/高清模式解析/i.test(tempa_in)){
				hdd=tempa_h;
				hdd_t='高清模式解析';
			}else{
				if(/普通模式解析/i.test(tempa_in)){
					hdd=tempa_h;
					hdd_t='普通模式解析';
				};
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
			if(hdd){
				h4inner+='<a style="color:red;padding-left:10px;" href="'+hdd+'">'+hdd_t+'</a>'
			};
			div_title.innerHTML=h4inner;
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
	//only for firefox
	if(window.opera || window.chrome)return;

	var prefs={
		id:'84972'											,//上传在 userscript上的脚本 编号.. 如地址 http://userscripts.org/scripts/show/84937 id为 84937
		curVersion:'1.9.4.0'						,//当前的版本号
		userJSName:'YoukuSS'		,//用户脚本的名字
	};


	var id=prefs.id,
				curVersion=prefs.curVersion,
				userJSName=prefs.userJSName;

	var checking;

	function checkUpdate(manual){
		if(checking)return;
		checking=true;
		GM_xmlhttpRequest({
			method: "GET",
			url:'http://userscripts.org/scripts/source/'+id+'.meta.js',
			onload: function(rsp){
				function finish(){
					GM_setValue(id+'_lastCT',String(curT));
					checking=false;
				};
				if(rsp.status!=200){
					finish();
					if(manual){
						alert('网络故障,检查失败,请稍后再试试!')
					};
					return;
				};
				var txt=rsp.responseText;
				//alert(txt);
				var latestVersion=txt.match(/@\s*version\s*([\d\.]+)\s*/i);
				if(latestVersion){
					latestVersion=latestVersion[1];
				}else{
					finish();
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
				finish();
				if(needUpdate){
					var ok=confirm('找到了一个更新!'+'\n\nJS名字: '+userJSName+(author? ('\n作者: '+author) : '')+'\n描述: '+(description? description : '无')+'\n\n当前版本号: '+curVersion+'\n最新版本号: '+xlatestVersion+(timestamp? ('\n\n更新时间: '+timestamp):'')+'\n\n你是否要升级到最新呢?');
					if(ok){
						location.href='http://userscripts.org/scripts/source/'+id+'.user.js';
					};
				}else{
					//手动更新才提示这个..
					if(manual){
						alert('已经是最新的了!'+'\n\nJS名字: '+userJSName+(author? ('\n作者: '+author) : '')+'\n描述: '+(description? description : '无')+'\n\n当前版本号: '+curVersion+'\n');
					};
				};
			}
		});
	};
	//checkUpdate();


	var registerMenuCommand=GM_getValue(id+'_registerMenuCommand',null);
	if(registerMenuCommand===null){
		registerMenuCommand=true;
		GM_setValue(id+'_registerMenuCommand',registerMenuCommand);
	};
	if(registerMenuCommand){
		GM_registerMenuCommand('检查 '+userJSName+' 更新',function(){checkUpdate(true)});
	};

	var autoUpdate=GM_getValue(id+'_autoUpdate',null);
	if(autoUpdate===null){
		autoUpdate=true;
		GM_setValue(id+'_autoUpdate',autoUpdate);
	};
	if(!autoUpdate)return;

	var interval=GM_getValue(id+'_interval',null);
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

	if(needCheck)checkUpdate();
})();