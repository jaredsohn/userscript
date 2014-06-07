// ==UserScript==
// @name tieba.baidu PLUS!
// @namespace http://userscripts.org/users/302257
// @version 1.0.3.5
// @description 此腳本將在百度貼吧中附加各種強化性功能
// @author SoIN
// @homepage      http://blog.windpr.tw/
// @icon          http://mozillalabs.com/wp-content/themes/labs_project/img/bespin-footer-s.png
// @create 2011-8-5
// @lastmodified 2012-03-06
// @include        http://tieba.baidu.com/f*?kw=*
// @include        http://tieba.baidu.com/f*?kz=*
// @include        http://tieba.baidu.com/f*?z=*
// @include        http://tieba.baidu.com/f*?ct=*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/bakan/view?kw=*
// @include        http://tieba.baidu.com/i/*/replyme*
// @include        http://tieba.baidu.com/i/*/atme*
// @include        http://tieba.baidu.com/i/*/storethread*
// @exclude	http://tieba.baidu.com/i/data/panel?un=*
// @update			http://userscripts.org/scripts/source/109146.user.js
// @run-at document-end
// ==/UserScript==


/*預備增加功能：*/
	//對連結進行加密與還原
	//與其他腳本及樣式完成相容性(藍白和校長)
	//相容於新版本的貼吧
	//與FireGestures的手勢相容
	//浮動提示是Griever的ChromeStatusbarModoki.uc.js 貌似不會自動到右(https://gist.github.com/300255)
	//測試更新機制是否正常



	var _L=0;
	if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {_L = (!!(navigator.language.indexOf('zh-TW') != -1))? 0:1;}
	var _ti = {
		text_AP: [
			[' (翻至第','頁)'],
			[' (翻至第','页)']
		],
		text_LPB: ['頁尾','页尾'],
		text_oPD: [
			['【墳帖警告】','注意！！這是超過','年','個月','又','天','的(大型)墳帖哦','的(小型)墳帖哦'],
			['【坟帖警告】','注意！！这是超过','年','个月','又','天','的(大型)坟帖哦','的(小型)坟帖哦']
		],
		text_uP: ['Unicode 發表','Unicode 发表'],
		text_iP: ['圖片發表','图片发表'],
		text_SettingMENU: [
			[
				['儲存','取消'],
				['浮動項目','浮動回覆框','浮動頁數表','左上','右上','右下','左下'],
				['美化項目','廣告刪除','介面美化'],
				['雜項','自動翻頁','圖片最大化','IP顯示','黑名單','Unicode發貼','圖片發貼','帖子快捷按鈕：','頁','取消在首頁中點擊帖子清單會開啟新分頁'],
				['墳帖偵測器','開啟','小型墳帖','大型墳帖','月'],
				['0=關閉; 1=開啟; 2=只在滑鼠連點時啟用'],
				['你所使用的瀏覽器不支持GreaseMonkey函數，無法進行自訂化功能選擇']
			],
			[
				['存档','取消'],
				['浮动项目','浮动回复框','浮动页数表','左上','右上','右下','左下'],
				['美化项目','广告删除','界面美化'],
				['杂项','自动翻页','图片最大化','IP显示','黑名单','Unicode发贴','图片发贴','帖子快捷按钮：','页','取消在首页中点击帖子列表会开启新标签'],
				['坟帖侦测器','开启','小型坟帖','大型坟帖','月'],
				['0=关闭; 1=开启; 2=只在鼠标双击时启用'],
				['你所使用的浏览器不支持GreaseMonkey函数，无法进行自订化功能选择']
			]
		]
	};


	if(!GM_getValue('cfg_SettingValue')){GM_setValue('cfg_SettingValue','99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99');}
	SettingValue=typeof GM_getValue!="undefined"?GM_getValue('cfg_SettingValue'):"99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99";
	var sV=SettingValue.split(",");
//開關-廣告刪除
	try{del_ad=sV[0]=='99'?'1':sV[0];}catch(e){del_ad=1;}
//開關-自動翻頁
	try{auto_pager=sV[1]=='99'?'1':sV[1];}catch(e){auto_pager=1;}
//開關-浮動回覆框
	try{reply_float=sV[2]=='99'?'1':sV[2];}catch(e){reply_float=1;}
	try{reply_d=sV[3]=='99'?'2':sV[3];}catch(e){reply_d=2;}
//開關-浮動頁數表
	try{pagelist_float=sV[4]=='99'?'1':sV[4];}catch(e){pagelist_float=1;}
	try{pagelist_d=sV[5]=='99'?'3':sV[5];}catch(e){pagelist_d=3;}
//開關-Unicode發貼
	try{unicode_post=sV[6]=='99'?'1':sV[6];}catch(e){unicode_post=1;}
//開關-圖片發貼
	try{img_post=sV[7]=='99'?'0':sV[7];}catch(e){img_post=0;}
//開關-介面美化
	try{style_modify=sV[8]=='99'?'1':sV[8];}catch(e){style_modify=1;}
//開關-取消在首頁中點帖子會開新分頁
	try{target_self=sV[9]=='99'?'1':sV[9];}catch(e){target_self=1;}
//開關-黑名單
	try{black_list=sV[10]=='99'?'2':sV[10];}catch(e){black_list=2;}
//開關-圖片最大化
	try{pic_max=sV[11]=='99'?'2':sV[11];}catch(e){pic_max=2;}
//開關-IP顯示
	try{ip_show=sV[12]=='99'?'2':sV[12];}catch(e){ip_show=2;}
//開關-列表末端加入頁數連結
	try{list_pbutton=sV[13]=='99'?'1':sV[13];}catch(e){list_pbutton=1;}
	try{list_pbutton_max=sV[14]=='99'?'9':sV[14];}catch(e){list_pbutton_max=9;}
//開關-墳帖偵測器
	try{old_pdetector=sV[15]=='99'?'1':sV[15];}catch(e){old_pdetector=1;}
	try{old_pdetector_time_s=sV[16]=='99'?'2':sV[16];}catch(e){old_pdetector_time_s=2;}
	try{old_pdetector_time_b=sV[17]=='99'?'12':sV[17];}catch(e){old_pdetector_time_b=12;}



var thisPage=0;
if(location.href.search(/tieba\.baidu\.com\/f.*?kw=(.*)/i)!=-1){
	var kw_name=RegExp.$1;
		kw_name=kw_name.split('#')[0];
		kw_name=kw_name.split('&')[0];
	thisPage=1;
}
if(location.href.search(/tieba\.baidu\.com\/p\/(\d+)/i)!=-1||
	location.href.search(/tieba\.baidu\.com\/f\?kz=(\d+)/i)!=-1||
	location.href.search(/tieba\.baidu\.com\/f\?ct=.*&z=(\d+)/i)!=-1){var post_id=RegExp.$1;thisPage=2;}
if(location.href.search(/tieba\.baidu\.com\/i\/(\d+)\/(.*)/i)!=-1){var outer_id=RegExp.$1;var warn_item=RegExp.$2;thisPage=3;}



