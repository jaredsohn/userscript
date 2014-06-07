// ==UserScript==
// @name search_plus_google
// @author NLF
// @description  增强 google 搜索体验(Support Opera 10.1+ ,Fx3.6+ , Chrome5.0+)
// @create 2010-5-6
// @lastmodified 2010-8-11
// @version 1.6.3
// ==/UserScript==

(function(){
	function init(){
		//var time1=new Date();
		//如果不是新版google...
		if(!document.getElementById('leftnav'))return;
		var prefs={
			d_columns:true																			,//双列;
					bds:['1px','solid ','#B2B2B2']									,//边框样式..(分别是: 粗细,样式,颜色)..
					colorful:false																	,//炫彩背景..
							colorArray:['#EAFAF5','#F5FAEA','#FAF5EA','#FAEDEA','#FCE3E3','#E3FCE3','#F5E3FC','#FCE3F0','#E5E5E5','#FFFFFF']		,//炫彩背景的随机颜色数组..
					bgc:'#E9F2FA'																			,//背景颜色...
					bdr:'6px'																					,//圆角大小..
					bdsp:['4px','8px']																,//间距... (分别是: 水平,纵向)..
			autopager:true																			,//自动翻页;
					a_transition:true																,//拼接过渡..
					amaxpage:5																			,//最多翻页数;
				separator:false																	,//显示翻页导航..;
			headfixed:true																			,//头部和侧边栏浮动;
					fixedshadow:true																,//浮动后添加阴影;
			suggestfixed:true																		,//浮动搜索建议..
			sitethumb:true																			,//缩略图...
					thumbsize:1.0																		,//缩略图大小...
			shortUN:true																				,//缩短用户名..去掉 @gmail.com ...
			dleftdiv:true																				,//添加控制侧边栏的开关...
					leftdivs:true																		,//隐藏侧边栏...
			cachedfix:true																			,//快照修复....
		};

		try{
			eval(getCookie('prefs'));
			if(prefs.disable_all){
				UIs();
				return;
			};
		}catch(e){
			//confirm('设置有误\n已读取默认配置');
		};

		var Ccss='\
			div.N_separator span{\
				background-image:none!important;\
				display:none!important;\
			}\
			div.N_separator>table{\
				margin-top:0!important;\
			}\
			div.N_separator td{\
				padding:0 3px!important;\
				font-size:13px;\
			}';
		var killad='\
			div[id*="tads"],\
			#mbEnd{\
				display:none!important;\
			}';
		var DScss='\
			h3>a:hover,\
			#brs a:hover{\
				text-decoration:none!important;\
				text-shadow:0 1px 1px white;\
			}\
			div#res>div.std{\
				display:none!important;\
			}\
			div#center_col,\
			div#cnt{\
				max-width:100%!important;\
			}\
			div#center_col{\
				margin-right:0!important;\
				padding:0!important;\
				padding-left:3px!important;\
			}\
			div#ires>ol>li.g,\
			ol.Nol>li.g,\
			ol.tNol>li.g{\
				overflow:hidden;\
			}';
		var Dcss='\
			div#res{\
				padding:0!important;\
				padding-top:8px!important;\
			}\
			div#ires,\
			div#ires>ol{\
				overflow:hidden!important;\
			}\
			ol.Nol{\
				float:left!important;\
				width:50%!important;\
			}\
			ol.Nol_s{\
				clear:both;\
			}\
			ol.Nol>li.g,\
			ol.tNol>li.g{\
				border:'+prefs.bds.join(' ')+'!important;\
				margin:0 '+prefs.bdsp.join(' ')+'!important;\
				background-color:'+prefs.bgc+';\
				border-radius:'+prefs.bdr+';\
				-moz-border-radius:'+prefs.bdr+';\
				padding:8px!important;\
			}';
		var Scss='\
			div#ires>ol>li.g{\
				background-color:'+prefs.bgc+';\
				border-radius:'+prefs.bdr+';\
				padding:6px;\
				border:'+prefs.bds.join(' ')+'!important;\
			}\
			li.g .s{\
					max-width:none!important;\
			}';

		function matchNodes(xpath,doc,root){
			doc=doc||document;
			root=root||doc;
			return doc.evaluate(xpath, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		};

		function matchSingleNode(xpath,doc,root){
			doc=doc||document;
			root=root||doc;
			return doc.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		};

		//用户设置界面
		function UIs(){
			var setrq,
						mask;
			function UI_creator(){
				var setstyle=document.createElement('style');
				setstyle.setAttribute('type','text/css');
				setstyle.innerHTML='\
					#Plus_set{\
						border:1px solid #ccc;\
						background-color:white;\
						border-radius:5px;\
						-moz-border-radius:5px;\
						background:-moz-linear-gradient(top,white,#F2F2F2);\
						background:-webkit-gradient(linear, 0 0, 0 100%, from(white), to(#F2F2F2));\
						min-width:170px;\
					}\
					#Plus_set>div>input,\
					#Plus_set>div>select{\
						float:right;\
					}\
					#Plus_set>div{\
						padding:5px;\
						font-size:13px;\
						color:#2200CC;\
						-o-transition:background-color 0.3s ease-in-out,color 0.3s ease-in-out 0.3s;\
						-webkit-transition:background-color 0.3s ease-in-out,color 0.3s ease-in-out 0.3s;\
						-moz-transition:background-color 0.3s ease-in-out,color 0.3s ease-in-out 0.3s;\
						border-top:1px solid #999;\
					}\
					#Plus_set>div:hover{\
						background-color:#09F;\
						color:#FFF;\
					}\
					#Plus_set>div>input[type="text"]{\
						padding:0;\
						margin:0;\
						border-width:1px;\
						width:60px;\
					}\
					#Plus_set>div.indent1{\
						padding-left:10px;\
					}\
					#Plus_set>div.indent2{\
						padding-left:20px;\
					}\
				';
				document.getElementsByTagName('head')[0].appendChild(setstyle);

				setrq=document.createElement('div');
				setrq.id='setrq';
				setrq.style.cssText='\
					position:absolute;\
					z-index:200;\
					right:0;\
					opacity:0;\
					-o-transition:right 0.2s ease-in-out,opacity 0.2s ease-in-out;\
					-webkit-transition:right 0.2s ease-in-out,opacity 0.2s ease-in-out;\
					-moz-transition:right 0.2s ease-in-out,opacity 0.2s ease-in-out;\
				';
				setrq.innerHTML='\
					<div id="Plus_set">\
						<div title="让搜索框一直浮动在顶部,配合自动翻页很好用">搜索框固定:\
							<input id="prefsheadfixed" type="checkbox" />\
						</div>\
						<div class="indent1" title="为浮动的搜索框产生阴影" >└ 产生阴影:\
							<input id="prefsfixedshadow" type="checkbox"/>\
						</div>\
						<div title="搜索建议固定在搜索框的下面" >搜索建议固定:\
							<input id="prefssuggestfixed" type="checkbox"/>\
						</div>\
						<div title="在每个搜索条目之前,添加一个缩略图">站点缩略图:\
							<input id="prefssitethumb" type="checkbox" />\
						</div>\
						<div class="indent1" title="缩略图尺寸,0-1之间">└ 尺寸:\
							<input id="prefsthumbsize" type="text" />\
						</div>\
						<div title="自动帮你翻到下一页.是个好助手吧." >自动翻页:\
							<input id="prefsautopager" type="checkbox" />\
						</div>\
						<div class="indent1" title="平滑下一页拼接上来的效果" >└ 拼接过渡:\
							<input id="prefsa_transition" type="checkbox" />\
						</div>\
						<div class="indent1" title="自动帮你翻多少页呢?..">└ 最大翻页数:\
							<input id="prefsamaxpage" type="text"/>\
						</div>\
						<div class="indent1" title="显示分页导航..">└ 显示分页导航:\
							<input id="prefsseparator" type="checkbox"/>\
						</div>\
						<div title="双列模式,适合宽屏,扩大阅读效率">双列:\
							<input id="prefsd_columns" type="checkbox" />\
						</div>\
						<div class="indent1" title="随机背景颜色" >└ 炫彩背景:\
							<input id="prefscolorful" type="checkbox" />\
						</div>\
						<div class="indent1" title="搜索条目的默认背景色,关闭炫彩背景后,会使用默认背景色." >└ 默认背景:\
							<input id="prefsbgc" type="text" />\
						</div>\
						<div class="indent1" title="搜索条目的边框的大小" >└ 边框大小:\
							<input id="prefsbds1" type="text" />\
						</div>\
						<div class="indent2" title="搜索条目的边框样式 solid dashed等" >└ 样式:\
							<select id="prefsbds2">\
								<option value="solid">实线</option>\
								<option value="dashed">虚线</option>\
								<option value="dotted">点状</option>\
								<option value="double">双线</option>\
								<option value="none">无</option>\
							</select>\
						</div>\
						<div class="indent2" title="搜索条目的边框颜色" >└ 颜色:\
							<input id="prefsbds3" type="text" />\
						</div>\
						<div class="indent1" title="搜索条目的圆角大小" >└ 圆角大小:\
							<input id="prefsbdr" type="text" />\
						</div>\
						<div class="indent1" title="搜索条目的水平间距" >└ 水平间距:\
							<input id="prefsbdsp1" type="text" />\
						</div>\
						<div class="indent1" title="搜索条目的纵向上的间距" >└ 纵向间距:\
							<input id="prefsbdsp2" type="text" />\
						</div>\
						<div title="缩短用户名,去掉@gmail.com" >缩短用户名:\
							<input id="prefsshortUN" type="checkbox"/>\
						</div>\
						<div title="修复google被墙的快照.." >快照修复:\
							<input id="prefscachedfix" type="checkbox"/>\
						</div>\
						<div title="添加一个侧栏控制开关" >侧栏开关:\
							<input id="prefsdleftdiv" type="checkbox"/>\
						</div>\
						<div class="indent1" title="默认隐藏侧栏" >└ 默认隐藏:\
							<input id="prefsleftdivs" type="checkbox"/>\
						</div>\
						<div title="禁用全部功能" ><b style="color:red">完全禁用</b>:\
							<input id="prefsdisable_all" type="checkbox" />\
						</div>\
					</div>\
					<div>\
						<input style="float:right" title="保存并重载"  id="prefssave" type="button" value="保存" />\
						<input style="float:right" id="prefscancle" type="button" value="取消" />\
						<input title="重置回脚本里面的默认值"  id="prefsreset" type="button" value="重置" />\
					</div>\
				';
				document.body.appendChild(setrq);

				mask=document.createElement('div');
				mask.id='mask';
				mask.style.cssText='\
					z-index:100;\
					display:none;\
					top:0;\
					left:0;\
					position:absolute;\
					background-color:black;\
					opacity:0;\
					-o-transition:opacity 0.5s ease-in-out;\
					-webkit-transition:opacity 0.5s ease-in-out;\
					-moz-transition:opacity 0.5s ease-in-out;\
					width:100%;\
				';
				document.body.appendChild(mask);

				document.getElementById('prefscancle').addEventListener('click',function(){
					mask.style.opacity=0;
					setrq.style.right=0;
					setrq.style.opacity=0;
					setTimeout(function(){
						setrq.style.display='none';
						mask.style.display='none';
					},200);
				},false);

				document.getElementById('prefsreset').addEventListener('click',function(){
					if(confirm('你确定要重置么?\n重置回脚本里面的默认值!')){
						setCookie('prefs','',365,'/',location.hostname.replace(/^www\./i,''));
						setTimeout("location.reload()",0);
					};
				},false);

				function s(id){
					var element=document.getElementById(id);
					if(element.type=='checkbox'){
						return element.checked;
					}else{
						return element.value;
					};
				};

				document.getElementById('prefssave').addEventListener('click',function(){
					var v=[];
					v[0]='prefs.headfixed='+s('prefsheadfixed');
					v[1]='prefs.autopager='+s('prefsautopager');
					v[2]='prefs.d_columns='+s('prefsd_columns');
					v[3]='prefs.sitethumb='+s('prefssitethumb');
					v[4]='prefs.thumbsize='+s('prefsthumbsize');
					v[5]='prefs.amaxpage='+s('prefsamaxpage');
					v[6]='prefs.bgc=\''+s('prefsbgc')+'\'';
					v[7]='prefs.bds=[\''+s('prefsbds1')+'\',\''+s('prefsbds2')+'\',\''+s('prefsbds3')+'\']';
					v[8]='prefs.bdr=\''+s('prefsbdr')+'\'';
					v[9]='prefs.bdsp=[\''+s('prefsbdsp1')+'\',\''+s('prefsbdsp2')+'\']';
					v[10]='prefs.disable_all='+s('prefsdisable_all');
					v[11]='prefs.shortUN='+s('prefsshortUN');
					v[12]='prefs.colorful='+s('prefscolorful');
					v[13]='prefs.dleftdiv='+s('prefsdleftdiv');
					v[14]='prefs.leftdivs='+s('prefsleftdivs');
					v[15]='prefs.suggestfixed='+s('prefssuggestfixed');
					v[16]='prefs.cachedfix='+s('prefscachedfix');
					v[17]='prefs.separator='+s('prefsseparator');
					v[18]='prefs.fixedshadow='+s('prefsfixedshadow');
					v[19]='prefs.a_transition='+s('prefsa_transition');
					var vv=v.join(';')+';';
					//alert(vv);
					setCookie('prefs',vv,365,'/',location.hostname.replace(/^www\./i,''));
					//刷新
					setTimeout("location.reload()",0);
				},false);

				//读取默认的配置.
				function r(id,cur_value){
					var element=document.getElementById(id);
					if(element.type=='checkbox'){
						element.checked=cur_value;
					}else{
						element.value=cur_value;
					};
				};

				r('prefsheadfixed',prefs.headfixed);
				r('prefsautopager',prefs.autopager);
				r('prefsd_columns',prefs.d_columns);
				r('prefssitethumb',prefs.sitethumb);
				r('prefsthumbsize',prefs.thumbsize);
				r('prefsamaxpage',prefs.amaxpage);
				r('prefsbgc',prefs.bgc);
				r('prefsbds1',prefs.bds[0]);
				r('prefsbds2',prefs.bds[1]);
				r('prefsbds3',prefs.bds[2]);
				r('prefsbdr',prefs.bdr);
				r('prefsdisable_all',prefs.disable_all);
				r('prefsbdsp1',prefs.bdsp[0]);
				r('prefsbdsp2',prefs.bdsp[1]);
				r('prefsshortUN',prefs.shortUN);
				r('prefscolorful',prefs.colorful);
				r('prefsdleftdiv',prefs.dleftdiv);
				r('prefsleftdivs',prefs.leftdivs);
				r('prefssuggestfixed',prefs.suggestfixed);
				r('prefscachedfix',prefs.cachedfix);
				r('prefsseparator',prefs.separator);
				r('prefsfixedshadow',prefs.fixedshadow);
				r('prefsa_transition',prefs.a_transition);
			};

			//创建一个开关
			var nobra=document.createElement('a');
			nobra.href='javascript:';
			nobra.textContent='Plus设置';
			nobra.style.cssText='\
				padding-right:16px;\
			';
			if(prefs.disable_all)nobra.style.color='black';

			var guser=document.getElementById('guser');
			if(guser)guser.insertBefore(nobra,guser.firstChild);
			nobra.addEventListener('click',function(e){
				if(!setrq)UI_creator();
				setrq.style.display='';
				setrq.style.top=window.scrollY+2+'px';
				setTimeout(function(){
					setrq.style.right=200+'px';
					setrq.style.opacity=0.98;
				},0);
				mask.style.height=document.documentElement.scrollHeight+'px';
				mask.style.display='';
				setTimeout(function(){
					mask.style.opacity='0.8';
				},0);
			},false);
		};

		//写cookie函数
		function setCookie(c_name,c_value,keepday,c_path,c_domain,c_secure){
			var scookie=c_name+'='+encodeURIComponent(c_value);
			if (keepday){
				var exdate=new Date();
				exdate.setDate(exdate.getDate()+Number(keepday));
				scookie+=';expires='+exdate.toGMTString();
			};
			if (c_path){
				scookie+=';path='+c_path;
			};
			if (c_domain){
				scookie+=';domain='+c_domain;
			};
			if (c_secure){
				scookie+=';secure='+c_secure;
			};
			//alert(scookie)
			document.cookie=scookie;
		};

		//取cookie函数
		function getCookie(c_name){
			var sre="(?:;)?"+c_name+"=([^;]*);?"
			var ore=new RegExp(sre);
			if(ore.test(document.cookie)){
				return decodeURIComponent(RegExp['$1']);
			}else{
				return '';
			}
		};

		function li_ol(list,listl){
			var lip=list.snapshotItem(0);
			if(lip){
				lip=lip.parentNode;
			}else{
				return;
			};
			var i,
						ol,
						li;
			for(i=0;i<listl;i++){
				ol=document.createElement('ol');
				li=list.snapshotItem(i);
				(li.className.indexOf('g')==0)? ol.className='Nol' : ol.className='Nol_s';
				ol.appendChild(li);
				lip.appendChild(ol);
			};
		};

		function tqqt(){
			var qt=matchNodes('\
																//ol[@class="Nol"][li[@class="g" or starts-with(@class,"g ")]/div[@id="iur"]] | \
																//ol[@class="Nol"][li[@class="g" or starts-with(@class,"g ")]/table] |\
																//ol[@class="Nol"][li[@class="g" or starts-with(@class,"g ")]/div/table[@class="ts"]] |\
																//ol[@class="Nol"][li[@class="g" or starts-with(@class,"g ")]/cite]');
			//如果没有或者全部都是.则不移动
			var qtlength=qt.snapshotLength;
			if(qtlength==0)return;
			if(qtlength==FP_ligsl){
				prefs.sitethumb=false;
				return;
			};
			var qtdiv=document.createElement('div');
			qtdiv.id='qtsm';
			qtdiv.style.cssText='\
				overflow:hidden;\
				margin:0 2px 6px;\
				border:2px solid #ccc;\
				-moz-border-radius:6px;\
				border-radius:6px;\
			';
			var pdiv=document.createElement('div');
			pdiv.style.cssText='\
				margin:0 0 0 5px;\
				font-size:0.8em;\
			';
			var keyword=document.getElementsByName('q')[0].value;
			var baidu='<a style="color:#C64050;font-size:1.2em;" title="百度搜索 '+keyword+'" href="http://www.baidu.com/s?wd=' + encodeURIComponent(keyword) +'&tn=cnopera&ie=utf-8">'+keyword+"</a>"
			pdiv.innerHTML="<b>资讯,博客,图片,视频,音乐,翻译,等相关: </b>" + baidu
			qtdiv.appendChild(pdiv);
			var i,
						ii,
						ol;
			for(i=0,ii=qtlength;i<ii;i++){
				ol=qt.snapshotItem(i);
				//如果是奇数项的时候,设置第一项就行了
				if(ii%2!=0){
					if(i==0){ol.className='tNol'};
				};
				qtdiv.appendChild(ol);
			};
			//插到合适的位置
			var rq=matchSingleNode('//div[@id="ires"]/ol');
			rq.parentNode.insertBefore(qtdiv,rq);
		};

		function d_columns(){
			var style=document.createElement('style');
			style.type='text/css';
			if(prefs.d_columns){
				style.innerHTML=Dcss+killad+DScss+Ccss;
				var timeout;
				window.addEventListener('resize',function(){
					clearTimeout(timeout);
					timeout=setTimeout(Height,100);
				},false);

				var timeout2;
				function mbls_click(){
					clearTimeout(timeout2);
					timeout2=setTimeout(Height,300);
				};
				var mbls=document.getElementsByClassName('mbl');
				var i,
							ii;
				for(i=0,ii=mbls.length;i<ii;i++){
					mbls[i].addEventListener('click',mbls_click,false);
				};
			}else{
				style.innerHTML=Scss+killad+DScss+Ccss;
			};
			document.getElementsByTagName('head')[0].appendChild(style);
		};

		//动态调整搜索列表的高度函数
		function Height(list,listl){
			var all;
			if(!listl){
				all=true;
				list=matchNodes('//ol[@class="Nol"]/li');
				listl=list.snapshotLength;
			};
			var i;
			for(i=0;i<listl;i++){
				list.snapshotItem(i).style.height='auto';
			};
			//alert(FP_ligsl);
			var ii,
						liga,
						ligb,
						gh,
						gh2;
			for (i=0,ii=listl-1;i<ii;i=i+2){
				if(FP_odd && all){
					if(i+1==FP_ligsl)i=i+1;
				};
				liga=list.snapshotItem(i);
				ligb=list.snapshotItem(i+1);
				gh=parseFloat(document.defaultView.getComputedStyle(liga,'').height);
				gh2=parseFloat(document.defaultView.getComputedStyle(ligb,'').height);
				//alert(gh2);
				if(gh!=gh2){
					if(gh>gh2){
						gh=gh+"px"
						ligb.style.height=gh;
					}else{
						gh2=gh2+"px"
						liga.style.height=gh2;
					};
				};
			};
		};

		function autopager(){
			var nextlink=matchSingleNode('//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]');
			if(!nextlink)return;
			var a_transition=prefs.a_transition ? '\
				-o-transition:opacity 0.6s ease-in-out,top 0.5s ease-in-out;\
				-moz-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
				-webkit-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
			' : '';

			var working,
						apged=0,
						ires=document.getElementById('ires');
			function autopager_scroll(){
				var TH=document.documentElement.scrollHeight;
				var scrolly=window.scrollY;
				var sy=TH-scrolly;
				var remain=(sy-window.innerHeight)/window.innerHeight;
				if(remain<= 1/2 && !working && apged<prefs.amaxpage){
					working=true;
					var hr=new XMLHttpRequest();
					hr.onreadystatechange=function(){
						if(hr.readyState == 4){
							var sty=hr.responseText;
							var tempdiv=document.createElement('div');
							tempdiv.innerHTML=hr.responseText;
							var ol=matchSingleNode('.//div[@id="ires"]/ol',document,tempdiv);
							if(!ol){
								working=false;
								return;
							};
							apged+=1;
							var oldnav=document.getElementById('navcnt');
							if(prefs.separator){
								var separator=oldnav.cloneNode(true);
								separator.removeAttribute('id');
								separator.className='N_separator';
								var sephr=document.createElement('hr');
								separator.appendChild(sephr);
								separator.insertBefore(sephr.cloneNode(true),separator.firstChild);
								ires.appendChild(separator);
							};
							var list=matchNodes('.//div[@id="ires"]/ol/li[@class="g" or starts-with(@class,"g ")]',document,tempdiv);
							//alert(list.snapshotLength);
							var listl=list.snapshotLength;
							ol.style.cssText+='\
								;opacity:0.1;\
								position:relative;\
								top:30px;\
							'+a_transition;
							setTimeout((function(XC){return function(){XC.style.opacity=1;XC.style.top=0;}})(ol),0);
							ires.appendChild(ol);
							var nav=matchSingleNode('.//div[@id="navcnt"]',document,tempdiv);
							nextlink=matchSingleNode('.//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',document,tempdiv);
							oldnav.parentNode.replaceChild(nav,oldnav);
							if(prefs.sitethumb)sitethumb(list,listl);
							if(prefs.colorful)colorful(list,listl);
							if(prefs.d_columns)li_ol(list,listl);
							if(prefs.d_columns)Height(list,listl);
							tempdiv=null;
							if(!nextlink || apged==prefs.amaxpage)window.removeEventListener('scroll',autopager_timeout,false);
							working=false;
						};
					};
					hr.open("GET",nextlink,true);
					hr.setRequestHeader("Content-Type", "text/html;charset="+document.characterSet);
					hr.send(null);
				};
			};

			var timeout;
			function autopager_timeout(){
				clearTimeout(timeout);
				timeout=setTimeout(autopager_scroll,100);
			};

			if(document.documentElement.scrollHeight<=window.innerHeight)autopager_scroll();
			window.addEventListener('scroll',autopager_timeout,false);
		};

		function headfixed(){
			//辅助CSS
			var fixedshadow=prefs.fixedshadow ?'\
				box-shadow:0 2px 5px black;\
				-moz-box-shadow:0 2px 5px black;\
				-webkit-box-shadow:0 2px 5px black;\
			' : '';
			var style=document.createElement('style');
			style.type='text/css';
			style.innerHTML='\
				body>div.gac_od{\
					position:fixed;\
					z-index:110;\
				}\
				#leftnav{\
					position:fixed!important;\
					border-radius:2px;\
				}\
				#fdiv{\
					position:fixed;\
					top:0;\
					left:0;\
					background-color:white;\
					z-index:99;\
					width:100%;\
					border-bottom:1px solid #ccc;\
				}\
				#gog{\
					min-width:700px;\
				}\
				#subform_ctrl{\
					min-width:400px;\
				}\
				#sfcnt{\
					margin-top:6px;\
				}\
				#cnt{\
					padding-top:0;\
				}\
				#fdiv,\
				#leftnav{\
					'+fixedshadow+'\
				}';
			document.getElementsByTagName('head')[0].appendChild(style);
			var fdiv=document.createElement('div');
			fdiv.id='fdiv';
			var gog=document.getElementById('gog');
			var sfcnt=document.getElementById('sfcnt');
			var subform_ctrl=document.getElementById('subform_ctrl');
			fdiv.appendChild(gog);
			fdiv.appendChild(sfcnt);
			fdiv.appendChild(subform_ctrl);
			fdiv.appendChild(document.createElement('div'));

			var slist=document.getElementById('slist');
			if(!slist){
				document.addEventListener('search_EJ_loaded',function(){
					try{
						fdiv.appendChild(document.getElementById('slist'));
						cntMT();
						document.removeEventListener('search_EJ_loaded',arguments.callee,false);
					}catch(e){};
				},false);
			}else{
				fdiv.appendChild(slist);
			};

			document.body.appendChild(fdiv);
			var leftnav=document.getElementById('leftnav');
			var cnt=document.getElementById('cnt');
			function cntMT(){
				var fdivH=document.defaultView.getComputedStyle(fdiv,'').height;
				cnt.style.marginTop=parseInt(fdivH)+2+'px';
				leftnav.style.top=parseInt(fdivH)+10+'px';
			};
			cntMT();
			window.addEventListener('resize',cntMT,false);
			setTimeout(function(){cntMT()},0);
		};

		//来自googlekingkong,根据域名切换服务器,将需要获取缩略图的网址作为参数传递;
		function getImageURL(href) {
			var fullDomain = getFullDomain(href);
			var protocol = "unknown";
		//获取去掉协议的域名部分site,http://www.baidu.com 则获取 www.baidu.com
			var site = fullDomain;
			if (site.indexOf("http://") == 0) {
				site = site.substring(7, site.length);
				protocol = "http://";
			}else if (site.indexOf("https://") == 0) {
				site = site.substring(8, site.length);
				protocol = "https://";
			}
		//获取缩略图网址
			var preview = "http://"+getGPSub(site)+".googlepreview.com/preview?s=" + protocol + site +  "&ra=1";
			return preview;
		}

		function getFullDomain(href) {
			var domain = href.match(/http(?:s)?:\/\/[^\/]+/i);
			return domain ? domain[0].toLowerCase() : href;
		}

		function getGPSub(site) {
			site = site.toLowerCase();
			if (site.indexOf("www.") == 0) {
				site = site.substring(4, site.length);
			}
			return site.length > 0 ? site.charAt(0) : "a";
		};

		var imstyle='width:'+ 111*prefs.thumbsize +'px;height:'+82*prefs.thumbsize+'px;'+'border:none!important;'
		function thumloaded(e){
			e.target.parentNode.removeChild(e.target.previousSibling);
			e.target.setAttribute('style',imstyle);
		};

		function sitethumb(list,listl){
			var i,
						lig,
						fa,
						fahref,
						a,
						bimg,
						pimg,
						imagelink;
			for(i=0;i<listl;i++){
				lig=list.snapshotItem(i);
				if(lig.parentNode.parentNode.id=='qtsm')continue;
				fa=lig.getElementsByTagName('a')[0];
				if(!fa){
					continue;
				}else{
					fahref=fa.href;
				};
				a=document.createElement('a');
				a.style.cssText='\
					float:left;\
					margin-right:8px;\
					border:1px solid #ccc;\
				';
				a.href=fahref;
				bimg=new Image();
				//默认图片
				bimg.src="data:image/gif;base64,R0lGODlhbwBSAKIAAMzMzP///+Xl5e/v79XV1d/f3/n5+QAAACH5BAAHAP8ALAAAAABvAFIAAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd/wMOA8ZRg9l06nGAIHgiMwMNwFBMmnIjpYBjsEApIQyO4KggHBICgoxtCujjs2EAQBwPWjPbt3BgD0HWdyoWJ7SHsFYnMedWp1YkYBhYVPUIVEYmN6cIccfF1qCgBHO2JykYZMQAByBZ+ZmgUFdYmVXGdmkU9ZmK5+rJpOvD2Jv8IUs8M4vsYiZL5ITklhTFFwTQtQBsjJE4xlXWF8AFq4AlxyXrpvldkWkApu7XKr3H3loWOzpeoTwfjwU5j9i8IVKZYvQpprcY6Q8+epT0BOjmoVlPBqjJ8spxjO62So/9K4iS+WpAHZoqJEkihTquxAJko0Xy2L6HC5ssKdAWbGbfGjQ45OfDUn5KniackYdmBGjgrqY5yZpeGcQfnH1GbDOnme1NKitCoxLwHcgHWEy1Yfr2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx58qCU2Dj8iNDl8IXEMVXtWefgIAVwWApIzbHpBeQrBDZ0dAPAV+tfoBpjcgPOlSs8CVW/gUBZlMQ4znwLAhcVcZ6SjZlNQmXEXthZxlksb5Jl2msBwPh/z/OEy4HTuU6TZcPnhunrPd91u/Xhl+0m8zxqqV7tMppirPEvUJ9L10dWQb5cxA9nESIcu669m8IFOTwbo4gocmyG21DXedabTUuqddsuE+YGlxxALbJJbfnCcswN++V3DhhvwgRCMJ2u8VkCJTNDj2YS6tIOiAxoWE99oo3wDU1iXdIPeBt5V88lyLX74nGzb6fZRkEFKyMAmRLrxj3NnIAlEbmf0lqAHsqzWDm+soYKJI+DQdw+YMzawmWquKaCKExqiUhuWLVoRwjV2WgCNVoLlBkVmgA2SJ2GEFmrooYgmqlICADs=";
				bimg.style.cssText=imstyle;
				a.appendChild(bimg);
				pimg=new Image();
				imagelink=getImageURL(fahref);
				pimg.src=imagelink;
				pimg.style.display='none';
				a.appendChild(pimg);
				pimg.addEventListener('load',thumloaded,false);
				lig.insertBefore(a,lig.firstChild);
			};
		};

		function shortUN(){
			var username=matchSingleNode('//div[@id="guser"]/nobr/b');
			if(username){
				username.innerHTML=username.innerHTML.replace(/@gmail\.com$/i, '');
			};
		};

		function dleftdiv(){
			var expand='<img style="border:none;" src="data:image/gif;base64,R0lGODlhDQANAKL/AM3f/4io/////93p/lyH2hERzAAAAAAAACwAAAAADQANAAADLwix3KEiyjlImCXLemUum4VpESd8aGam6MqqokcKpgyWcfSFweD/wAqAQCwaCYAEADs=" />显示边栏';
			var collapse='<img  style="border:none;" src="data:image/gif;base64,R0lGODlhDQANAKIHAM3f/4io/////93p/lyH2hERzAAAAAAAACwAAAAADQANAAADKAix3KEiyjlImFjUm+XuniUUZFl+ZoqmpwhqLvi922DfeAUQfO8TgAQAOw==" />隐藏边栏';
			var a=document.createElement('a');
			a.href='javascript:'
			a.style.cssText='\
				position:absolute;\
				bottom:0;\
				left:-160px;\
				font-size:12px!important;\
			';

			var leftdiv=document.getElementById('leftnav');
			var center_col=document.getElementById('center_col');

			if(prefs.leftdivs){
				a.innerHTML=expand;
				leftdiv.style.display='none';
				center_col.style.marginLeft=0;
				leftdiv.style.left='-166px';
				leftdiv.style.opacity=0;
			}else{
				a.innerHTML=collapse;
				center_col.style.marginLeft='159px';
				leftdiv.style.left=0;
				leftdiv.style.opacity=1;
			};

			setTimeout(function(){
				leftdiv.style.cssText+='\
					;-o-transition:left 0.3s ease-in-out,opacity 0.6s ease-in-out;\
					-webkit-transition:left 0.3s ease-in-out,opacity 0.6s ease-in-out;\
					-moz-transition:left 0.3s ease-in-out,opacity 0.6s ease-in-out;\
				';
				center_col.style.cssText+='\
					;-o-transition:margin-left 0.3s ease-in-out;\
					-moz-transition:margin-left 0.3s ease-in-out;\
					-webkit-transition:margin-left 0.3s ease-in-out;\
				';
			},0);

			var timeout,
						timeout2;
			function control(){
				if(this.textContent!='显示边栏'){
					clearTimeout(timeout);
					timeout=setTimeout(function(){
						leftdiv.style.display='none';
					},300);
					center_col.style.marginLeft=0;
					a.innerHTML=expand;
					leftdiv.style.left='-166px';
					leftdiv.style.opacity=0;
				}else{
					clearTimeout(timeout);
					leftdiv.style.display='';
					a.innerHTML=collapse;
					setTimeout(function(){
						center_col.style.marginLeft='159px';
						leftdiv.style.left=0;
						leftdiv.style.opacity=1;
					},0);
				};
				clearTimeout(timeout2);
				timeout2=setTimeout(Height,366);
			};

			a.addEventListener('click',control,false);

			var subform_ctrl=document.getElementById('subform_ctrl');
			subform_ctrl.insertBefore(a,subform_ctrl.firstChild);
		};

		function colorful(list,listl){
			var i,
						random,
						arrayl=prefs.colorArray.length-1,
						color_array=prefs.colorArray;
			for(i=0;i<listl;i++){
				random=Math.round(Math.random()*arrayl);
				list.snapshotItem(i).style.backgroundColor=color_array[random];
			};
		};

		function suggestfixed(){
			var brs=document.getElementById('brs');
			if(brs){
				document.body.appendChild(brs);
				var brsH=parseFloat(document.defaultView.getComputedStyle(brs,'').height);
				brs.style.cssText+='\
					;display:none;\
					height:0;\
					padding:5px;\
					padding-bottom:10px;\
					position:absolute;\
					z-index:300;\
					background-color:white;\
					border-radius:4px;\
					-moz-border-radius:4px;\
					border:1px solid #ccc;\
					opacity:0;\
					-o-transition:opacity 0.3s ease-in-out,height 0.3s ease-in-out;\
					-webkit-transition:opacity 0.3s ease-in-out,height 0.3s ease-in-out;\
					-moz-transition:opacity 0.3s ease-in-out,height 0.3s ease-in-out;\
					box-shadow:2px 2px 5px black;\
					-moz-box-shadow:2px 2px 5px black;\
					-webkit-box-shadow:2px 2px 5px black\
				';
				var a=document.createElement('a');
				a.href='javascript:';
				a.style.cssText='\
					float:left;\
					margin-right:22px;\
					font-size:12px;\
					color:red;\
				';
				a.textContent='相关搜索▼';
				var resultStats=document.getElementById('resultStats');
				resultStats.appendChild(a);

				var timeout,
							timeout2;
				function disappear(){
					brs.style.opacity=0;
					brs.style.height=0;
					clearTimeout(timeout2);
					timeout2=setTimeout(function(){
						brs.style.display='none';
					},300);
				};

				a.addEventListener('mouseover',function(e){
					clearTimeout(timeout);
					clearTimeout(timeout2);
					brs.style.display='';
					setTimeout(function(){
						brs.style.height=brsH+'px';
						brs.style.top=e.pageY+'px';
						brs.style.left=e.pageX+'px';
						brs.style.opacity=0.96;
					},0);
				},false);

				a.addEventListener('mouseout',function(){
					timeout=setTimeout(disappear,500);
				},false);

				brs.addEventListener('mouseover',function (){
					clearTimeout(timeout);
					clearTimeout(timeout2);
				},false);

				brs.addEventListener('mouseout',function(){
					timeout=setTimeout(disappear,500);
				},false);

			};
		};

		function cachedfix(){
			document.addEventListener('mouseover',function(e){
				var target=e.target;
				if(target.tagName.toLowerCase()!='a')return;
				var href=target.href;
				if(/^http:\/\/webcache\.google/i.test(href)){
					target.removeAttribute('onmousedown');
					target.href=href.replace(/^http:/i,'https:');
				};
			},false);
		};

		//开始执行..........
		var FP_lis=matchNodes('//div[@id="ires"]/ol/li');
		var FP_lisl=FP_lis.snapshotLength;
		if(FP_lisl==0)return;
		var FP_ligs=matchNodes('//div[@id="ires"]/ol/li[@class="g" or starts-with(@class,"g ")]');
		var FP_ligsl=FP_ligs.snapshotLength;
		if(FP_ligsl==0)return;

		if(prefs.dleftdiv)dleftdiv();
		if(prefs.suggestfixed)suggestfixed();
		if(prefs.cachedfix)cachedfix();
		if(prefs.d_columns)li_ol(FP_lis,FP_lisl);
		if(prefs.d_columns)tqqt();
		d_columns();
		if(prefs.colorful)colorful(FP_lis,FP_lisl);

		if(prefs.d_columns){
			FP_ligs=matchNodes('//ol[@class="Nol"]/li[@class="g" or starts-with(@class,"g ")]');
			FP_ligsl=FP_ligs.snapshotLength;
			//alert(FP_ligsl);
			var FP_odd;
			if(FP_ligsl%2!==0)FP_odd=true;
		};

		if(prefs.sitethumb)sitethumb(FP_ligs,FP_ligsl);
		if(prefs.shortUN)shortUN();
		if(prefs.headfixed)headfixed();
		if(prefs.autopager)autopager();
		UIs();
		if(prefs.d_columns)Height(FP_ligs,FP_ligsl);
		//alert(new Date()-time1); //60毫秒
	};

	if(/^https?:\/\/\w{2,10}\.google(?:\.[^\.]{1,4}){1,2}\/search\?/i.test(location.href)){
		if(window.opera){
			document.addEventListener('DOMContentLoaded',init,false);
		}else{
			init();
		};
	};
})();
