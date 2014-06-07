// ==UserScript==
// @name cssbox
// @author NLF
// @description css管理器(support opera 10.62+).
// @date 2010-3-30
// @modifydate 2010-11-24
// @version 2.0.1.5
// @include http*
// ==/UserScript==

(function(){
	//var js_start=new Date();
	var opera=window.opera;
	if(!opera)return;
	var ss=opera.scriptStorage;
	if(!ss)return;

	var prefs={
		taHeight:100,															//编辑区,默认的高度.
		ctSize:[499,366],													//容器的默认宽高.(宽度不得小于 333,高度不得小于222)
		autoHeight:true,													//textarea自适应高度.
			transition:true,												//是否启用过渡.
				timingFn:'ease-in-out',								//动画方式
				duration:200,													//持续时间.单位:毫秒
			maxHeight:200,													//允许的最大高度.
			monitoringInterval:1666,								//当聚焦到编辑区的时候,每隔多少毫秒调整一次监视一次高度.
		notLoadNM:false,													//不加载没有匹配到当前站点的规则到编辑界面.
		existRED:false,													//已经存在的规则,默认展开
		newRED:true	,															//新建的规则,默认展开
		newRRegExpD:false,												//新建的规则,默认url为正则模式
		kcinfo:{//添按键代码,在地址栏输入:  javascript:document.addEventListener('keyup',function(e){alert(e.keyCode)},false);  然后按键就会填出代码了.
			del:68,									//删除元素															默认: d:68
			undo:90,								//撤销最后一次删除											默认: z:90
			save:88,								//保存																	默认: x:88
			quit:27,								//取消,退出															默认: esc:27
			nextSE:87,							//选择下一个兄弟元素(如果存在的话)			默认: e:87
			preSE:69,								//选择上一个兄弟元素(如果存在的话)			默认: w:69
			parentE:81,							//选择 父元素(如果存在的话)							默认  q:81
		},
		UIShadow:true,						//是否给主界面添加阴影(关掉之后,移动能快些,特别是机器不好的同学)
	};

	//载入设置.
	var xprefs=ss.getItem('xprefs');
	if(xprefs){
		try{
			xprefs=eval('('+xprefs+')');
		}catch(e){
			ss.removeItem('xprefs');
		};
		if(xprefs && typeof xprefs=='object'){
			for(var set in xprefs){
				if(xprefs.hasOwnProperty(set)){
					prefs[set]=xprefs[set];
				};
			};
		};
	};


	var dataArray=[];
	var matchedArray=[];
	var matchedArray_d=[];
	//var JSONParse=JSON.parse;//不能parse正则,还是eval强大.

	var ssl=ss.length-1;
	var url=location.href;
	var value,key;
	var style=document.createElement('style');
	style.type='text/css';
	var head=document.querySelector('head');
	if(!head)return;
	//alert(head);
	for(;ssl>=0;ssl--){
		key=ss.key(ssl);
		//alert(key);
		//ss.removeItem(key);
		if(key && key.indexOf('usercss:')==0){
			try{
				//alert('('+ss.getItem(key)+')');
				//alert(ss.getItem(key));
				value=eval('('+ss.getItem(key)+')');
				//alert(value);
				//alert(typeof value.url)
			}catch(e){
				//alert('错误')
				ss.removeItem(key);//出现错误的key移除它.
			};

			if(value.url.test(url)){
				value.style=style.cloneNode(false);
				value.cssText=decodeURIComponent(value.cssText);
				value.decode=true;
				if(!value.disabled){
					value.style.textContent=value.cssText;
					value.append=true;
					head.appendChild(value.style);
					matchedArray.push(value);
				}else{
					matchedArray_d.push(value);
				};
			}else{
				dataArray.push(value);
			};
		};
	};

	//alert(new Date()-js_start);//耗时.

	var created,
		finEING;
	function createCSSBoxUI(){
		if(!document.body)return;
		if(created){
			if(!finEING){
				created.style.setProperty('display','block','important');
			};
			return;
		};


		var url_rf=url;
		var ss_rf=ss;
		var docTitle=document.title;
		var hostName=(url_rf.match(/(^https?:\/\/[^\/]*)/i) || ['',''])[1];
		var docRegExp=new RegExp(hostName.replace(/\./g,'\\.'));
		var docString=hostName+'*';
		//alert(docString)
		//alert(docRegExp);

		//alert(docRegExp)

		var style_rf=style;
		var head_rf=head;

		var gstyle=style_rf.cloneNode(false);
		gstyle.textContent='\
			/*最外层的容器*/\
			#cssbox_container{\
				border:2px solid #F6AE37!important;\
				position:fixed!important;\
				background-color:#F2F2F2!important;\
				border-radius:5px!important;\
				padding:2px!important;\
				margin:0!important;\
				z-index:999999!important;\
				font-size:13px!important;\
				color:black!important;\
				line-height:1.5!important;\
				text-align:left!important;\
			}\
			/*重置div的一些属性,防止与页面上的冲突*/\
			#cssbox_container div{\
				padding:0;\
				margin:0;\
				width:auto;\
				border:none;\
				height:auto;\
				float:none;\
				position:static;\
				display:block;\
				background:none;\
				border-radius:0;\
				box-shadow:none;\
				box-sizing:content-box;\
			}\
			/*缩放控制杆统一样式*/\
			.cb_resizable_handle{\
				position:absolute!important;\
				z-index:999999!important;\
			}\
			/*north控制杆*/\
			#cb_resizable_n {\
				width:100%!important;\
				height:7px!important;\
				top:-5px!important;\
				left:0!important;\
				cursor:n-resize!important;\
			}\
			/*east控制杆*/\
			#cb_resizable_e {\
				height:100%!important;\
				width:7px!important;\
				right:-5px!important;\
				top:0!important;\
				cursor:e-resize!important;\
			}\
			/*south控制杆*/\
			#cb_resizable_s{\
				width:100%!important;\
				height:7px!important;\
				bottom:-5px!important;\
				left:0!important;\
				cursor:s-resize!important;\
			}\
			/*west控制杆*/\
			#cb_resizable_w {\
				height:100%!important;\
				width:7px!important;\
				left:-5px!important;\
				top:0!important;\
				cursor:w-resize!important;\
			}\
			/*southeast控制杆*/\
			#cb_resizable_se {\
				bottom:-5px!important;\
				right:-5px!important;\
				height:7px!important;\
				width:7px!important;\
				cursor:se-resize!important;\
			}\
			/*southwest控制杆*/\
			#cb_resizable_sw {\
				width:7px!important;\
				height:7px!important;\
				bottom:-5px!important;\
				left:-5px!important;\
				cursor:sw-resize!important;\
			}\
			/*northeast控制杆*/\
			#cb_resizable_ne {\
				width:7px!important;\
				height:7px!important;\
				top:-5px!important;\
				right:-5px!important;\
				cursor:ne-resize!important;\
			}\
			/*northwest控制杆*/\
			#cb_resizable_nw {\
				width:7px!important;\
				height:7px!important;\
				top:-5px!important;\
				left:-5px!important;\
				cursor:nw-resize!important;\
			}\
			/*标题栏*/\
			#cb_dialog_titlebar,\
			#cb_dialog_alert_title{\
				background-color:#F6AE37!important;\
				text-shadow:#FFF 0 1px 1px!important;\
				box-shadow:0 15px 20px #FFC15A inset!important;\
				vertical-align:middle!important;\
				border:1px solid #ccc!important;\
			}\
			#cb_dialog_titlebar{\
				/*视觉上-_-!!去掉内联元素,换行空格*/\
				word-spacing:-99px!important;\
				overflow:hidden!important;/*清除浮动*/\
				cursor:move!important;\
				border-radius:5px 5px 0 0!important;\
				padding:6px 10px 6px 8px!important;\
			}\
			/*标题栏左边div*/\
			#cb_dialog_title_div{\
				-o-text-overflow:ellipsis!important;\
				text-overflow:ellipsis!important;\
				float:left!important;\
				max-width:300px!important;\
				overflow:hidden!important;\
				white-space:nowrap!important;\
			}\
			#cb_dialog_ico{\
				vertical-align:middle!important;\
				cursor:pointer!important;\
				padding:0 2px!important;\
				border:none!important;\
				margin:0!important;\
			}\
			#cb_dialog_title{\
				margin-right:8px!important;\
			}\
			/*标题栏右边div,如果只浮动右边,在混杂渲染模式下,会出问题*/\
			#cb_dialog_command_div{\
				float:right!important;\
			}\
			#cb_dialog_command_div>span{\
				margin-right:10px!important;\
				cursor:pointer!important;\
			}\
			#cb_dialog_command_div>span:last-child{\
				margin-right:0!important;\
			}\
			/*内容容器*/\
			#cb_dialog_content{\
				overflow:auto!important;\
				margin:2px 3px!important;\
			}\
			/*需要垂直居中的消息提示框*/\
			#cb_dialog_alert td,\
			#cb_dialog_alert tr,\
			#cb_dialog_alert{\
				background:none!important;\
			}\
			#cb_dialog_alert,\
			#cb_black_div{\
				display:none!important;\
				width:100%!important;\
				height:100%!important;\
				position:absolute!important;\
				top:0!important;\
				left:0!important;\
				margin:0!important;\
				padding:0!important;\
				border:none!important;\
			}\
			#cb_black_div{\
				background-color:rgba(0,0,0,0.3)!important;\
			}\
			#cb_dialog_alert td{\
				vertical-align:middle!important;\
				text-align:center!important;\
			}\
			#cb_dialog_alert_box{\
				display:inline-block!important;\
				border:1px solid #F6AE37!important;\
				border-radius:3px!important;\
				background-color:#EEF0F8!important;\
				padding:2px!important;\
				box-shadow:0 0 8px rgba(0,0,0,0.8)!important;\
			}\
			#cb_dialog_alert_title{\
				text-align:left!important;\
				padding:1px 2px 1px 3px!important;\
				border-radius:3px 3px 0 0!important;\
			}\
			#cb_dialog_alert_content{\
				height:50px!important;\
				width:222px!important;\
				overflow:auto!important;\
				padding:5px!important;\
				margin:3px!important;\
			}\
			#cb_dialog_alert_button{\
				text-align:right!important;\
				padding:1px 3px 1px 3px!important;\
				border-top:1px solid #ccc!important;\
				background-color:#FAFAFA!important;\
				overflow:hidden!important;\
				line-height:1.6!important;\
			}\
			.cb_dialog_alert_cus_button{\
				display:inline!important;\
				cursor:pointer!important;\
				margin-left:8px!important;\
				padding:1px 10px!important;\
				background-color:#DFDFDF!important;\
				border:1px solid #BCBCBC!important;\
				border-radius:3px!important;\
				vertical-align:middle!important;\
			}\
			.cb_dialog_alert_cus_button:hover{\
				background-color:#F6AE37!important;\
			}\
			#cb_dialog_not_alert_box{\
				float:left!important;\
			}\
			#cb_dialog_not_alert_box_right{\
				float:right!important;\
			}\
			/*规则的容器*/\
			.cb_rule_container{\
				margin-bottom:2px!important;\
				border:1px solid #ccc!important;\
			}\
			/*规则的标题栏*/\
			.cb_rule_titlebar{\
				background-color:#F6AE37!important;\
				text-shadow:#FFF 0 1px 1px!important;\
				vertical-align:middle!important;\
				border:1px solid #ccc!important;\
				overflow:hidden!important;\
				line-height:2.2!important;\
				position:relative!important;\
				padding:0 10px 0 0!important;\
				top:0!important;\
				left:0!important;\
			}\
			.cb_rule_titlebar>*{\
				line-height:2.2!important;\
			}\
			.cb_rule_title_box{\
				-o-text-overflow:ellipsis!important;\
				text-overflow:ellipsis!important;\
				float:left!important;\
				white-space:nowrap!important;\
				width:100%!important;\
				box-sizing:border-box!important;\
				padding:0 130px 0 10px!important;\
				overflow:hidden!important;\
			}\
			.cb_rule_command{\
				position:absolute!important;\
				padding:0 0 0 10px!important;\
				right:10px!important;\
				top:0!important;\
				background-color:#F6AE37!important;\
			}\
			.cb_rule_command>span{\
				cursor:pointer!important;\
			}\
			/*防止高度塌陷的占位符*/\
			.cb_rule_title_ph{\
				opacity:0!important;\
			}\
			/*规则内容*/\
			.cb_rule_content{\
				padding:3px!important;\
			}\
			.cb_rule_title_container,\
			.cb_rule_url_container{\
				position:relative!important;\
				left:0!important;\
				top:0!important;\
				margin-bottom:5px!important;\
			}\
			.cb_rule_title_input,\
			.cb_rule_url_input,\
			.cb_rule_editor{\
				width:100%!important;\
				box-sizing:border-box!important;\
				margin:0!important;\
				padding:0 0 0 37px!important;\
				height:23px!important;\
				border:1px solid #ABADB3!important;\
				border-radius:3px!important;\
				background:none!important;\
				background-color:white!important;\
				color:black!important;\
			}\
			.cb_rule_title_input:focus,\
			.cb_rule_url_input:focus,\
			.cb_rule_editor:focus{\
				box-shadow:0 0 5px #F6AE37!important;\
				border:2px solid #F6AE37!important;\
			}\
			.cb_rule_url_input{\
				padding-right:55px!important;\
			}\
			.cb_rule_editor{\
				padding:3px!important;\
				height:'+prefs.taHeight+'px!important;\
				line-height:1.5!important;\
				margin-bottom:5px!important;\
			}\
			.cb_rule_title_lable,\
			.cb_rule_url_lable,\
			.cb_rule_url_isrg_box{\
				position:absolute!important;\
				line-height:23px!important;\
				color:#3E3E3E!important;\
				vertical-align:middle!important;\
				position:absolute!important;\
			}\
			.cb_checkbox_style{\
				border:1px solid #ccc!important;\
				padding:1px!important;\
				margin:3px!important;\
				width:13px!important;\
				height:13px!important;\
				background:none!important;\
				cursor:pointer!important;\
			}\
			.cb_rule_title_lable,\
			.cb_rule_url_lable{\
				top:0!important;\
				left:3px!important;\
			}\
			.cb_rule_url_isrg_box{\
				top:0!important;\
				right:3px!important;\
			}\
			/*控制按钮*/\
			.cb_rule_button{\
				border-top:1px solid #ccc!important;\
				border-bottom:1px solid #ccc!important;\
				word-spacing:-99px!important;\
				padding:3px!important;\
				text-align:right!important;\
				vertical-align:middle!important;\
			}\
			.cb_rule_button>span{\
				cursor:pointer!important;\
				margin-right:5px!important;\
				padding:1px 6px!important;\
				background-color:#DFDFDF!important;\
				border:1px solid #BCBCBC!important;\
				border-radius:3px!important;\
			}\
			.cb_rule_button>span:hover{\
				background-color:#F6AE37!important;\
			}\
			.cb_rule_button>span:last-child{\
				margin-left:10px!important;\
			}\
			/*下拉命令菜单*/\
			#cb_dialog_prefs{\
				position:absolute!important;\
				top:38px!important;\
				left:3px!important;\
				background-color:#F2F2F2!important;\
				border-radius:3px!important;\
				border:1px solid #F6AE37!important;\
				box-shadow:2px 2px 5px rgba(0,0,0,0.3)!important;\
			}\
			#cb_dialog_prefs>ul{\
				border:none!important;\
				padding:0!important;\
				margin:0!important;\
				position:relative!important;\
				left:0!important;\
				top:0!important;\
			}\
			#cb_dialog_prefs>ul:after{\
				content:""!important;\
				border-width:8px!important;\
				border-style:solid!important;\
				border-color:transparent transparent #F6AE37 transparent!important;\
				display:block!important;\
				height:0!important;\
				width:0!important;\
				padding:0!important;\
				position:absolute!important;\
				top:-17px!important;\
				left:6px!important;\
				display:none!important;\
			}\
			#cb_dialog_prefs li{\
				text-align:left!important;\
				list-style-type:none!important;\
				cursor:pointer!important;\
				padding:3px 7px!important;\
				border:none!important;\
				border-top:1px solid #ccc!important;\
			}\
			#cb_dialog_prefs li:hover{\
				background-color:#F6AE37!important;\
			}\
			#cb_dialog_title_total_number{\
				display:inline-block!important;\
				display:none!important;\
			}\
		';
		head_rf.appendChild(gstyle);

		var div=document.createElement('div');

		//最外面的容器.
		var container=div.cloneNode(false);
		created=container;
		container.id='cssbox_container';
		container.style.cssText='\
			top:20px!important;\
			left:20px!important;\
		'+(prefs.UIShadow? 'box-shadow:0 0 10px rgba(0,0,0,0.9)!important;' : '');

		container.innerHTML='\
			<div id="cb_resizable_n" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_e" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_s" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_w" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_se" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_sw" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_nw" class="cb_resizable_handle"></div>\
			<div id="cb_resizable_ne" class="cb_resizable_handle"></div>\
			<div id="cb_dialog_titlebar">\
				<div id="cb_dialog_title_div">\
					<img id="cb_dialog_ico" title="点击设置" src="data:image/gif;base64,R0lGODlhEAAQAOZWAP7+/vz8/ae6wpamvlpkafT5++v0+P3+/vv8/ez1+Orz9+/2+fn7/LHFzeby  93qGi+Hu9aGyyGVqbGhsbf39/bTGzvr8/bHA1rjH3fT09EhabMHJy/H3+tDl77vFyejz9pCfts7k  7uPw9e/2+t7t8+Xx9sDGyu32+cze5mJpa4+ht2lsbdvb2/L3+pGQkF5mamdrbcbKzP7+/+31+LXB  x32QpuDu9Ojz97jCyOPv9fb6+5iqwNnr8neEil9naltlaWRpbPf6/Pf7/LrK0WFoa4aYrr/N5MXJ  zLPAxvL4+sXT6b3FyScwOqm5z9zb26i6wt3s883k7lhuhRs0Ukym3P///////wAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5  BAEAAFYALAAAAAAQABAAAAeqgFYARSo7EU0XGEZKA1aOjzUdIVGUlVGNjlSam5yaDSCZVVWaoqSj  PQ2No6Sbq1QEAlNWrlSltaOwsre3o6K4sVadwlQ/T7JOLkwrEzASQClEPi8PFbIZLBoxRxsmSx44  NEhDKLJWFFI6BS0LCQoOOTZQPOUBUhZS+PgGNyUQJPRSDiBgEKRAkhHtHIgACCCfwxMGPjAEAEAg  AyEFOCyYUU7GlI8gQ4K0EggAOw=="/>\
					<span id="cb_dialog_title">cssbox</span>\
					<div id="cb_dialog_title_total_number">\
						<span id="cb_dialog_title_match_number">5</span>匹配\
						(<span id="cb_dialog_title_enable_number">3</span>启用)\
					</div>\
				</div>\
				<div id="cb_dialog_command_div">\
					<span id="cb_dialog_new" title="新建CSS">新建</span>\
					<span id="cb_dialog_close" title="关闭对话框">关闭</span>\
				</div>\
			</div>\
			<div id="cb_dialog_content">\
			</div>\
			<div id="cb_black_div">\
			</div>\
			<table id="cb_dialog_alert">\
				<tr>\
					<td>\
						<div id="cb_dialog_alert_box">\
							<div id="cb_dialog_alert_title">\
							</div>\
							<div id="cb_dialog_alert_content">\
								<b>Opera</b>\
							</div>\
							<div id="cb_dialog_alert_button">\
								<div id="cb_dialog_not_alert_box">\
									<input type="checkbox" class="cb_checkbox_style">\
									<span id="cb_dialog_not_alert">不再提醒</span>\
								</div>\
								<div id="cb_dialog_not_alert_box_right">\
									<span class="cb_dialog_alert_cus_button" id="cb_dialog_alert_button_y">是</span>\
									<span class="cb_dialog_alert_cus_button" id="cb_dialog_alert_button_n">否</span>\
								</div>\
							</div>\
						</div>\
					</td>\
				</tr>\
			</table>\
			<div id="cb_dialog_prefs" style="display:none!important;">\
				<ul>\
					<li>导入</li>\
					<li>导出</li>\
					<li>首选项</li>\
				</ul>\
			</div>\
		';

		//每个规则的容器,创建一个实例,后面用来拷贝
		var rule_container=div.cloneNode(false);
		rule_container.className='cb_rule_container';

		rule_container.innerHTML='\
			<div class="cb_rule_titlebar">\
				<div class="cb_rule_title_box">\
					<span class="cb_rule_title_ph">.</span>\
					<span class="cb_rule_title_disabled"></span>\
					<span class="cb_rule_title_matched"></span>\
					<span class="cb_rule_title"></span>\
				</div>\
				<div class="cb_rule_command">\
					<span class="cb_rule_command_expand">展开</span>\
					<span class="cb_rule_command_disable">禁用</span>\
					<span class="cb_rule_command_delete">删除</span>\
				</div>\
			</div>\
			<div class="cb_rule_content">\
				<div class="cb_rule_title_container">\
					<span class="cb_rule_title_lable">标题:</span>\
					<input type="text" class="cb_rule_title_input" value=""/>\
				</div>\
				<div class="cb_rule_url_container">\
					<span class="cb_rule_url_lable">url:</span>\
					<input type="text" class="cb_rule_url_input" value=""/>\
					<span class="cb_rule_url_isrg_box">正则<input title="勾上以后,将以正则模式对当前填写的URL进行解析,默认是通配符模式" type="checkbox" class="cb_checkbox_style cb_rule_url_isrg"/>\
					</span>\
				</div>\
				<textarea class="cb_rule_editor" wrap="off" xbackuping="true" autoheight="true"></textarea>\
				<div class="cb_rule_button">\
					<span type="button" class="cb_rule_preview" title="预览正在编辑的CSS">预览</span>\
					<span type="button" class="cb_rule_restore" title="还原页面成没有加载CSS的样子">还原</span>\
					<span type="button" class="cb_rule_find" title="查找元素通过按键,执行删除,撤销,还原等动作" >查找</span>\
					<span type="button" class="cb_rule_cancle" title="取消修改的内容,还原成最后一次保存的时候的样子" >取消</span>\
					<span type="button" class="cb_rule_save" title="保存当前编辑框里的数据">保存</span>\
				</div>\
			</div>\
		';

		function getElementByXpath(xpath,contextNode){
			contextNode=contextNode || document;
			return document.evaluate(xpath,contextNode,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		};

		function getElementByCSS(css,contextNode){
			contextNode=contextNode || document;
			return contextNode.querySelector(css);
		};

		//忽略一些事件
		function stopP(e){
			e.stopPropagation();
		};

		container.addEventListener('dblclick',stopP,false);
		container.addEventListener('click',stopP,false);
		container.addEventListener('keypress',stopP,false);
		container.addEventListener('keydown',stopP,false);
		container.addEventListener('keyup',stopP,false);

		//显示下拉菜单.
		var dialog_ico=getElementByCSS('#cb_dialog_ico',container);
		var dialog_prefs=getElementByCSS('#cb_dialog_prefs',container);
		dialog_ico.addEventListener('click',function(e){
			var ds=dialog_prefs.style;
			if(ds.display=='none'){
				stopP(e);
				ds.setProperty('display','block','important');
				container.addEventListener('click',function(e){
					this.removeEventListener(e.type,arguments.callee,!!(e.eventPhase==1));
					ds.setProperty('display','none','important');
				},false);
			};
		},false);

		var dialog_content=getElementByXpath('.//div[@id="cb_dialog_content"]',container);
		var ctSize=prefs.ctSize;
		var ctSizeW=Math.max(ctSize[0],333);
		var ctSizeH=Math.max(ctSize[1],222);
		dialog_content.style.cssText='\
			min-width:'+ctSizeW+'px!important;\
			min-height:'+ctSizeH+'px!important;\
			width:'+ctSizeW+'px!important;\
			height:'+ctSizeH+'px!important;\
		';



		function removeListener(array){
			for(var array_x,i=array.length-1;i>=0;i--){
				array_x=array[i];
				document.removeEventListener(array_x.type,array_x.fn,!!(array_x.eventPhase==1));
			};
		};

		function move_fn_x(cs,left){
			cs.setProperty('left',left+'px','important');
		};
		function move_fn_y(cs,top){
			cs.setProperty('top',top+'px','important');
		};

		//拖动UI
		var dialog_titlebar=getElementByXpath('.//div[@id="cb_dialog_titlebar"]',container);
		dialog_titlebar.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			if(this!==e.target)return;
			e.preventDefault();
			var cs=container.style;
			var left=parseInt(cs.left,10);
			var top=parseInt(cs.top,10);
			var cursorX=e.clientX;
			var cursorY=e.clientY;
			var shift=e.shiftKey;
			var moveTimes=0;
			function move(e){
				if(shift===true){
					moveTimes+=1;
					//测量 10次,哪个方向上偏移大,就固定那个方向.
					if(moveTimes==11){
						if(Math.abs(e.clientY-cursorY)>(Math.abs(e.clientX-cursorX))){
							shift='y';
						}else{
							shift='x';
						};
					}else{
						return;
					};
				};

				//opera.postError(shift);
				if(!shift){
					move_fn_x(cs,left+(e.clientX-cursorX));
					move_fn_y(cs,top+(e.clientY-cursorY));
				}else{
					if(shift=='y'){
						move_fn_y(cs,top+(e.clientY-cursorY));
					}else{
						move_fn_x(cs,left+(e.clientX-cursorX));
					};
				};

			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//ui复位函数 shift+b
		document.addEventListener('keydown',function(e){
			if(e.shiftKey && e.keyCode==66){
				var cs=container.style;
				cs.setProperty('top','20px','important');
				cs.setProperty('left','20px','important');
			};
		},false)


		//缩放功能代码...开始..
		function resize_fn_e(e,cursorX,ds,width,minWidth){
			var twidth=e.clientX-cursorX+width;
			if(twidth>=minWidth){
				ds.setProperty('width',twidth+'px','important');
			}else{
				ds.setProperty('width',minWidth+'px','important');
			};
		};
		function resize_fn_s(e,cursorY,ds,height,minHeight){
			var theight=e.clientY-cursorY+height;
			if(theight>=minHeight){
				ds.setProperty('height',theight+'px','important');
			}else{
				ds.setProperty('height',minHeight+'px','important');
			};
		};
		function resize_fn_w(e,cursorX,ds,width,minWidth,cs,left){
			var changeX=cursorX-e.clientX;
			var twidth=changeX+width;
			cs.setProperty('left',left-changeX+'px','important');
			if(twidth>=minWidth){
				ds.setProperty('width',twidth+'px','important');
				move_fn_x(cs,left-changeX);
			}else{
				ds.setProperty('width',minWidth+'px','important');
				move_fn_x(cs,left+(width-minWidth));
			};
		};
		function resize_fn_n(e,cursorY,ds,height,minHeight,cs,top){
			var changeY=cursorY-e.clientY;
			var theight=changeY+height;
			if(theight>=minHeight){
				ds.setProperty('height',theight+'px','important');
				move_fn_y(cs,top-changeY);
			}else{
				ds.setProperty('height',minHeight+'px','important');
				move_fn_y(cs,top+(height-minHeight));
			};
		};

		//east方向缩放.
		var resizable_e=getElementByCSS('#cb_resizable_e',container);
		resizable_e.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorX=e.clientX;
			var ds=dialog_content.style;
			var width=parseInt(ds.width,10);
			var minWidth=parseInt(ds.minWidth,10);
			function move(e){
				resize_fn_e(e,cursorX,ds,width,minWidth);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//south方向缩放.
		var resizable_s=getElementByCSS('#cb_resizable_s',container);
		resizable_s.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorY=e.clientY;
			var ds=dialog_content.style;
			var height=parseInt(ds.height,10);
			var minHeight=parseInt(ds.minHeight,10);
			function move(e){
				resize_fn_s(e,cursorY,ds,height,minHeight);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//north方向缩放
		var resizable_n=getElementByCSS('#cb_resizable_n',container);
		resizable_n.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorY=e.clientY;
			var ds=dialog_content.style;
			var height=parseInt(ds.height,10);
			var minHeight=parseInt(ds.minHeight,10);
			var cs=container.style;
			var top=parseInt(cs.top,10);
			function move(e){
				resize_fn_n(e,cursorY,ds,height,minHeight,cs,top);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//west方向缩放.
		var resizable_w=getElementByCSS('#cb_resizable_w',container);
		resizable_w.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorX=e.clientX;
			var ds=dialog_content.style;
			var width=parseInt(ds.width,10);
			var minWidth=parseInt(ds.minWidth,10);
			var cs=container.style;
			var left=parseInt(cs.left,10);
			function move(e){
				resize_fn_w(e,cursorX,ds,width,minWidth,cs,left);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//southeast方向缩放
		var resizable_se=getElementByCSS('#cb_resizable_se',container);
		resizable_se.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorX=e.clientX;
			var cursorY=e.clientY;
			var ds=dialog_content.style;
			var width=parseInt(ds.width,10);
			var height=parseInt(ds.height,10);
			var minWidth=parseInt(ds.minWidth,10);
			var minHeight=parseInt(ds.minHeight,10);
			function move(e){
				resize_fn_e(e,cursorX,ds,width,minWidth);
				resize_fn_s(e,cursorY,ds,height,minHeight);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//southwest方向缩放
		var resizable_sw=getElementByCSS('#cb_resizable_sw',container);
		resizable_sw.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorX=e.clientX;
			var cursorY=e.clientY;
			var ds=dialog_content.style;
			var width=parseInt(ds.width,10);
			var height=parseInt(ds.height,10);
			var minWidth=parseInt(ds.minWidth,10);
			var minHeight=parseInt(ds.minHeight,10);
			var cs=container.style;
			var left=parseInt(cs.left,10);
			function move(e){
				resize_fn_w(e,cursorX,ds,width,minWidth,cs,left);
				resize_fn_s(e,cursorY,ds,height,minHeight);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//northwest方向缩放
		var resizable_nw=getElementByCSS('#cb_resizable_nw',container);
		resizable_nw.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorX=e.clientX;
			var cursorY=e.clientY;
			var ds=dialog_content.style;
			var width=parseInt(ds.width,10);
			var height=parseInt(ds.height,10);
			var minWidth=parseInt(ds.minWidth,10);
			var minHeight=parseInt(ds.minHeight,10);
			var cs=container.style;
			var left=parseInt(cs.left,10);
			var top=parseInt(cs.top,10);
			function move(e){
				resize_fn_w(e,cursorX,ds,width,minWidth,cs,left);
				resize_fn_n(e,cursorY,ds,height,minHeight,cs,top);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);

		//northeast方向缩放
		var resizable_ne=getElementByCSS('#cb_resizable_ne',container);
		resizable_ne.addEventListener('mousedown',function(e){
			if(e.button!=0)return;
			e.preventDefault();
			var cursorX=e.clientX;
			var cursorY=e.clientY;
			var ds=dialog_content.style;
			var width=parseInt(ds.width,10);
			var height=parseInt(ds.height,10);
			var minWidth=parseInt(ds.minWidth,10);
			var minHeight=parseInt(ds.minHeight,10);
			var cs=container.style;
			var top=parseInt(cs.top,10);
			function move(e){
				resize_fn_e(e,cursorX,ds,width,minWidth);
				resize_fn_n(e,cursorY,ds,height,minHeight,cs,top);
			};
			document.addEventListener('mousemove',move,false);
			document.addEventListener('mouseup',function(e){
				removeListener([{type:'mousemove',fn:move,},{type:'mouseup',fn:arguments.callee,}]);
			},false);
		},false);
		//缩放功能代码...结束..


		//close 按钮,隐藏窗口
		var dialog_close=getElementByXpath('.//*[@id="cb_dialog_close"]',container);
		dialog_close.addEventListener('click',function(e){
			container.style.setProperty('display','none','important');
		},false);


		//new 按钮,新建规则.
		var dialog_new=getElementByXpath('.//*[@id="cb_dialog_new"]',container);
		dialog_new.addEventListener('click',function(e){
			var random=Math.random();
			new cssObject({//新建规则,滚动到最上面
				key:'usercss:'+random,
			}).init();
		},false);


		//获取一些元素
		var dialog_title_match_number=getElementByCSS('#cb_dialog_title_match_number',container);
		var dialog_title_enable_number=getElementByCSS('#cb_dialog_title_enable_number',container);
		var black_div=getElementByCSS('#cb_black_div',container);
		var dialog_alert=getElementByCSS('#cb_dialog_alert',container);
		var dialog_alert_title=getElementByCSS('#cb_dialog_alert_title',container);
		var dialog_alert_content=getElementByCSS('#cb_dialog_alert_content',container);
		var dialog_not_alert_box=getElementByCSS('#cb_dialog_not_alert_box',container);
		var dialog_not_alert_box_right=getElementByCSS('#cb_dialog_not_alert_box_right',container);
		var dialog_alert_button_y=getElementByCSS('#cb_dialog_alert_button_y',container);
		var dialog_alert_button_n=getElementByCSS('#cb_dialog_alert_button_n',container);


		//提示框,点击 是 或者 否,都要隐藏对话框.
		function black_div_hide(){
			black_div.style.setProperty('display','none','important');
		};
		function black_div_show(){
			black_div.style.setProperty('display','block','important');
		};

		function alertbox_hide(){
			dialog_alert.style.setProperty('display','none','important');
		};

		function yenohandler(){
			black_div_hide();
			alertbox_hide();
		};

		dialog_alert_button_y.addEventListener('click',yenohandler,false);
		dialog_alert_button_n.addEventListener('click',yenohandler,false);

		//textarea自适应高度对象;
		function AreaObject(ta){
			this.ta=ta;
		};

		AreaObject.prototype={
			init:function(){
				var self=this;
				var ta=self.ta;
				ta.addEventListener('blur',function(){
					self.textAreaBlur();
				},false);
				ta.addEventListener('focus',function(){
					self.textAreaFocus();
				},false);
				ta.addEventListener('keyup',function(){
					self.autoHeight();
				},false);
				ta.style.setProperty('height',this.defaultHeight+'px','important');
				if(this.tstyleText){
					ta.style.cssText+=this.tstyleText;
				};
			},
			autoHeight:function(){
				//alert(this.value);
				var ta=this.ta;
				if(!this.paddingTAB){
					var tacs=window.getComputedStyle(ta);
					this.paddingTAB=parseInt(tacs.paddingBottom,10)+parseInt(tacs.paddingTop,10);
					//alert(this.paddingTAB)
				};

				var scrollHeight=ta.scrollHeight,
					curHeight=ta.clientHeight-this.paddingTAB;
				//alert(curHeight);

				//alert(this.defaultHeight);
				//alert(scrollHeight==curHeight);
				if(scrollHeight>=curHeight){
					if(curHeight<prefs.maxHeight){
						if(scrollHeight>=prefs.maxHeight){
							ta.style.setProperty('overflow-y','auto','important')
						}else{
							ta.style.setProperty('overflow-y','hidden','important')
						};
						//opera.postError(scrollHeight);
						ta.style.setProperty('height',Math.min(scrollHeight,prefs.maxHeight)+'px','important');
					}else{
						ta.style.setProperty('overflow-y','auto','important')
					};
				}else{
					if(curHeight>this.defaultHeight){
						ta.style.setProperty('height',Math.max(this.defaultHeight,scrollHeight)+'px','important');
					};
				};
			},
			textAreaFocus:function(){
				//alert('focus');
				var self=this;
				self.autoHeight();
				self.fbInterval=window.setInterval(function(){
					self.autoHeight();
				},self.monitoringInterval);
			},
			textAreaBlur:function(){
				//alert('blur');
				window.clearInterval(this.fbInterval);
			},
			monitoringInterval:prefs.monitoringInterval,
			defaultHeight:prefs.taHeight,
			tstyleText:(function(){
				var tstyleText='';
				if(prefs.transition){
					var timingFn=(prefs.timingFn.indexOf(',')==-1)? prefs.timingFn : 'cubic-bezier('+prefs.timingFn+')';
					var duration=prefs.duration/1000+'s';
					tstyleText=';-o-transition:height '+duration+' '+timingFn+';';
					//alert(tstyleText);
				};
				return tstyleText;
			})(),
		};


		//规则 对象.每个规则一个对象,互不干扰
		function cssObject(ObjInfo){
			this.div=rule_container.cloneNode(true);
			if(ObjInfo.data){
				this.data=ObjInfo.data;
				this.key=ObjInfo.data.key;
				this.style=ObjInfo.data.style;
				this.disabled=ObjInfo.data.disabled;
				this.append=ObjInfo.data.append;
				this.decode=ObjInfo.data.decode;
				this.isRE=ObjInfo.data.isRE;
				if(!this.decode){
					ObjInfo.data.cssText=decodeURIComponent(ObjInfo.data.cssText);
					this.decode=true;
				};
				//删除一些临时属性.
				delete ObjInfo.data.append;
				delete ObjInfo.data.style;
				delete ObjInfo.data.decode;
				this.expand=this.existRED;
				dialog_content.appendChild(this.div);
			}else{
				//新建的规则,插入到最上层.
				var fe=dialog_content.firstChild;
				if(fe){
					dialog_content.insertBefore(this.div,fe);
				}else{
					dialog_content.appendChild(this.div);
				};
				this.data={};
				this.data.title=docTitle;
				this.key=this.data.key=ObjInfo.key;
				this.isRE=this.data.isRE=this.newRRegExpD;
				if(this.isRE){
					this.data.url=docRegExp;
				}else{
					this.data.urlstr=docString;
				};
				this.disabled=this.data.disabled=false;
				var curTime=String(new Date());
				this.data.createTime=curTime;
				this.data.lastMTime=curTime;
				this.data.cssText='';
				this.expand=this.newRED;
				this.style=style_rf.cloneNode(false);
				this.append=false;
				this.decode=true;
				this.newRule=true;
			};
		};

		cssObject.prototype={
			init:function(){
				var div=this.div;
				var getElementByXpath=this.getElementByXpath;
				var getElementByCSS=this.getElementByCSS;
				var self=this;

				//显示的标题
				var rule_title=getElementByCSS('.cb_rule_title',div);
				this.rule_title=rule_title;

				//显示 (匹配) 的地方
				var rule_title_matched=getElementByCSS('.cb_rule_title_matched',div);
				this.rule_title_matched=rule_title_matched;

				//显示 (禁用) 的地方
				var rule_title_disabled=getElementByCSS('.cb_rule_title_disabled',div);
				this.rule_title_disabled=rule_title_disabled;

				//输入 标题 的地方
				var rule_title_input=getElementByCSS('.cb_rule_title_input',div);
				this.rule_title_input=rule_title_input;
				rule_title_input.addEventListener('blur',function(){
					self.setTitle();
				},false);

				//输入 url 的地方
				var rule_url_input=getElementByCSS('.cb_rule_url_input',div);
				this.rule_url_input=rule_url_input;
				rule_url_input.addEventListener('blur',function(){
					self.checkMatched();
					self.setTitleMatched();
				},false);

				//是否是正则的那个复选框.
				var rule_url_isrg=getElementByCSS('.cb_rule_url_isrg',div);
				this.rule_url_isrg=rule_url_isrg;
				rule_url_isrg.addEventListener('change',function(){
					self.isRE=this.checked;
					self.checkMatched();
					self.setTitleMatched();
					//alert(self.isRE);
				},false);

				//textarea 编辑区
				var rule_editor=getElementByCSS('.cb_rule_editor',div);
				this.rule_editor=rule_editor;
				if(this.taAutoHeight){
					new AreaObject(rule_editor).init();
				};
				rule_editor.addEventListener('keypress',function(e){
					if(e.keyCode==9){//屏蔽tab键转移焦点
						e.preventDefault();
					};
				},false);

				//标题栏上面的 禁用 
				var rule_command_disable=getElementByCSS('.cb_rule_command_disable',div);
				this.rule_command_disable=rule_command_disable;
				rule_command_disable.addEventListener('click',function(){
					self.disabled=!self.disabled;
					self.setTitleDisabled();
					self.enable_disabled();
					if(this.newRule)return;//新建的规则在未保存之前,点击 禁用 启用第一次不保存.
					self.saveData('edsave');
				},false);


				//标题栏上面的 删除
				var rule_command_delete=getElementByCSS('.cb_rule_command_delete',div);
				this.rule_command_delete=rule_command_delete;
				rule_command_delete.addEventListener('click',function(){
					self.black_div_show();
					self.alertbox_show('确定要删除规则:"<b>'+self.getTitle()+'</b>"么?','confirm',[self.deleteData,self]);
				},false);

				//标题栏上面的 展开/收起
				var rule_command_expand=getElementByCSS('.cb_rule_command_expand',div);
				this.rule_command_expand=rule_command_expand;
				rule_command_expand.addEventListener('click',function(){
					self.expand=!self.expand;
					self.expand_collapse();
				},false);

				//编辑区下面的 预览 按钮
				var rule_preview=getElementByCSS('.cb_rule_preview',div);
				this.rule_preview=rule_preview;
				rule_preview.addEventListener('click',function(){
					self.preview();
				},false);

				//编辑区下面的 还原 按钮
				var rule_restore=getElementByCSS('.cb_rule_restore',div);
				this.rule_restore=rule_restore;
				rule_restore.addEventListener('click',function(){
					self.restore();
				},false);


				//编辑区下面的 查找 按钮
				var rule_find=getElementByCSS('.cb_rule_find',div);
				this.rule_find=rule_find;
				rule_find.addEventListener('click',function(){
					self.findE();
				},false);


				//编辑区下面的 还原 按钮
				var rule_cancle=getElementByCSS('.cb_rule_cancle',div);
				this.rule_cancle=rule_cancle;
				rule_cancle.addEventListener('click',function(){
					self.cancle();
				},false);


				//编辑区下面的 保存 按钮
				var rule_save=getElementByCSS('.cb_rule_save',div);
				this.rule_save=rule_save;
				rule_save.addEventListener('click',function(){
					self.saveData();
				},false);

				//整个 textarea编辑区和按钮命令的容器,通过使用 展开/启用命令显隐
				var rule_content=getElementByCSS('.cb_rule_content',div);
				this.rule_content=rule_content;

				if(this.newRule){
					dialog_content.scrollTop=0;//新建规则的时候,滚动到最上面
				};
				this.expand_collapse();
				//装载数据.
				this.loadData();

			},
			getRegExp:function(){
				var value=this.getUrl();
				var regExp;
				try{
					regExp=this.isRE? eval('('+value+')') : new RegExp('^'+this.ptRE(value)+'$');
					this.rule_url_input.style.setProperty('background-color','white','important');
					return regExp;
				}catch(e){
					this.rule_url_input.style.setProperty('background-color','#FA5555','important');
				};
			},
			tabKey:function(){
				
			},
			checkMatched:function(){
				var regExp=this.getRegExp();
				if(regExp && regExp.test(url_rf)){
					this.matched=true;
				}else{
					this.matched=false;
				};
			},
			enable_disabled:function(){
				this.preview();
			},
			setTitle:function(){
				this.rule_title.textContent=this.getTitle();
			},
			getTitle:function(){
				return this.trimSpace(this.rule_title_input.value);
			},
			getUrl:function(){
				return this.trimSpace(this.rule_url_input.value);
			},
			setTitleMatched:function(){
				this.rule_title_matched.textContent=this.matched? "(匹配)" : ''
			},
			setTitleDisabled:function(){
				if(this.disabled){
					this.rule_title_disabled.textContent='(禁用)';
					this.rule_command_disable.textContent='启用'
				}else{
					this.rule_title_disabled.textContent='';
					this.rule_command_disable.textContent='禁用'
				};
			},
			restore:function(){
				if(this.style)this.style.textContent='';
			},
			getCssText:function(){
				return this.rule_editor.value;
			},
			addToTA:function(data){
				if(!data)return;
				var otext=this.getCssText();
				var editor=this.rule_editor;
				if(otext){
					editor.value+='\n'+data;
				}else{
					editor.value=data;
				};
				setTimeout(function(){
					editor.focus();
					editor.scrollTop=9999;//滚动到最下方
				},1);
			},
			deleteData:function(){
				ss_rf.removeItem(this.key);
				this.div.parentNode.removeChild(this.div);
				if(this.append)this.style.parentNode.removeChild(this.style);
			},
			getStatus:function(){
				return this.disabled || false;
			},
			preview:function(){
				if(this.matched && !this.disabled){
					if(!this.style){
						this.style=style_rf.cloneNode(false);
					};
					if(!this.append){
						head_rf.appendChild(this.style);
						this.append=true;
					};
					this.style.textContent=this.getCssText();
				}else{
					this.restore();
				};
			},
			saveData:function(message){
				var regExp=this.getRegExp();
				if(!regExp){
					this.black_div_show();
					this.alertbox_show('url项有语法错误,无法保存','alert');
					return;
				};
				var data=this.data;
				var OcssText;
				this.data.lastMTime=String(new Date());
				if(message=='edsave'){
					data.disabled=this.getStatus();
					OcssText=data.cssText;
					data.cssText=encodeURIComponent(data.cssText);
				}else{
					data.title=this.getTitle();
					data.isRE=this.isRE;
					if(!this.isRE){
						data.urlstr=this.getUrl();
					}else{
						delete data.urlstr;
					};
					data.url=regExp;
					data.disabled=this.getStatus();
					OcssText=this.getCssText();
					data.cssText=encodeURIComponent(OcssText);
				};
				var string=this.toString(data);
				data.cssText=OcssText;
				//alert(string);
				this.newRule=false;
				ss_rf.setItem(this.key,string);
			},
			trimSpace:function(str){
				return str.replace(/(?:^\s*)|(?:\s*$)/g,'');
			},
			loadData:function(){
				var data=this.data;
				this.isRE=data.isRE;
				this.rule_title_input.value=data.title;
				this.rule_url_input.value=data.isRE? data.url : data.urlstr;
				this.rule_editor.value=data.cssText;
				this.checkMatched();
				this.setTitleMatched();
				this.setTitle();
				this.setTitleDisabled();
				this.rule_url_isrg.checked=data.isRE;
			},
			cancle:function(){
				this.loadData();
				this.preview();
			},
			expand_collapse:function(){
				if(this.expand){
					this.rule_content.style.setProperty('display','block','important');
					this.rule_command_expand.textContent='收起';
				}else{
					this.rule_content.style.setProperty('display','none','important');
					this.rule_command_expand.textContent='展开';
				};
			},
			findE:function(){
				var cs=container.style;
				finEING=true;//正在查找元素.
				cs.setProperty('display','none','important');
				var cTarget;
				var self=this;
				var outline,
					bgcolor,
					frameBorder;

				function mouseover(e){
					var ele=e.target;
					cTarget=ele;
					outline=ele.style.outline;
					bgColor=ele.style.backgroundColor;
					frameBorder=ele.frameBorder;
					if(frameBorder)ele.frameBorder=1;
					ele.style.outline='2px solid #F6AE37';
					//ele.style.backgroundColor='#C1C9FE';
				};


				function mouseout(){
					var ele=cTarget;
					if(ele){
						ele.style.outline=outline;
						//ele.style.backgroundColor=bgColor;
						if(frameBorder)ele.frameBorder=frameBorder;
					};
				};

				var eleArray=[];
				var tstyle=style_rf.cloneNode(false);
				head_rf.appendChild(tstyle);

				function ptCSS(){
					var text='';
					if(eleArray.length>0){
						text=eleArray.join(',\n')+'{\n  display:none!important;\n}';
					};
					return text;
				};

				function getNth(ele){
					var elep=ele.parentNode;
					var eleAL=elep.childElementCount;
					var childA=elep.childNodes;
					var child_x;
					var nth=1;
					var fnth;
					for(var i=0,ii=childA.length;i<ii;i++){
						child_x=childA[i];
						if(child_x.nodeType==1){
							if(ele==child_x){
								fnth=nth;
								break;
							};
							nth++;
						};
					};
					var ret;
					switch(fnth){
						case 1:{
							ret=':first-child';
						}break;
						case eleAL:{
							ret=':last-child';
						}break;
						default:{
							ret=':nth-child('+fnth+')';
						}break;
					};
					return ret;
				};

				function getAtt(ele){
					var r='';
					for(var i=0,a;a=ele.attributes[i];i++){
						var n=a.nodeName.toLowerCase();
						if(/^(class|href|src)$/.test(n))r+='['+n+'="'+a.nodeValue+'"]';
					};
					return r;
				};

				var kcinfo=this.kcinfo;
				function keyup(e){
					switch(e.keyCode){
						case kcinfo.save:{//x保存
							self.addToTA(ptCSS());
							self.preview();
							exit();
						}break;
						case kcinfo.del:{//d删除
							var ele=cTarget;
							var nodeName=ele.nodeName;
							//opera.postError(ele.nodeName);
							if(nodeName=='BODY' || nodeName=='HTML')return;
							mouseout();
							var tArray=[];
							cTarget=null;//防止一直按,生成多条一样的css;
							while(ele && ele.nodeType==1){
								nodeName=ele.nodeName.toLowerCase();
								if(ele.id){//id
									tArray.unshift(nodeName+'[id="'+ele.id+'"]');
									break;
								}else if(nodeName=='body' || nodeName=='html'){
									tArray.unshift(nodeName);
									break;
								}else{
									tArray.unshift(nodeName+getAtt(ele)+getNth(ele));
								};
								ele=ele.parentNode;
							};
							if(tArray.length==0)return;
							var css=tArray.join('>');

							eleArray.push(css);
							tstyle.textContent=ptCSS();
						}break;
						case kcinfo.undo:{//z撤销
							eleArray.pop();
							tstyle.textContent=ptCSS();
						}break;
						case kcinfo.quit:{//esc放弃
							exit();
						}break;
						case kcinfo.parentE:{//q 选择当前元素的父元素
							var ele=cTarget;
							if(ele){
								var elep=ele.parentNode;
								if(elep){
									mouseout();
									mouseover({target:elep});
								};
							};
						}break;
						case kcinfo.preSE:{// w选择当前元素的上一个兄弟元素
							var ele=cTarget;
							if(ele){
								var elene=ele.nextElementSibling;
								if(elene){
									mouseout();
									mouseover({target:elene});
								};
							};
						}break;
						case kcinfo.nextSE:{//e 选择当前元素的下一个兄弟元素
							var ele=cTarget;
							if(ele){
								var elepe=ele.previousElementSibling;
								if(elepe){
									mouseout();
									mouseover({target:elepe});
								};
							};
						}break;
						default:break;
					};
				};

				function click(e){
					e.preventDefault();
				};

				function exit(){
					cs.setProperty('display','block','important');
					finEING=false;
					head_rf.removeChild(tstyle);
					mouseout();
					document.removeEventListener('mouseover',mouseover,false);
					document.removeEventListener('keyup',keyup,false);
					document.removeEventListener('mouseout',mouseout,false);
					document.removeEventListener('click',click,false);
				};

				document.addEventListener('click',click,false);
				document.addEventListener('mouseover',mouseover,false);
				document.addEventListener('keyup',keyup,false);
				document.addEventListener('mouseout',mouseout,false);
			},
			dmessage:function(content){
				
			},
			toString:function(y){
				function toStr(x){
					//alert(typeof x);
					switch(typeof x){
						case 'undefined':{
							return Str(x);
						}break;
						case 'boolean':{
							return Str(x);
						}break;
						case 'number':{
							return Str(x);
						}break;
						case 'string':{
							return '"'+x.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
						}break;
						case 'function':{
							var fnstr=x.toString();
							if(fnstr.search(/\[native\s+code\]/i)==-1){
								return fnstr;
							}else{
								var fnName=fnstr.match(/function\s+(.+)\(/i);
								return  fnName? fnName[1] : Str(undefined);
							};
						}break;
						case 'object':{
							if(x===null){
								return Str(x);
							};
							//alert(x.constructor);
							switch(x.constructor){
								case Object:{
									var i,
												rStr='';
									for(i in x){
										//alert(i);
										if(!x.hasOwnProperty(i)){//去掉原型链上的属性.
											//alert(i);
											continue;
										};
										rStr+=toStr(i)+':'+toStr(x[i])+',';
									};
									return ('{'+rStr.replace(/,$/i,'')+'}');
								}break;
								case Array:{
									var i,
												rStr='';
									for(i in x){
										//alert(i);
										if(!x.hasOwnProperty(i)){//去掉原型链上的属性.
											//alert(i);
											continue;
										};
										rStr+=toStr(x[i])+',';
									};
									return '['+rStr.replace(/,$/i,'')+']';
								}break;
								case RegExp:{
									return Str(x);
								}break;
								case Function:{
									return x.toString();
								}break;
								case String:{
									return toStr(x.valueOf());
								}break;
								case Number:{
									return Str(x.valueOf());
								}break;
								case Boolean:{
									return Str(x.valueOf());
								}break;
								default:{
									//alert(x.constructor);//漏了什么类型么?
								}break;
							};
						}break;
						default:break;
					};
				};
				var Str=String;
				return toStr(y);
			},
			ptRE:function(str){
				str=str.replace(/\\/g, '\\\\')
							.replace(/\+/g, '\\+')
							.replace(/\./g, '\\.')
							.replace(/\?/g, '\\?')
							.replace(/\{/g, '\\{')
							.replace(/\}/g, '\\}')
							.replace(/\[/g, '\\[')
							.replace(/\]/g, '\\]')
							.replace(/\^/g, '\\^')
							.replace(/\$/g, '\\$')
							.replace(/\*/g, '.*')
							.replace(/\(/g, '\\(')
							.replace(/\)/g, '\\)')
							.replace(/\|/g, '\\|')
							.replace(/\//g, '\\/');
				return str;
			},
			alertbox_show:function(content,type,fnx){
				switch(type){
					case 'confirm':{
						this.dialog_alert_title.textContent="确认";
						this.dialog_not_alert_box.style.setProperty('display','none','important');
						this.dialog_alert_button_n.style.setProperty('display','inline','important');
						var self=this;

						function nohandler(){
							this.removeEventListener('click',arguments.callee,false);
							self.dialog_alert_button_y.removeEventListener('click',yeshandler,false);
						};
						function yeshandler(){
							this.removeEventListener('click',arguments.callee,false);
							self.dialog_alert_button_n.removeEventListener('click',nohandler,false);
							fnx[0].call(fnx[1]);
						};

						this.dialog_alert_button_n.addEventListener('click',nohandler,false);
						this.dialog_alert_button_y.addEventListener('click',yeshandler,false);

					}break;
					case 'alert':{
						this.dialog_alert_title.textContent="提醒";
						this.dialog_not_alert_box.style.setProperty('display','black','important');
						this.dialog_alert_button_n.style.setProperty('display','none','important');
					}break;
					default:{}break;
				};
				//alert(content)
				this.dialog_alert_content.innerHTML=content;//在document.body的外面,所以innerHTML无效;
				this.dialog_alert.style.setProperty('display','table','important');
			},
			getElementByXpath:getElementByXpath,
			getElementByCSS:getElementByCSS,
			dialog_title_enable_number:dialog_title_enable_number,
			dialog_title_match_number:dialog_title_match_number,
			black_div:black_div,
			dialog_alert:dialog_alert,
			dialog_alert_title:dialog_alert_title,
			black_div_show:black_div_show,
			dialog_alert_content:dialog_alert_content,
			dialog_not_alert_box:dialog_not_alert_box,
			dialog_alert_button_n:dialog_alert_button_n,
			dialog_alert_button_y:dialog_alert_button_y,
			//设置
			existRED:prefs.existRED,
			newRED:prefs.newRED,
			taAutoHeight:prefs.autoHeight,
			kcinfo:prefs.kcinfo,
			newRRegExpD:prefs.newRRegExpD,
		};


		function addToBox(array){
			var _cssObject=cssObject;
			for(var i=0,ii=array.length;i<ii;i++){
				new _cssObject({
					data:array[i],
				}).init();
			};
		};

		addToBox(matchedArray);
		addToBox(matchedArray_d);
		if(!prefs.notLoadNM){
			addToBox(dataArray);
		};
		//document.documentElement.appendChild(container);
		document.body.appendChild(container);
	};

	window.createCSSBoxUI=createCSSBoxUI;

})();