var tbplus_main={
	onLoad1:function(){
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+='	#head img[alt$="到贴吧首页"]{';
			css+='		width:0px;height:38px;';
			css+='		padding-left:85px;';
			css+='	}';
			css+='	#header img[alt$="到贴吧首页"]{';
			css+='		width:0px;height:65px;';
			css+='		padding-left:137px;';
			css+='	}';
			css+='	#head img[alt$="到贴吧首页"],#header img[alt$="到贴吧首页"]{';
			css+='		background-image:';
			css+='			url(http://mozillalabs.com/wp-content/themes/labs2.0/img/designchallenge-footer-s.png),';
			css+='			url(http://hiphotos.baidu.com/soinlia/pic/item/d75bf364d01609241eb6bf55d40735fae7cd3411.jpg) !important;';
			css+='		background-repeat:no-repeat !important;';
			css+='		background-position:right -6px,center center !important;';
			css+='		background-size:auto 70%,auto 100% !important;';
			css+='	}';
		tbplus_lib.StyleLoad(css);

		if(thisPage){
			if(pagelist_float==1){tbplus_model.fun_floatPageList();}
			if(thisPage==1||thisPage==2){
				if(del_ad==1){tbplus_model.fun_DelAD();}
				if(img_post==1){tbplus_model.fun_imgPost();}
				if(unicode_post==1){tbplus_model.fun_unicodePost();}
				if(reply_float==1){
					tbplus_model.fun_MoveEditor();
					tbplus_model.fun_ReplySimplify();
				}
				if(style_modify==1){tbplus_model.fun_StyleModify();}
			}
			if(thisPage==1){
				tbplus_model.fun_Setting();
				if(target_self==1){tbplus_model.fun_TargetSelf();}
				if(black_list==1){tbplus_model.fun_Blacklist();}
				if(list_pbutton==1){tbplus_model.fun_ListPageButton();}
				var f1=tbplus_lib.find("//span[@class='cur']", tbplus_lib.XPFirst);if(f1){
					f1=f1.innerHTML;
				}
			}
			if(thisPage==2){
				if(pic_max==1){tbplus_model.fun_PicMAX();}
				if(ip_show==1){tbplus_model.fun_IPShow();}
				if(old_pdetector==1){tbplus_model.fun_oldPostDetector();}
				var f1=tbplus_lib.find("//span[@class='tP']", tbplus_lib.XPFirst);if(f1){
					f1=f1.innerHTML;
				}
			}
			if(thisPage==3){
				var f1=tbplus_lib.find("//a[@class='next']", tbplus_lib.XPFirst);if(f1){
					f1.href.search(/&pn=(\d+)$/i);
					f1=RegExp.$1-1;
				}
			}
			if(f1){if(auto_pager==1){tbplus_model.fun_AutoPager(parseInt(f1));}}
		}


		window.addEventListener("dblclick",function(e){
			tbplus_main.onDblClick(e);
		},false);
	},
	onDblClick:function(e){
		if(e.button==0){
			if(auto_pager==1){
				if(thisPage==2){
//					tbplus_lib.ScriptLoad(1,"js_foot_1","http://static.tieba.baidu.com/tb/static-pb/js/pb_logic.js");
					var src="";
						src+='$(document).ready(function(){';
						src+='	var o=new PostCollection();o.init();';
						src+='});';
					tbplus_lib.ScriptLoad(0,"js_foot_1",src);
				}
			}
			var c3=0.2;
			function fc3(){
				if(c3>0){
					if(reply_float==1){tbplus_model.fun_ReplySimplify();}
					c3=c3-.1;
					t3=setTimeout(fc3, 2000);
				}
				else{clearTimeout(t3);}
			}fc3();
	/*	}
		if(e.button!=0){*/
			if(reply_float==2){
				tbplus_model.fun_MoveEditor();
				tbplus_model.fun_ReplySimplify();
			}
			if(style_modify>=1){tbplus_model.fun_StyleModify();}
			if(img_post==2){tbplus_model.fun_imgPost();}
			if(unicode_post==2){tbplus_model.fun_unicodePost();}
			if(thisPage==1){
				if(target_self>=1){tbplus_model.fun_TargetSelf();}
				if(black_list>=1){tbplus_model.fun_Blacklist();}
				if(list_pbutton==1){tbplus_model.fun_ListPageButton();}
			}
			if(thisPage==2){
				if(pic_max>=1){tbplus_model.fun_PicMAX();}
				if(ip_show>=1){tbplus_model.fun_IPShow();}
			}
		}
	},
};


var tbplus_lib={
	XPFirst:XPathResult.FIRST_ORDERED_NODE_TYPE,
	XPList:XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	XPIter:XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
	find:function(xpath, xpres){
		var ret=document.evaluate(xpath, document, null, xpres, null);
		return xpres==tbplus_lib.XPFirst ? ret.singleNodeValue :ret;
	},
	insertAfter:function(newEl,targetEl){
		var parentEl=targetEl.parentNode;
		if(parentEl.lastChild==targetEl){parentEl.appendChild(newEl);}
		else{parentEl.insertBefore(newEl,targetEl.nextSibling);}
	},
	StyleLoad:function(css){
		if(typeof GM_addStyle!="undefined"){GM_addStyle(css);}
		else if(typeof addStyle!="undefined"){addStyle(css);}
		else{
			var heads=document.getElementsByTagName("head");
			if(heads.length>0){
				var node=document.createElement("style");
					node.type="text/css";
					node.charset="gb2312";
					node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node);
			}
		}
	},
	ScriptLoad:function(link,id,src){
		if(typeof GM_addScript!="undefined"){GM_addScript(src);}
		else if(typeof addScript!="undefined"){addScript(src);}
		else{
			var bodys=document.getElementsByTagName("body");
			if(bodys.length>0){
				var node=document.createElement("script");
					node.id=id;
					node.type="text/javascript";
					node.charset="gb2312";
					if(link==1){node.src=src;}
					if(link==0){node.innerHTML=src;}
				bodys[0].appendChild(node);
			}
		}
	},
};


var tbplus_model={
	fun_Setting:function(){
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+='	#SettingMENU{';
			css+='		position:fixed;top:100px;bottom:10px;left:0px;right:0px;';
			css+='		margin-left:auto;margin-right:auto;';
			css+='		width:400px;';
			css+='		z-index:9999;';
			css+='	}';
			css+='	#SettingMENU input{text-align:center;}';
	/*		css+='	#SettingMENUSwitch{';
			css+='		opacity:.05;';
			css+='		-moz-transition:opacity 1s ease-in-out;';
			css+='	}';
			css+='	#SettingMENUSwitch:hover{';
			css+='		opacity:1;';
			css+='	}';*/
		tbplus_lib.StyleLoad(css);

		var f1=tbplus_lib.find("//ul[@class='nav_right']", tbplus_lib.XPFirst);
		if(f1){
			var img_src='http://mozillalabs.com/wp-content/themes/labs_project/img/ubiquity-header.png';
			var node=document.createElement("div");
				node.id='SettingMENUSwitchDIV';
				node.setAttribute('style', 'margin:-36px 80px 36px -185px;width:105px;height:100px;background:url("'+img_src+'") no-repeat;background-size:100% 100%;');
				node.style.display='inline-table';
				node.innerHTML='<a id="SettingMENUSwitch" href="javascript:void(0);" style="width:105px;height:100px;"></a>';
			f1.insertBefore(node,f1.childNodes[0]);
		}

		var bodys=document.getElementsByTagName("body");
		if(bodys.length>0){
			var opd_Enable=old_pdetector=='1'?'checked':'';
			var div=document.createElement("div");
				div.id='SettingMENU';
				div.style.display='none';
				div.innerHTML='';
				div.innerHTML+=
					'<div style="text-align:left;margin-top:-64px;margin-left:12px;"><img src="http://mozillalabs.com/wp-content/themes/labs_project/img/skywriter-header.png" height="128"></div>'+
					'<div style="overflow:auto;color:#000;text-shadow:0 .5px .5px rgba(0,0,0,1);margin-top:-96px;padding:20px;border:solid 1px #999;border-radius:12px 8px 24px 4px;box-shadow:0px 3px 6px rgba(0,0,0,0.25);background:-moz-linear-gradient(top,rgba(255,255,255,1) 0%,rgba(230,230,230,1) 100%);">'+
						'<div style="text-align:right;">'+
							'<input id="oSAVE" type="button" style="width:100px;padding:4px;background:#C0C0C0;color:#000000;border:1px;cursor:pointer;border-radius:4px;box-shadow:3px 3px 5px #888888;margin-left:20px;margin-bottom:30px;" value="'+_ti.text_SettingMENU[_L][0][0]+'">'+
							'<input id="oCNCL" type="button" style="width:100px;padding:4px;background:#C0C0C0;color:#000000;border:1px;cursor:pointer;border-radius:4px;box-shadow:3px 3px 5px #888888;margin-left:20px;margin-bottom:30px;" value="'+_ti.text_SettingMENU[_L][0][1]+'">'+
						'</div>'+
						'<div style="text-align:left;border:solid 0px #6d6d6d;">'+
								'<blockquote><fieldset><legend>'+_ti.text_SettingMENU[_L][1][0]+'</legend>'+
									'<table border="0" cellpadding="2" cellspacing="1" width="100%">'+
										'<tr>'+
											'<td width="50%">　　<input id="cfg_reply_float" type="text" value='+reply_float+' style="width:18px;"> '+_ti.text_SettingMENU[_L][1][1]+'</td>'+
											'<td width="50%">　　<input id="cfg_pagelist_float" type="text" value='+pagelist_float+' style="width:18px;"> '+_ti.text_SettingMENU[_L][1][2]+'</td>'+
										'</tr>'+
										'<tr>'+
											'<td width="50%">　　'+
												'<select id="cfg_reply_d" value= style="width:18px;">'+
													'　　<option value="0">'+_ti.text_SettingMENU[_L][1][3]+'</option><option value="1">'+_ti.text_SettingMENU[_L][1][4]+'</option><option value="2">'+_ti.text_SettingMENU[_L][1][5]+'</option><option value="3">'+_ti.text_SettingMENU[_L][1][6]+'</option>'+
												'</select>'+
											'</td>'+
											'<td width="50%">　　'+
												'<select id="cfg_pagelist_d" value= style="width:18px;">'+
													'　　<option value="0">'+_ti.text_SettingMENU[_L][1][3]+'</option><option value="1">'+_ti.text_SettingMENU[_L][1][4]+'</option><option value="2">'+_ti.text_SettingMENU[_L][1][5]+'</option><option value="3">'+_ti.text_SettingMENU[_L][1][6]+'</option>'+
												'</select>'+
											'</td>'+
										'</tr>'+
									'</table>'+
								'</fieldset></blockquote>'+

								'<blockquote><fieldset><legend>'+_ti.text_SettingMENU[_L][2][0]+'</legend>'+
									'<table border="0" cellpadding="2" cellspacing="1" width="100%">'+
										'<tr>'+
											'<td width="50%">　　<input id="cfg_del_ad" type="text" value='+del_ad+' style="width:18px;"> '+_ti.text_SettingMENU[_L][2][1]+'</td>'+
											'<td width="50%">　　<input id="cfg_style_modify" type="text" value='+style_modify+' style="width:18px;"> '+_ti.text_SettingMENU[_L][2][2]+'</td>'+
										'</tr>'+
									'</table>'+
								'</fieldset></blockquote>'+

								'<blockquote><fieldset><legend>'+_ti.text_SettingMENU[_L][3][0]+'</legend>'+
									'<table border="0" cellpadding="2" cellspacing="1" width="100%">'+
										'<tr>'+
											'<td width="50%">　　<input id="cfg_auto_pager" type="text" value='+auto_pager+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][1]+'</td>'+
											'<td width="50%">　　<input id="cfg_pic_max" type="text" value='+pic_max+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][2]+'</td>'+
										'</tr>'+
										'<tr>'+
											'<td width="50%">　　<input id="cfg_ip_show" type="text" value='+ip_show+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][3]+'</td>'+
											'<td width="50%">　　<input id="cfg_black_list" type="text" value='+black_list+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][4]+'</td>'+
										'</tr>'+
										'<tr>'+
											'<td width="50%">　　<input id="cfg_unicode_post" type="text" value='+unicode_post+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][5]+'</td>'+
											'<td width="50%">　　<input id="cfg_img_post" type="text" value='+img_post+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][6]+'</td>'+
										'</tr>'+
										'<tr>'+
											'<td colspan="2" width="100%">　　<input id="cfg_list_pbutton" type="text" value='+list_pbutton+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][7]+'<input id="cfg_list_pbutton_max" type="text" value='+list_pbutton_max+' style="width:24px;"> '+_ti.text_SettingMENU[_L][3][8]+'</td>'+
										'</tr>'+
										'<tr>'+
											'<td colspan="2" width="100%">　　<input id="cfg_target_self" type="text" value='+target_self+' style="width:18px;"> '+_ti.text_SettingMENU[_L][3][9]+'</td>'+
										'</tr>'+
									'</table>'+
								'</fieldset></blockquote>'+

								'<blockquote><fieldset><legend>'+_ti.text_SettingMENU[_L][4][0]+'</legend>'+
									'<label for="cfg_oldPD"><input id="cfg_oldPD" type="checkbox" '+opd_Enable+' value='+old_pdetector+' style="vertical-align:middle;">'+_ti.text_SettingMENU[_L][4][1]+'</label><br>'+
									'　　 '+_ti.text_SettingMENU[_L][4][2]+'<input id="cfg_oldPD_time_s" type="text" value='+old_pdetector_time_s+' style="width:24px;"> '+_ti.text_SettingMENU[_L][4][4]+'<br>'+
									'　　 '+_ti.text_SettingMENU[_L][4][3]+'<input id="cfg_oldPD_time_b" type="text" value='+old_pdetector_time_b+' style="width:24px;"> '+_ti.text_SettingMENU[_L][4][4]+'<br>'+
								'</fieldset></blockquote>'+
						'</div>'+
						'<div style="text-align:right;">'+
							'　'+_ti.text_SettingMENU[_L][5][0]+
						'</div>'+
					'</div>'+
					'';
			bodys[0].appendChild(div);
			for(var i=0;i<4;i++){
				if(reply_d==i){document.getElementById("cfg_reply_d").options[i].selected=true;}
			}
			for(var i=1;i<=4;i++){
				if(pagelist_d==i){document.getElementById("cfg_pagelist_d").options[i].selected=true;}
			}

		}
		document.getElementById("oSAVE").addEventListener("click", function(){
			var cfg_del_ad=document.getElementById('cfg_del_ad').value;if(cfg_del_ad=='1'){cfg_del_ad='99';}//開關-廣告刪除
			var cfg_auto_pager=document.getElementById('cfg_auto_pager').value;if(cfg_auto_pager=='1'){cfg_auto_pager='99';}//開關-自動翻頁
			var cfg_reply_float=document.getElementById('cfg_reply_float').value;if(cfg_reply_float=='1'){cfg_reply_float='99';}//開關-浮動回覆框
			var cfg_reply_d=document.getElementById('cfg_reply_d').options[document.getElementById('cfg_reply_d').selectedIndex].value;if(cfg_reply_d=='2'){cfg_reply_d='99';}//開關-浮動回覆框
			var cfg_pagelist_float=document.getElementById('cfg_pagelist_float').value;if(cfg_pagelist_float=='1'){cfg_pagelist_float='99';}//開關-浮動頁數表
			var cfg_pagelist_d=document.getElementById('cfg_pagelist_d').options[document.getElementById('cfg_pagelist_d').selectedIndex].value;if(cfg_pagelist_d=='3'){cfg_pagelist_d='99';}//開關-浮動頁數表
			var cfg_unicode_post=document.getElementById('cfg_unicode_post').value;if(cfg_unicode_post=='1'){cfg_unicode_post='99';}//開關-Unicode發貼
			var cfg_img_post=document.getElementById('cfg_img_post').value;if(cfg_img_post=='0'){cfg_img_post='99';}//開關-圖片發貼
			var cfg_style_modify=document.getElementById('cfg_style_modify').value;if(cfg_style_modify=='1'){cfg_style_modify='99';}//開關-介面美化
			var cfg_target_self=document.getElementById('cfg_target_self').value;if(cfg_target_self=='1'){cfg_target_self='99';}//開關-取消在首頁中點帖子會開新分頁
			var cfg_black_list=document.getElementById('cfg_black_list').value;if(cfg_black_list=='2'){cfg_black_list='99';}//開關-黑名單
			var cfg_pic_max=document.getElementById('cfg_pic_max').value;if(cfg_pic_max=='2'){cfg_pic_max='99';}//開關-圖片最大化
			var cfg_ip_show=document.getElementById('cfg_ip_show').value;if(cfg_ip_show=='2'){cfg_ip_show='99';}//開關-IP顯示
			var cfg_list_pbutton=document.getElementById('cfg_list_pbutton').value;if(cfg_list_pbutton=='1'){cfg_list_pbutton='99';}//開關-列表末端加入頁數連結
			var cfg_list_pbutton_max=document.getElementById('cfg_list_pbutton_max').value;if(cfg_list_pbutton_max=='9'){cfg_list_pbutton_max='99';}//開關-列表末端加入頁數連結
			var cfg_oldPD=document.getElementById('cfg_oldPD').checked?'1':'0';if(cfg_oldPD=='1'){cfg_oldPD='99';}//開關-墳帖偵測器
			var cfg_oldPD_time_s=document.getElementById('cfg_oldPD_time_s').value;if(cfg_oldPD_time_s=='2'){cfg_oldPD_time_s='99';}//小型墳帖時間
			var cfg_oldPD_time_b=document.getElementById('cfg_oldPD_time_b').value;if(cfg_oldPD_time_b=='12'){cfg_oldPD_time_b='99';}//大型墳帖時間


			GM_setValue('cfg_SettingValue',cfg_del_ad+','+cfg_auto_pager+','+cfg_reply_float+','+cfg_reply_d+','+cfg_pagelist_float+','+cfg_pagelist_d+','+cfg_unicode_post+','+cfg_img_post+','+cfg_style_modify+','+cfg_target_self+','+cfg_black_list+','+cfg_pic_max+','+cfg_ip_show+','+cfg_list_pbutton+','+cfg_list_pbutton_max+','+cfg_oldPD+','+cfg_oldPD_time_s+','+cfg_oldPD_time_b);


			document.getElementById("SettingMENU").style.display="none";
			location.reload();
		}, false);
		document.getElementById("oCNCL").addEventListener("click", function(){document.getElementById("SettingMENU").style.display="none";}, false);
		document.getElementById("SettingMENUSwitch").addEventListener("click", function(){
			if(typeof GM_setValue!="undefined"){
				document.getElementById("SettingMENU").style.display="block";
			}
			else{alert(_ti.text_SettingMENU[_L][6][0]);}
		}, false);
	},
	fun_MoveEditor:function(){
		var f1=tbplus_lib.find("//div[@id='editor']//form[contains(@id,'pt')]", tbplus_lib.XPFirst);
		if(f1){
			if(reply_d==0){rd1='top:0px;left:0px;';rd2='border-bottom-right-radius:12px;';}
			if(reply_d==1){rd1='top:24px;right:0px;';rd2='border-bottom-left-radius:12px;';}
			if(reply_d==2){rd1='bottom:0px;right:0px;';rd2='border-top-left-radius:12px;';}
			if(reply_d==3){rd1='bottom:0px;left:0px;';rd2='border-top-right-radius:12px;';}

			var css="@namespace url(http://www.w3.org/1999/xhtml);";
				css+='.tb-editor-wrapper{background-color:#fff;}';
				css+='#editor form[id*="pt"]{';
				css+='		position:fixed;'+rd1;
				css+='}';
				css+='#editor form[id*="pt"]:hover,#editor form[id*="pt"]:focus{';
				css+='		min-height:0px !important;';
				css+='}';
			tbplus_lib.StyleLoad(css);

			f1.setAttribute('style', "border:1px solid #000;background:#eee;"+rd2);

			tbplus_lib.find("//div[@id='edit_parent']", tbplus_lib.XPFirst).style.display="none";
			var mark='';
				mark+='<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" onMouseOver="document.getElementById(\'edit_parent\').style.display=\'table-cell\';document.getElementById(\'menuSwitch\').innerHTML=\'>>\';">';
				mark+='	<tr><td align="center" height="24"><span onClick="document.getElementById(\'editor\').style.display=\'none\';" style="cursor:default;">✕</span></td></tr>';
				mark+='	<tr><td align="center" id="menuSwitch" onClick="if(document.getElementById(\'edit_parent\').style.display!=\'none\'){document.getElementById(\'edit_parent\').style.display=\'none\';document.getElementById(\'menuSwitch\').innerHTML=\'<br><br><br><<<br><br><br>\';}else{document.getElementById(\'edit_parent\').style.display=\'table-cell\';document.getElementById(\'menuSwitch\').innerHTML=\'>>\';}" style="width:18px;cursor:default;"><br><br><br><<<br><br><br></td></tr>';
				mark+='</table>';
			var node=document.createElement("div");
				node.style.display="table-cell";
				node.style.width="18px";
				node.style.height="100%";
				node.innerHTML=mark;
			
			if(reply_d==0||reply_d==3){f1.insertBefore(node,null);}
			if(reply_d==1||reply_d==2){f1.insertBefore(node,f1.childNodes[0]);}


			var f1=tbplus_lib.find("//div[@id='editor']//form[contains(@id,'pt')]", tbplus_lib.XPFirst);
			if(f1){
				tbplus_lib.find("//div[contains(@class,'tb-editor-overlay')]", tbplus_lib.XPFirst).style.marginLeft="0px";
				tbplus_lib.find("//div[contains(@class,'tb-editor-overlay')]//span[contains(@class,'arrow')]", tbplus_lib.XPFirst).style.marginLeft="0px";
				var f2=tbplus_lib.find("//input[contains(@id,'title1')]", tbplus_lib.XPFirst);
				var tbe_open=[0,0,0,0,0];
		/*		var faE=tbplus_lib.find("//span[@class='image' or @class='flash'", tbplus_lib.XPFirst);if(faE){
					faE.addEventListener("click", function(){}, false);
				}*/
				var faE=tbplus_lib.find("//span[@class='music']", tbplus_lib.XPFirst);if(faE){
					faE.addEventListener("click", function(){
						if(tbe_open[2]==0){f1.style.margin="0px 0px 50px 0px";if(!f2){f1.style.paddingBottom="5px";}tbe_open=[0,0,1,0,0];}
						else{f1.style.margin="0px 0px 0px 0px";if(!f2){f1.style.paddingBottom="0px";}tbe_open[2]=0;}
					}, false);
				}
				var faE=tbplus_lib.find("//span[@class='smiley']", tbplus_lib.XPFirst);if(faE){
					faE.addEventListener("click", function(){
						if(tbe_open[3]==0){f1.style.margin="0px 0px 95px 0px";if(!f2){f1.style.paddingBottom="5px";}tbe_open=[0,0,0,1,0];}
						else{f1.style.margin="0px 0px 0px 0px";if(!f2){f1.style.paddingBottom="0px";}tbe_open[3]=0;}
					}, false);
				}
				var faE=tbplus_lib.find("//span[@class='picasso']", tbplus_lib.XPFirst);if(faE){
					faE.addEventListener("click", function(){
						if(tbe_open[4]==0){f1.style.margin="0px 24px 110px 0px";if(!f2){f1.style.paddingBottom="5px";}tbe_open=[0,0,0,0,1];}
						else{f1.style.margin="0px 0px 0px 0px";if(!f2){f1.style.paddingBottom="0px";}tbe_open[4]=0;}
					}, false);
				}

				var faE=tbplus_lib.find("//span[@class='close']", tbplus_lib.XPFirst);if(faE){
					faE.addEventListener("click", function(){
						f1.style.margin="0px 0px 0px 0px";if(!f2){f1.style.paddingBottom="0px";}tbe_open=[0,0,0,0,0];
					}, false);
				}
			}


		}
	},
	fun_AutoPager:function(startpage){//自動翻頁
		var PageTitle=document.title.split('_')[0];
		var total_thread_num=tbplus_lib.find("//div[@id='thread_list_footer' or @class='th_footer']//span", tbplus_lib.XPFirst);
		var total_post_num=tbplus_lib.find("//span[@class='post_num' or @class='d_red_num']", tbplus_lib.XPFirst);
		var total_warn_num=tbplus_lib.find("//div[@id='footer']//span", tbplus_lib.XPFirst);
		if(total_thread_num||total_post_num||total_warn_num){
			var total_page_num=99;
			if(thisPage==1){total_page_num=total_thread_num.innerHTML/50;}
			if(thisPage==2){total_page_num=total_post_num.innerHTML/30;}
			var nowpage=startpage;
			window.addEventListener("scroll",function (){
				if(thisPage==3&&total_page_num==99){
					if(tbplus_lib.find("//div[@class='pager pager-center']//a[contains(text(),'下一页') or contains(text(),'下一頁')]", tbplus_lib.XPList).snapshotLength==0){
						tbplus_lib.find("//div[@class='pager pager-center']//a[contains(text(),'上一页')]", tbplus_lib.XPFirst).href.search(/&pn=(\d+)$/i);
						total_page_num=parseInt(RegExp.$1)+1;
					}
				}
				totalHeight=document.documentElement.scrollHeight;
				nowHeight=document.documentElement.scrollTop+window.screen.height;
				SubtractHeight=window.screen.availHeight/2;
				if(totalHeight-SubtractHeight<=nowHeight){
					if(thisPage==1){var pagelist=tbplus_lib.find("//div[@id='thread_list']", tbplus_lib.XPList).snapshotLength;}
					if(thisPage==2){var pagelist=tbplus_lib.find("//div[@class='p_postlist']", tbplus_lib.XPList).snapshotLength;}
					if(thisPage==3){var pagelist=tbplus_lib.find("//div[@class='main_wraper']", tbplus_lib.XPList).snapshotLength;}
					if(Math.floor(nowpage)==Math.floor(startpage)+(pagelist-1)){

						function fc(){
							if(total_page_num>nowpage){
								if(thisPage==1){
									linkURL="http://"+location.host+"/f?kw="+kw_name+"&pn="+((nowpage)*50);
								}
								if(thisPage==2){
									linkURL="http://"+location.host+"/p/"+post_id+"?pn="+(nowpage+1);
									if(location.href.search(/see_lz=1/i)!=-1){linkURL+='&see_lz=1';}
								}
								if(thisPage==3){
									linkURL="http://"+location.host+"/i/"+outer_id+"/"+warn_item+"?&pn="+(nowpage+1);
								}
								GM_xmlhttpRequest({
									method:'GET',
									url:linkURL,
									headers:{'User-agent':'Mozilla/4.0 (compatible) Greasemonkey','Accept':'application/atom+xml,application/xml,text/xml',},
									onload:function(responseDetails){
										if(responseDetails.readyState==4){
											if(responseDetails.status==200){
												var rText=responseDetails.responseText;
												if(thisPage==1){
													rText='<table cellspacing="0" width="100%" class="thread_list_table" id="thread_list_table"'+rText.split('id="thread_list_table"')[1];
													rText=rText.split(/<div class=\"th_footer/i)[0];
													rText=rText.split(/<\/table>/i)[0];
												}
												if(thisPage==2){
													rText='<div class="p_postlist"'+rText.split('class="p_postlist"')[1];
//													rText=rText.split(/<div.*p_ding_last/i)[0]+'<div class="l_thread"><div class="l_thread_info"></div></div>';
												}
												if(thisPage==3){
													rText='<div class="main_wraper"'+rText.split('class="main_wraper"')[1];
													rText=rText.split('<div class="pager pager-center"')[0];
												}
												if(thisPage==1||thisPage==3){
													var rText2=responseDetails.responseText
														rText2='<div class="pager pager-center"'+rText2.split('class="pager pager-center"')[1];
														rText2=rText2.replace("<div class=\"pager pager-center\">", '');
														rText2=rText2.split(/<\/div>/i)[0];
													tbplus_lib.find("//div[@class='pager pager-center']", tbplus_lib.XPFirst).innerHTML=rText2;
												}

												if(thisPage==1){var f2=tbplus_lib.find("//div[@id='thread_list']", tbplus_lib.XPFirst);}
												if(thisPage==2){var f2=tbplus_lib.find("//div[@id='pb_content' or @class='p_postlist']", tbplus_lib.XPFirst);}
												if(thisPage==3){var f2=tbplus_lib.find("//div[@class='main_wraper']", tbplus_lib.XPFirst);}
												if(f2){
													var div=document.createElement("DIV");
														div.innerHTML=rText;
													if(thisPage==1){
														div.setAttribute('id', "thread_list");
														div.setAttribute('class', "thread_list");
														f2.parentNode.appendChild(div);
													}
													if(thisPage==2){
														div.setAttribute('class', "l_core");
														f2.parentNode.parentNode.appendChild(div);
													}
													if(thisPage==3){
														div.setAttribute('id', "content");
														f2.parentNode.parentNode.appendChild(div);
													}
												}
											}
										}
									}
								});
								nowpage=nowpage + 1;
								document.title=PageTitle+_ti.text_AP[_L][0]+nowpage+_ti.text_AP[_L][1];
								fun_loadPageMod();
							}
							function fun_loadPageMod(){
								var c4=0.1;var c3=0.1;
								function fc3(){
									if(c3>0){
										c3=c3-.1;
										t3=setTimeout(fc3, 2500);
									}
									else{
										var refloat1=0;
										var refloat2=0;
										function del_repA(refloat,xpath){
											var f1=tbplus_lib.find(xpath, tbplus_lib.XPList);
											if(f1.snapshotLength>1){for(var i=0;i<f1.snapshotLength-1;i++){
												f1.snapshotItem(i).parentNode.removeChild(f1.snapshotItem(i));
												if(refloat==1){refloat1=1;}
												if(refloat==2){refloat2=1;}
											}}
										}
										if(style_modify==1){tbplus_model.fun_StyleModify();}
										if(thisPage==1){
											if(target_self==1){tbplus_model.fun_TargetSelf();}
											if(black_list==1){tbplus_model.fun_Blacklist();}
											if(list_pbutton==1){tbplus_model.fun_ListPageButton();}
										}
										if(thisPage==2){
											if(reply_float==1){tbplus_model.fun_ReplySimplify();}
											if(pic_max==1){tbplus_model.fun_PicMAX();}
											if(ip_show==1){tbplus_model.fun_IPShow();}
											del_repA(2,"//ul[@class='l_posts_num']");
											del_repA(0,"//div[@class='p_sharebar']");
										}
										del_repA(1,"//div[@id='editor']");
										if(pagelist_float==1){tbplus_model.fun_floatPageList();}

										clearTimeout(t3);
									}
								}fc3();
								if(thisPage==2){
									function fc4(){
										if(c4>0){
											c4=c4-.1;
											t4=setTimeout(fc4, 2000);
										}
										else{
//											tbplus_lib.ScriptLoad(1,"js_foot_1","http://static.tieba.baidu.com/tb/static-pb/js/pb_logic.js");
											var src="";
												src+=''+
													'$(document).ready(function(){'+
														'var o=new PostCollection();o.init();'+
													'});';
												src+='var m_thread=new Thread();m_thread.init();';
												src+='var m_posts=new MpostCollection();m_posts.init();';
											tbplus_lib.ScriptLoad(0,"js_foot_1",src);

											clearTimeout(t4);
										}
									}fc4();
								}
							}
						}fc();

					}
				}
			},false);
		}
	},
	fun_TargetSelf:function(){//取消連結在新分頁開啟
		var f1=tbplus_lib.find("//td[@class='thread_title']//a", tbplus_lib.XPList);
		for(var i=0;i<f1.snapshotLength;i++){f1.snapshotItem(i).target="_self";}
	},
	fun_Blacklist:function(){
		var f1=tbplus_lib.find("//table[@id='thread_list_table']//tbody//tr", tbplus_lib.XPList);
		if(f1){for(var i=0;i<f1.snapshotLength;i++){var del=0;
			if(f1.snapshotItem(i).innerHTML.search(/---</i)!=-1){del=1;}
			if(f1.snapshotItem(i).innerHTML.search(/----</i)!=-1){del=1;}
			if(f1.snapshotItem(i).innerHTML.search(/>huhuo\d+</i)!=-1){del=1;}
			if(f1.snapshotItem(i).innerHTML.search(/>huohu\d+</i)!=-1){del=1;}
			if(f1.snapshotItem(i).innerHTML.search(/>yuan9l8l</i)!=-1){del=1;}
			if(del==1){f1.snapshotItem(i).parentNode.removeChild(f1.snapshotItem(i));}
		}}
	},
	fun_StyleModify:function(){//介面微調
		if(thisPage==1){
			var f1=tbplus_lib.find("//div[@class='thread_list']//table//tbody//tr//td[@class='thread_title']//a", tbplus_lib.XPList);
			if(f1){for(var i=0;i<f1.snapshotLength;i++){
				if(f1.snapshotItem(i).parentNode.innerHTML.search(/\[\<span.*span\>\]/i)!=-1){
					f1.snapshotItem(i).parentNode.appendChild(f1.snapshotItem(i));
				}
			}}
			var f1=tbplus_lib.find("//div[@class='thread_list']//table//tbody//tr//td[@class='thread_title']//img[contains(@src,'icon_ding.gif')]", tbplus_lib.XPList);
			if(f1){for(var i=0;i<f1.snapshotLength;i++){
				var f1s=f1.snapshotItem(i);
					f1s.parentNode.insertBefore(f1s,f1s.parentNode.childNodes[0]);
			}}
	/*		var f1=tbplus_lib.find("//td[@class='thread_title']//a", tbplus_lib.XPList);
			if(f1){for(var i=0;i<f1.snapshotLength;i++){
				f1.snapshotItem(i).style.fontSize="110%";
			}}*/
		}
		if(thisPage==2){
			var css="@namespace url(http://www.w3.org/1999/xhtml);"+
					"div[class='thread'],div[class='p_thread'],"+
					"div[class='thread'],div[class='l_thread'],"+
					"div[class='post'],div[class='p_postlist']{"+
					"	width:95%;"+
					"}"+
					"div[class*='post_split'],div[class*='d_split_line']{"+
					"	width:100%;"+
					"}";
			tbplus_lib.StyleLoad(css);
		}
	},
	fun_ListPageButton:function(){//列表末端加入頁數連結
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+='	.qpage{';
			css+='		font-size:100%;font-weight:bold;';
			css+='		color:#f00;';
			css+='		text-shadow:0 .5px .5px rgba(0,0,0,.7);';
			css+='		margin:0px 1px 0px 0px;padding:0px 3px 0px;';
//			css+='		border:1px solid #000;';
//			css+='		background:#fff;';
			css+='		cursor:pointer;';
			css+='	}';
			css+='	.qpage:hover{';
			css+='		color:#00f;';
//			css+='		border:1px solid #261CDC;';
//			css+='		background:#261CDC;';
			css+='		-moz-transition:color .5s ease-in-out,border .25s ease-in-out;';
			css+='	}';
		tbplus_lib.StyleLoad(css);

		var f1=document.querySelectorAll(".thread_list_table>tbody>tr>td:nth-of-type(2)");
		var f2=tbplus_lib.find("//td[@class='thread_title']", tbplus_lib.XPList);
		var f3=tbplus_lib.find("//td[@class='thread_title']//a", tbplus_lib.XPList);
		if(f1.length==f2.snapshotLength){
			for(var i=0;i<f1.length;i++){
				if(!tbplus_lib.find("//span[@id='btn_qpage"+i+"']", tbplus_lib.XPFirst)){
					var postpage=f1[i].innerHTML/30;
						postpage=Math.ceil(postpage);
					if(postpage>1){
						var total_qbtn=list_pbutton_max;
						var table=document.createElement('TABLE');
							table.setAttribute('border', '0');
							table.setAttribute('cellpadding', '0');
							table.setAttribute('cellspacing', '0');
							table.setAttribute('style', 'display:inline-table;');
						var tr=document.createElement('TR');
						var td=document.createElement('TD');
							td.setAttribute('valign', 'bottom');
							td.setAttribute('style', 'display:inline;line-height:16px;border-width:0px !important;');
						var obj1=document.createElement('span');
//							obj1.setAttribute('style', 'float:right;');
						var j=2,qb1="";
						while(j<=postpage && j<=total_qbtn){
							qb1='<span id="btn_qpage'+i+'" class="qpage" onclick="window.location.href=\''+f3.snapshotItem(i).href+'?pn='+j+'\';window.status=\''+f3.snapshotItem(i).href+'?pn='+j+'\';">'+j+'</span>';
							td.innerHTML+=qb1;
							j++;
						}
						qb1='<span id="btn_qpage'+postpage+'" class="qpage" onclick="window.location.href=\''+f3.snapshotItem(i).href+'?pn='+postpage+'\';window.status=\''+f3.snapshotItem(i).href+'?pn='+postpage+'\';">';
						if(postpage==total_qbtn+1){
							td.innerHTML=td.innerHTML+qb1+postpage+'</span>';
						}
						else if(postpage>total_qbtn){
							td.innerHTML+='......';
							td.innerHTML=td.innerHTML+qb1+_ti.text_LPB[_L]+'</span>';
						}
						tr.appendChild(td);
						table.appendChild(tr);
						obj1.appendChild(table);
						f2.snapshotItem(i).appendChild(obj1);
					}
				}
			}
		}
		var f4=tbplus_lib.find("//span[contains(@id,'btn_qpage')]", tbplus_lib.XPList);
		if(f4){for(var i=0;i<f4.snapshotLength;i++){
			f4.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(f4.snapshotItem(i).parentNode.parentNode.parentNode.parentNode);
		}}
	},
	fun_ReplySimplify:function(){//回覆框簡化
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+="#Mark1		{opacity:.8;-moz-transition:opacity .75s ease-in-out;}";
			css+="#Mark1:hover	{opacity:1;}";
		tbplus_lib.StyleLoad(css);

		if(thisPage==2){
			var del_rA=tbplus_lib.find("//h2[@id='editor_title' or contains(text(),'发表回复')]", tbplus_lib.XPFirst);
				if(del_rA){del_rA.parentNode.removeChild(del_rA);}
		}
		if(thisPage==1){
			var del_rA=tbplus_lib.find("//td[contains(text(),'标　题:')]", tbplus_lib.XPFirst);
				if(del_rA){del_rA.setAttribute('style', "margin:0px;padding:0px;width:0px;height:0px;");del_rA.innerHTML="";}
		}
		if(thisPage==2){
			var del_rA=tbplus_lib.find("//td[contains(text(),'标　题:')]", tbplus_lib.XPFirst);
				if(del_rA){
					del_rA.parentNode.removeAttribute('style');
					del_rA.removeAttribute('width');
					del_rA.innerHTML="";
				}
			var del_rA=tbplus_lib.find("//tr[contains(@id,'tt')]//td", tbplus_lib.XPList);
				if(del_rA){for(var i=1;i<del_rA.snapshotLength;i++){
					del_rA.snapshotItem(i).innerHTML="";
				}}
			var del_rA=tbplus_lib.find("//form//div//table//tbody//tr", tbplus_lib.XPFirst);
				if(del_rA){del_rA.innerHTML="";}
		}
		var del_rA=tbplus_lib.find("//td[contains(text(),'内　容:')]", tbplus_lib.XPFirst);
			if(del_rA){del_rA.setAttribute('style', "margin:0px;padding:0px;width:0px;height:0px;");del_rA.innerHTML="";}
		var del_rA=tbplus_lib.find("//td[contains(text(),'用户名:')]", tbplus_lib.XPFirst);
			if(del_rA){del_rA.setAttribute('style', "margin:0px;padding:0px;width:0px;height:0px;");del_rA.innerHTML="";}
		var del_rA=tbplus_lib.find("//label[contains(text(),'验证码:')]", tbplus_lib.XPFirst);
			if(del_rA){del_rA.parentNode.setAttribute('style', "margin:0px;padding:0px;width:0px;height:0px;");del_rA.parentNode.innerHTML="";}
		var del_rA=tbplus_lib.find("//div[@id='edit_parent']//table[@id='post_tb']//tbody//tr", tbplus_lib.XPFirst);
			if(del_rA){del_rA.parentNode.removeChild(del_rA);}
		var f1=tbplus_lib.find("//div[@id='edit_parent']", tbplus_lib.XPList);
			if(f1){for(var i=0;i<f1.snapshotLength;i++){f1.snapshotItem(i).style.marginBottom="0px";}}

		if(thisPage==2){
			var f1=tbplus_lib.find("//a[@href='#sub' and contains(text(),'回复')]", tbplus_lib.XPList);
			if(f1){for(var i=0;i<f1.snapshotLength;i++){
				f1.snapshotItem(i).setAttribute('onClick', "document.getElementById('cLinkContent1').style.display='table-cell';document.getElementById('cLinkTitle1').style.display='table-cell';document.getElementById('menuSwitch').innerHTML='>>';");
			}}
		}
	},
	fun_PicMAX:function(){//圖片最大化
		var f1=tbplus_lib.find("//img[@class='BDE_Image' and @changedsize='true']", tbplus_lib.XPList);
		if(f1){for(var i=0;i<f1.snapshotLength;i++){
			var f1s=f1.snapshotItem(i);
			if		(f1s.style.width=="100%")		{f1s.setAttribute('style', "cursor:pointer;width:auto;height:auto;");}
			else if	(f1s.style.width=="auto")		{f1s.setAttribute('style', "cursor:pointer;");}
			else									{f1s.setAttribute('style', "cursor:pointer;width:100%;height:100%;");}
		}}
	},
	fun_DelAD:function(){//廣告刪除
		var css="@namespace url(http://www.w3.org/1999/xhtml);"+
				"div[id='frs_banner_ad'],div[class='l_banner'],"+
				"table[height='90'][width='984'],"+
				"img[height='90'][width='984'],"+
				"table[id='rightAd'],"+
				"div[id='ft'],div[id='footer']{"+
				"	display:none;"+
				"}";
		tbplus_lib.StyleLoad(css);
	},
	fun_IPShow:function(){//IP顯示
		var f1=tbplus_lib.find("//p[contains(@class,'floor')][contains(text(),'楼') or contains(text(),'樓')]", tbplus_lib.XPList);
		if(f1){for(var i=0;i<f1.snapshotLength;i++){
			if(f1.snapshotItem(i).innerHTML.search(/<br>/i)==-1){
				var f2=tbplus_lib.find("//div[@class='p_post']", tbplus_lib.XPList);
				if(f2){f2.snapshotItem(i).getAttribute("data-field").search(/\"user_ip\"\:(\d+)/i);}
					var num=parseInt(RegExp.$1);//提取IP串
						num=num.toString(16);//轉換16進位
					if(num.length==7){num="0"+num;}//補數
					var tmp_ip=new Array(4);//拆數字
						tmp_ip=[parseInt(num.substring(0,2), 16),parseInt(num.substring(2,4), 16),parseInt(num.substring(4,6), 16),parseInt(num.substring(6,8), 16)];
					var user_ip=tmp_ip[3]+"."+tmp_ip[2]+"."+tmp_ip[1]+"."+tmp_ip[0];//反向重組
				f1.snapshotItem(i).innerHTML+='<br><font style="font-size:10px;color:#000;">('+user_ip+')</font>';
			}
		}}
	},
	fun_oldPostDetector:function(){//墳帖偵測器
		Date.prototype.dateDiff=function(interval,objDate){
			var dtEnd=new Date(objDate);
			if(isNaN(dtEnd)){return undefined;}
			switch(interval){
//				case "s":return parseInt((dtEnd-this)/1000);
//				case "n":return parseInt((dtEnd-this)/60000);
//				case "h":return parseInt((dtEnd-this)/3600000);
				case "d":return parseInt((dtEnd-this)/86400000);
//				case "w":return parseInt((dtEnd-this)/(86400000 * 7));
//				case "m":return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-this.getFullYear())*12)-(this.getMonth()+1);
//				case "y":return dtEnd.getFullYear()-this.getFullYear();
			}
		};
		var f1=tbplus_lib.find("//ul[@class='p_tail']//li//span[not(@class)]", tbplus_lib.XPFirst);
		var post_time=new Date(f1.innerHTML.replace(/\-/g,'/'));
		var now_time=new Date();
//		var Diff_s=post_time.dateDiff("s",now_time);//秒差
//		var Diff_n=post_time.dateDiff("n",now_time);//分差
//		var Diff_h=post_time.dateDiff("h",now_time);//時差
		var Diff_d=post_time.dateDiff("d",now_time);//日差
//		var Diff_w=post_time.dateDiff("w",now_time);//週差
//		var Diff_m=post_time.dateDiff("m",now_time);//月差
//		var Diff_y=post_time.dateDiff("y",now_time);//年差

		var f1=tbplus_lib.find("//div[@class='l_thread_title']//h1", tbplus_lib.XPFirst);
		var f2=tbplus_lib.find("//div[@class='p_post']", tbplus_lib.XPFirst);
		var f3=tbplus_lib.find("//p[contains(@id,'post_content_')]", tbplus_lib.XPFirst);
		var oPD=0;
		var showtext='';
			showtext+=_ti.text_oPD[_L][1];
			var dyear=Math.floor(Diff_d/365);
			var dmonth=Math.floor((Diff_d%365)/30.4166666666666667);
			var dday=Math.floor((Diff_d%365)%30.4166666666666667);
			if(dyear||dmonth){
				if(dyear){showtext+=dyear+_ti.text_oPD[_L][2];}
				if(dmonth){showtext+=dmonth+_ti.text_oPD[_L][3];}
				showtext+=_ti.text_oPD[_L][4];
			}
			if(dday){
				showtext+=dday+_ti.text_oPD[_L][5];
			}
		if		(Diff_d>=old_pdetector_time_b*30){showtext+=_ti.text_oPD[_L][6];oPD=1;}
		else if	(Diff_d>=old_pdetector_time_s*30){showtext+=_ti.text_oPD[_L][7];oPD=1;}
		if(oPD==1){
			f1.innerHTML+='　　<font style="font-size:110%;color:#f00;">- '+_ti.text_oPD[_L][0]+'</font>';
			f1.style.textShadow='0 1px 1px rgba(255, 255, 255, .7)';
			f2.style.background='-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(169,169,169,.15) 20%, rgba(169,169,169,.2) 40%, rgba(122,122,122,.25) 60%, rgba(122,122,122,.3) 80%, rgba(122,122,122,.2) 100%)';
			var node=document.createElement("br");
			f3.insertBefore(node,f3.childNodes[0]);
			var node=document.createElement("p");
				node.align="center";
				node.setAttribute('style', "font-size:110%;color:#f00;text-shadow:0 1px 1px rgba(0,0,0,.7);text-decoration:blink;");
				node.innerHTML=showtext;
			f3.insertBefore(node,f3.childNodes[0]);
		}
	},
	fun_floatPageList:function(){//浮動頁數表
		if(pagelist_d==0){pld='top:04px;left:1px;bottom:auto;right:auto;';pld2='top:20px;left:4px;bottom:auto;right:auto;';}
		if(pagelist_d==1){pld='top:24px;right:1px;bottom:auto;left:auto;';pld2='top:40px;right:4px;bottom:auto;left:auto;';}
		if(pagelist_d==2){pld='bottom:0px;right:1px;top:auto;left:auto;';pld2='bottom:24px;right:4px;top:auto;left:auto;';}
		if(pagelist_d==3){pld='bottom:0px;left:1px;top:auto;right:auto;';pld2='bottom:24px;left:4px;top:auto;right:auto;';}
		var css="@namespace url(http://www.w3.org/1999/xhtml);"+
				".pager a,.pager span{"+
				"	left:0px;"+
				"	margin-right:1px;padding:0px 6px;"+
				"}";
	/*		css+=""+
				".pager a,.pager-center a,"+
				".l_pager a{"+
				"	opacity:.7;"+
				"}"+
				".pager a:hover,.pager-center a:hover,"+
				".l_pager a:hover{"+
				"	opacity:1;-moz-transition:opacity .75s ease-in-out;"+
				"}";*/
			css+=".p_thread .l_thread_info .l_posts_num{display:none !important;}";
			css+=".p_ding_up,.p_ding_down{position:fixed;"+pld2+"width:auto !important;z-index:999;}";
			css+="#footer{display:none !important;}";
		tbplus_lib.StyleLoad(css);

		if(thisPage==1||thisPage==3){var f1=tbplus_lib.find("//div[@class='pager pager-center']", tbplus_lib.XPList);}
		if(thisPage==2){var f1=tbplus_lib.find("//ul[@class='l_posts_num']", tbplus_lib.XPList);}
			if(f1.snapshotLength>0){for(var i=f1.snapshotLength-1;i>=f1.snapshotLength-1;i--){
				f1.snapshotItem(i).setAttribute('style', "position:fixed;"+pld+"border:1px solid #000;background-color:#fff;margin:0px;padding:0px;z-index:9999;");
			}}

		if(thisPage==1||thisPage==3){
			fun_btnStyleB("//div[@class='pager pager-center']//a[contains(text(),'首页')]");
			fun_btnStyleB("//div[@class='pager pager-center']//a[contains(text(),'上一页')]");
			fun_btnStyleB("//div[@class='pager pager-center']//a[contains(text(),'下一页')]");
			fun_btnStyleB("//div[@class='pager pager-center']//a[contains(text(),'尾页')]");
			if(thisPage==1){
				var f1=tbplus_lib.find("//div[@class='pager pager-center']//a", tbplus_lib.XPList);if(f1){//頁數按鈕列表
					var nowpage=parseInt(tbplus_lib.find("//div[@class='pager pager-center']//span", tbplus_lib.XPFirst).innerHTML);
					for(var i=0;i<f1.snapshotLength;i++){
						if(nowpage==1){
							f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('#!\/m\/p', '&pn=');
						}
						else{
							f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace(((nowpage-1)*50)+'#!\/m\/p', '');
							f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace(/&pn=0$/, '');
						}
					}
				}
				var f1=tbplus_lib.find("//div[@id='frs_nav']//div//ul//li//a", tbplus_lib.XPList);//導航欄位
					if(f1){for(var i=0;i<f1.snapshotLength;i++){
						f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('/f?kw='+kw_name+'#!/m/p0', '/f?kw='+kw_name+'&pn=0');
						f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('/f?kw='+kw_name+'#!/m', '/f?kw='+kw_name);
						f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('/f?kw='+kw_name+'#!/n', '/f/good?kw='+kw_name);
						f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('/f?kw='+kw_name+'#!/v', '/f/vote?kw='+kw_name);
					}}
				var f1=tbplus_lib.find("//div[@id='frs_good_nav']//span//a", tbplus_lib.XPList);//精品欄位
					if(f1){for(var i=0;i<f1.snapshotLength;i++){
						f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('/f?kw='+kw_name+'#!/n/c', '/f/good?kw='+kw_name+'&cid=');
						f1.snapshotItem(i).href=f1.snapshotItem(i).href.replace('/f?kw='+kw_name+'#!/n', '/f/good?kw='+kw_name);
					}}
			}
		}
		if(thisPage==2){
			fun_btnStyleB("//div[@class='l_thread']//div[@class='l_thread_info']//ul//li[@class='l_pager']//a[contains(text(),'首页') or contains(text(),'首頁')]");
			fun_btnStyleB("//div[@class='l_thread']//div[@class='l_thread_info']//ul//li[@class='l_pager']//a[contains(text(),'上一页') or contains(text(),'上一頁')]");
			fun_btnStyleB("//div[@class='l_thread']//div[@class='l_thread_info']//ul//li[@class='l_pager']//a[contains(text(),'下一页') or contains(text(),'下一頁')]");
			fun_btnStyleB("//div[@class='l_thread']//div[@class='l_thread_info']//ul//li[@class='l_pager']//a[contains(text(),'尾页') or contains(text(),'尾頁')]");
			var f1=tbplus_lib.find("//div[@class='l_thread']//div[@class='l_thread_info']//ul//li[@class='l_pager']", tbplus_lib.XPFirst);
			if(f1){f1.setAttribute('style', "font: 14px Verdana !important;");}
		}
		function fun_btnStyleB(regular){
			var f1=tbplus_lib.find(regular, tbplus_lib.XPFirst);
			if(f1){
				f1.setAttribute('style', "opacity:1;text-shadow:0 .5px .5px rgba(255, 255, 255, 1);");
				f1.style.color="#fff";
				if(pagelist_d==0||pagelist_d==1){
					if(thisPage==1){f1.style.margin="0px 0px -8px -2px";}
					if(thisPage==2){f1.style.margin="0px 0px 0px 1px";}
				}
				if(pagelist_d==2||pagelist_d==3){
					if(thisPage==1){f1.style.margin="-8px 0px 0px -2px";}
					if(thisPage==2){f1.style.margin="0px 0px 0px 1px";}
				}
				f1.style.padding="4px 2px 4px 2px";
				f1.style.border="1px solid #313131";
				f1.style.background="#414141 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyCAYAAACd+7GKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABpJREFUeNpi+P//vx4TAxCMIIIB6GkGgAADAEs6BomfMv5mAAAAAElFTkSuQmCC) repeat-x 0 -34px";
			}
		}
	},
	fun_base64IMG:function(){//base64圖片轉換
		var f1=tbplus_lib.find("//p[contains(@id, 'post_content_')]", tbplus_lib.XPList);
		if(f1){
			var i=0;
			while (f1.snapshotItem(i).innerHTML.search('\" alt=\"\"&gt;')==-1 && i<f1.snapshotLength){
				var src="";
				var text0="";
				var text1="";
				var imgStart="";
				while (f1.snapshotItem(i).innerHTML.search('\" alt=\"\"&gt;')==-1 && i<30 && f1.snapshotItem(i).innerHTML.search('此圖片以base64轉換而成')==-1){
						var node1=f1.snapshotItem(i);
						if(node1.innerHTML.search(/data\:image\/png\;base64/i)>-1){
							text0+=node1.innerHTML.split('&lt;img src=\"')[0];
							src+=node1.innerHTML.split('&lt;img src=\"')[1];
							node1.innerHTML="";
							imgStart=i;
						}
						else if(node1.innerHTML.search(/\//i)>-1
							&& node1.innerHTML.search(/http:\/\//i)==-1
							&& node1.innerHTML.search(/imgsrc.baidu.com/i)==-1
							&& node1.innerHTML.search(/static.tieba.baidu.com/i)==-1){
							src+=node1.innerHTML;
//							node1.innerHTML="<font style='font-size:10px;color:#f00;'>此樓為base64殘餘碼，因百度不支援以base64來顯示圖片，已用腳本轉換並整合至第一樓";
							node1.parentNode.parentNode.parentNode.parentNode.innerHTML=""
						}
						i++;
				};
				var imgEnd=i;
				if(f1.snapshotItem(i).innerHTML.search('\" alt=\"\"&gt;')!=-1){
					src+=f1.snapshotItem(i).innerHTML.split('\" alt=\"\"&gt;')[0];
					text1+=f1.snapshotItem(i).innerHTML.split('\" alt=\"\"&gt;')[1];
//					f1.snapshotItem(i).innerHTML="<font style='font-size:10px;color:#f00;'>此樓為base64殘餘碼，因百度不支援以base64來顯示圖片，已用腳本轉換並整合至第一樓";
					f1.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML=""
				}
				var objP=document.createElement('p');
					objP.setAttribute('id', f1.snapshotItem(imgStart).id);
					objP.setAttribute('class', f1.snapshotItem(imgStart).className);
					var objSPAN=document.createElement('span');
						objSPAN.innerHTML=text0;
					objP.appendChild(objSPAN);
					var objIMG=document.createElement('img');
						objIMG.setAttribute('src', src);
						objIMG.setAttribute('alt', "此圖片以base64轉換而成");
					objP.appendChild(objIMG);
					var objSPAN=document.createElement('span');
						objSPAN.innerHTML=text1;
					objP.appendChild(objSPAN);
				f1.snapshotItem(imgStart).parentNode.replaceChild(objP, f1.snapshotItem(imgStart));
				i++;
			}
		}
	},
	fun_unicodePost:function(){//Unicode發貼
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+='#editor .subTip{float:none;}';
		tbplus_lib.StyleLoad(css);

		var f1=tbplus_lib.find("//*[contains(@id,'aps')]", tbplus_lib.XPList);
		if(f1.snapshotLength>0){for(var i=0;i<f1.snapshotLength;i++){
			var node = document.createElement("input");
				node.setAttribute('id', 'btn_replybutton1');
				node.setAttribute('type', 'button');
				if(thisPage==2){
					node.setAttribute('style', '-moz-appearance:progresschunk;font-size:120%;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.9);');
					node.style.marginTop='1px';
					node.style.paddingTop='4px';
				}
				node.style.width='106.5px';
				node.style.height='26px';
				var nodeJS=''+
					'(function (){'+
					'	var str=rich_postor._editor.getHtml();'+
					'	var out="";'+
					'	for(var i=0;i<str.length;i++){'+
					'		if(str.charCodeAt(i)<128)	{out+=str.charAt(i);}'+
					'		else						{out+="&#"+str.charCodeAt(i)+";";}'+
					'	}'+
					'	rich_postor._editor.getHtml=function (){return out;};'+
					'	rich_postor._submit();'+
					'})();'+
//					'document.getElementById("btn_replybutton1").disabled=true;'+
					'';
				node.setAttribute('onclick', nodeJS);
				node.value=_ti.text_uP[_L];
			tbplus_lib.insertAfter(node,f1.snapshotItem(i));
		}}
	},
	fun_imgPost:function(){//圖片發貼
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+='#editor .subTip{float:none;}';
		tbplus_lib.StyleLoad(css);

		var f1=tbplus_lib.find("//*[contains(@id,'aps')]", tbplus_lib.XPList);
		if(f1.snapshotLength>0){for(var i=0;i<f1.snapshotLength;i++){
			var node = document.createElement("input");
				node.setAttribute('id', 'btn_replybutton2');
				node.setAttribute('type', 'button');
				if(thisPage==2){
					node.setAttribute('style', '-moz-appearance:progresschunk;font-size:120%;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.9);');
					node.style.marginTop='1px';
					node.style.paddingTop='4px';
				}
				node.style.width='96px';
				node.style.height='26px';
				var nodeJS=''+
					'(function (){'+
					'	var str=rich_postor._editor.getHtml();'+
					'	var out="";'+

					'	rich_postor._editor.getHtml=function (){return out;};'+
					'	rich_postor._submit();'+
					'})();'+
//					'document.getElementById("btn_replybutton2").disabled=true;'+
					'';
				node.setAttribute('onclick', nodeJS);
				node.value=_ti.text_iP[_L];
			tbplus_lib.insertAfter(node,f1.snapshotItem(i));
		}}
	},
};
window.addEventListener("DOMContentLoaded", tbplus_main.onLoad1, false);



/*
var f1=tbplus_lib.find("//img[@onmouseover='initShowTipPanel(this);']", tbplus_lib.XPList);//修正姓名板bug(在Firefox版本較低情況下會發生(Nightly無此問題))
for(var i=0;i<f1.snapshotLength;i++){
	var f2=tbplus_lib.find("//div[@class='p_post']", tbplus_lib.XPList);
		f2.snapshotItem(i).getAttribute("data-field").search(/\"name_u\"\:\"(.*)\"\,\"gender/i);
	f1.snapshotItem(i).setAttribute('username', RegExp.$1);
}*/