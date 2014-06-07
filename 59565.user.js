// Sina Miniblog Tweak
// Author: birdstudio
//
// ==UserScript==
// @name			Sina Miniblog Tweak
// @namespace		http://www.cssmagic.cn/
// @description		To customize and tweak Sina Miniblog's UI. Please check new version if it misfunctioned.
// @include			http://t.sina.com.cn/*
// @exclude			http://t.sina.com.cn/home
// @exclude			http://t.sina.com.cn/yunying/*
// @exclude			http://t.sina.com.cn/music/*
// @exclude			http://t.sina.com.cn/huodong/*
// @exclude			http://t.sina.com.cn/login.*
// @exclude			http://t.sina.com.cn/logout.*
// @exclude			http://t.sina.com.cn/setting/mobile
// ==/UserScript==

/** 预定义函数 **/
function $(s){return document.getElementById(s);}
function $cls(s){return document.getElementsByClassName(s);}
function $tagIn(eW,s){return eW.getElementsByTagName(s);}
function $qs(s){return document.querySelector(s);}
function $qsA(s){return document.querySelectorAll(s);}
function $crE(s){return document.createElement(s);}
function $crT(s){return document.createTextNode(s);}
function $insBfr(eW,e){eW.insertBefore(e,eW.firstChild);}
function $getT(e){return e.firstChild.data;}
function $setT(e,s){e.firstChild.data=s;}
function $hide(e){e.style.visibility='hidden';}
function $show(e){e.style.visibility='visible';}
function $off(e){e.style.display='none';}
function $on(e){e.style.display='';}
function $css(e,s){e.style.cssText=s;}
function $addEv(e,sEv,fn){e.addEventListener(sEv,fn,false);}
function $rmvEv(e,sEv,fn){e.removeEventListener(sEv,fn,false);}
function $setV(sName,v){GM_setValue(sName,v);}
function $getV(sName){return GM_getValue(sName,$.cfg[sName]);}
function $each(a,fn){for(var i=0,l=a.length;i<l;++i){fn(a[i]);}}
function $trim(s){return s.replace(/(^\s+)|(\s+$)/g,'');}
function $hasT(so,s){return so.indexOf(s)>-1;}
function $hasCls(so,s){return $hasT(' '+so+' ',' '+s+' ');}
function $addCls(e,s){var so=e.className;if(!$hasCls(so,s))e.className+=(' '+s);}
function $rmvCls(e,s){var so=e.className;if($hasCls(so,s))e.className=$trim((' '+so+' ').replace(' '+s+' ',' '));}
function $getQ(){
	var sS=location.search;if(!sS)return{};var o={},aQ=sS.slice(1).split('&'),aP,sN,sV;
	$each(aQ,function(s){if($hasT(s,'=')){aP=s.split('=');sN=aP[0];sV=aP[1];if(sN&&sV)o[sN]=sV;}});
	return o;
}

/** 重要全局变量 **/
$.css = '';
$.url = {};
$.url.c = location.href.split('t.sina.com.cn')[1];  /** 当前URL **/
$.url.p = location.pathname;  /** 当前URL路径（不包括hash等） **/
$.url.s = $getQ();  /** 以对象的方式存储当前URL的搜索字串 **/
$.url.h = location.hash.slice(1);  /** 当前URL的hash字串 **/
$.cfg = {
	ver: '2.02.20100216 Beta',
	//smtPubBoxDisAutoGetFocus: 0,		//禁止发布框自动获取焦点---
	smtOrigBoxReposLink: 1,				//转发气泡框内“原文转发/评论”链接移至右下角
	//smtTaskBoxDisOldMsg: 0,			//屏蔽已经出现多次的任务提示信息---
	smtSideAboutMe: 0,					//显示“关于我”---
	smtTopicColPubBox: 1,				//自动折叠隐藏发布框，并可展开---
	smtTopicSearchBoxAutoFill: 1,		//在搜索框中填入当前话题关键词
	smtTopicSearchBoxAdd: 1,			//启用独立的话题搜索框---
	smtAvatarBig: 1,					//启用悬停触发大头像功能---
	smtFllwListAvoidReflow: 1,			//消除鼠标在列表上滑过时的页面跳动
	smtFllwListRemoveFllwAllBtn: 1,		//去除粉丝列表下方的“关注本页所有人”按钮
	smtSinaUrlOpt: 1,					//优化 SinaURL（直接链到源地址，免中转）
	smtSinaUrlReplace: 1,				//用源网址完全替换短网址
	smtSinaUrlReplaceShortThan: 1,		//仅当源地址长度不超过[]字节时
	smtSinaUrlReplaceShortThanN: 40,	//仅当源地址长度不超过[]字节时（数字）
	smtFormLabelPointerStyle: 1,		//为表单标签设置手形鼠标、悬停高亮的样式
	smtLayerTitleMovableStyle: 1,		//为对话框标题栏设置可移动鼠标的样式
	end: 0
}
/** 当前URL探测筛选，并获取重要参数 **/
if ($.url.p == '/') {
	$.url.isRoot = 1;
} else {
	$.url.home = $cls('logoLink')[0].href.split('t.sina.com.cn')[1];  /** 我的首页URL, '/username' **/
	$.myUN = $.url.home.slice(1);  /** 我的用户名, 'username' **/
	$.myID = unsafeWindow.scope.$uid;  /** 我的数字ID, '123456789' **/
	$.url.isAuthor = $.myID=='1645021302';
	function $hasPath(s){return $hasT($.url.p,s);}
	function $hasMyNameInPath(){return $hasT($.url.p,'/'+$.myUN+'/')||$hasT($.url.p,'/'+$.myID+'/');}

	if ($.url.p == $.url.home) $.url.isHome = 1;  /** 我的首页 **/
	else if ($.url.p=='/myprofile.php') $.url.isHomeMore = 1;  /** 我的首页后续页 **/
	else if ($hasPath('/k/')) {if ($.url.p!='/k/') $.url.isTopic = 1;}  /** 话题页面 **/
	else if (/\/follow$/.test($.url.p) || ($.url.p=='/attention/att_list.php' && $.url.s.action=='0')) {  /** 关注列表 **/
		$.url.isFllw = 1; if ($hasMyNameInPath() || ($hasPath('/attention/') && !$.url.s.uid)) $.url.isMyFllw = 1;}
	else if (/\/fans$/.test($.url.p) || ($.url.p=='/attention/att_list.php' && $.url.s.action=='1')) {  /** 粉丝列表 **/
		$.url.isFan = 1;  if ($hasMyNameInPath() || ($hasPath('/attention/') && !$.url.s.uid)) $.url.isMyFan = 1;}
	else if ($.url.p=='/'+$.myUN+'/profile'|| $.url.p=='/'+$.myID+'/profile'|| $.url.p=='/mymblog.php') $.url.isMyBlog=1;  /** 我的微博 **/
	else if ($.url.p=='/favs' || $hasPath('/favorite/')) $.url.isMyFav=1;  /** 我的收藏 **/
	else if ($.url.p=='/atme' || $hasPath('/myat/')) $.url.isMyAt=1;  /** @我的 **/
	else if ($.url.p=='/comments' || $.url.p=='/comment/commentmsglist.php') $.url.isMyCommIn=1;  /** 我收到的评论 **/
	else if ($.url.p=='/comment/commentsendbox.php') $.url.isMyCommOut=1;  /** 我发出的评论 **/
	else if ($.url.p=='/messages') $.url.isMyMsg=1;  /** 我的私信 **/
	else if ($hasPath('/message/')) $.url.isMyMsgTalk=1;  /** 我的私信对话 **/
	else if (/\/info$/.test($.url.p)) {  /** 关于用户 **/
		$.url.isInfo=1; if ($hasMyNameInPath()) $.url.isMyInfo=1;}
	else if ($hasPath('/n/')) {  /** 用户的昵称（链至其微博） **/
		$.url.isUN=1; if($qs('.right_nav')) $.url.isMyUN=1;}  /** MyUN 布局类似我的首页 **/
	else if ($.url.p=='/profile.php') $.url.isUserBlog=1;  /** 用户的微博 **/
	else if ($.url.p=='/setting' || $hasPath('/setting/') || $hasPath('/person/') || $hasPath('/blacklist/') || $hasPath('/invite/') || $hasPath('/friend/') || $.url.p=='/findfriends' || $hasPath('/imbot/') || $hasPath('/plugins/') || $hasPath('/search/')) $.url.isSetting=1;
	else if ($hasPath('/pub/')) $.url.isPub=1;  /** 微博广场 **/
	else if ($.url.p=='/sorry') $.url.isError=1;  /** 错误页面 **/
	else if(/^\/\d+\/\w+$/.test($.url.p)){  /** 微博详情 **/
		$.url.isDetail=1; if ($hasMyNameInPath()) $.url.isMyDetail=1;}
	else if(/^\/\w+$/.test($.url.p) && $cls('other_headpic')[0]) $.url.isUserBlog=1;  /** 用户的微博 **/
	else $.url.isUnknown=1;  /** 未知 **/

	if($.url.isHome || $.url.isHomeMore || $.url.isTopic || $.url.isMyFllw || $.url.isMyFan || $.url.isMyBlog || $.url.isMyFav || $.url.isMyAt || $.url.isMyCommIn || $.url.isMyCommOut || $.url.isMyMsg || $.url.isMyMsgTalk || $.url.isMyInfo || $.url.isMyUN || $.url.isSetting || $.url.isError || $.url.isMyDetail) {  /** 我的地盘 **/
		$.url.isMyZone=1;
		if($.url.isHome || $.url.isHomeMore || $.url.isTopic || $.url.isMyFav || $.url.isMyAt || $.url.isMyUN) $.url.hasPubBox=1;
	}
	if($.url.isHome || $.url.isHomeMore || $.url.isMyBlog || $.url.isMyFav || $.url.isMyAt || $.url.isTopic || $.url.isMyAt || $.url.isUN || $.url.isUserBlog) $.url.hasFeedList=1;
	//----------
	//$.myNN = $.url.isHome ? $getT($qs('div.person2 p.person_nm strong')) : '';  /** 我的昵称 **/
}

if ($.url.isAuthor) {
	console.log('$.url.c = '+$.url.c);
	console.log('$.url.p = '+$.url.p);
	console.log('$.url.h = '+$.url.h);
	if($.url.isHome) console.log('$.url.isHome');
	if($.url.isHomeMore) console.log('$.url.isHomeMore');
	if($.url.isTopic) console.log('$.url.isTopic');
	if($.url.isFllw) console.log('$.url.isFllw');
	if($.url.isMyFllw) console.log('$.url.isMyFllw');
	if($.url.isFan) console.log('$.url.isFan');
	if($.url.isMyFan) console.log('$.url.isMyFan');
	if($.url.isMyBlog) console.log('$.url.isMyBlog');
	if($.url.isMyFav) console.log('$.url.isMyFav');
	if($.url.isMyAt) console.log('$.url.isMyAt');
	if($.url.isMyCommIn) console.log('$.url.isMyCommIn');
	if($.url.isMyCommOut) console.log('$.url.isMyCommOut');
	if($.url.isMyMsg) console.log('$.url.isMyMsg');
	if($.url.isMyMsgTalk) console.log('$.url.isMyMsgTalk');
	if($.url.isInfo) console.log('$.url.isInfo');
	if($.url.isMyInfo) console.log('$.url.isMyInfo');
	if($.url.isUN) console.log('$.url.isUN');
	if($.url.isMyUN) console.log('$.url.isMyUN');
	if($.url.isUserBlog) console.log('$.url.isUserBlog');
	if($.url.isSetting) console.log('$.url.isSetting');
	if($.url.isPub) console.log('$.url.isPub');
	if($.url.isError) console.log('$.url.isError');
	if($.url.isDetail) console.log('$.url.isDetail');
	if($.url.isMyDetail) console.log('$.url.isMyDetail');
	if($.url.isMyZone) console.log('$.url.isMyZone');
	if($.url.hasPubBox) console.log('$.url.hasPubBox');
	if($.url.hasFeedList) console.log('$.url.hasFeedList');
	if($.url.isUnknown) console.log('$.url.isUnknown');
}

/** 控制面板 **/
function fnSetConfigLink() {  /** 添加控制面板的入口 **/
	var eW = $cls('copytxt')[0];
	var e = $crE('a');
	//eW.style.lineHeight = '16px';
	e.innerHTML = '围脖精灵';
	e.href = 'javascript:void(0)';
	$css(e,'padding:0 5px 0 18px;background:url(http://simg.sinajs.cn/common/images/icon15/CP_i_center.gif) no-repeat 0 0;')
	$addEv(e,'click',fnSetCP);
	eW.appendChild(e);
	$.css += '#smtCfgTab{margin: 10px 20px 0;padding-left: 30px;}#smtCfgTab a{	float:left;	padding: 6px 13px 0 14px;	height:24px;	font-size:14px;	color:#0082CB;	background-image:url(http://simg.sinajs.cn/miniblog/images/common/or_PY_tag2.gif);	outline:0;}#smtCfgTab .PY_tago a{color:#666;text-decoration: none;background-position:left bottom;cursor: text;}#smtCfgTab .PY_tagn a {background-position:left top;}#smtCfgBox .tab {display: none;}#smtCfgBox.c1 .n1,#smtCfgBox.c2 .n2,#smtCfgBox.c3 .n3,#smtCfgBox.c4 .n4,#smtCfgBox.c5 .n5,#smtCfgBox.c6 .n6,#smtCfgBox.c7 .n7 {display: block;}#smtCfgBox.c1+div a.mBlogBtn{display: none;}#smtCfgBox{padding:10px 0 0 25px;min-height:190px;line-height:20px;color:#666;}#smtCfgBox+.MIB_btn{padding-bottom:15px;}#smtCfgBox .col{display:table-cell;padding-right:40px;min-width:245px;}#smtCfgBox a{color:#0082CB;}#smtCfgBox h2 {padding:20px 30px;height: 30px;font: 700 20px/1.5 "Microsoft YaHei";color:#333;}#smtCfgBox h2 b {float: left; height: 30px;width: 43px;background: url(http://simg.sinajs.cn/miniblog/images/common/PY_icon.gif) no-repeat -605px -51px;}#smtCfgBox div.txt {padding: 0 95px;}#smtCfgBox .txt p {padding-bottom: 5px;text-indent: 2em;}#smtCfgBox h4 {font:700 14px/30px "Microsoft YaHei";color:#000;}#smtCfgBox h4 span {margin-left:8px;font:700 12px Arial;color:#666;}#smtCfgBox hr {margin:6px 20px 6px -2px;height:1px;border:0;border-bottom:1px solid #ddd;}#smtCfgBox h3 {	margin: 18px 0 10px -5px;	height:0;	color:#000;	border: 1px solid #ccc;border-bottom-color:#eee;border-width: 1px 0;}#smtCfgBox h3 span {	float: left;	display: block;	margin: -10px 0 0 -5px;	padding: 0 5px;	font:700 13px/19px "Microsoft YaHei";	background: white;}#smtCfgBox .col p {white-space: nowrap;}#smtCfgBox p.sub1 {padding-left: 1.5em;}#smtCfgBox p.sub2 {padding-left: 3em;}#smtCfgBox p.sub3 {padding-left: 4.5em;}#smtCfgBox p.off,#smtCfgBox p.dis {color:silver;}#smtCfgBox p.new:after{content:" New!";color:#e00;font:italic 700 12px Arial;}#smtCfgBox p.new.dis:after{color:silver;}#smtCfgBox input[type=checkbox]{margin-right:2px;vertical-align:-3px;}#smtCfgBox input[type=text]{margin:0 2px;padding:1px 3px;font-family:simsun;border:1px solid;border-color:#999 #ddd #ddd #999;}#smtCfgBox p.off label,#smtCfgBox p.dis label{cursor:text;color:inherit;}#smtCfgBox label{cursor:pointer;}#smtCfgBox label:hover{color:#000;}';
}
function fnSetCP() {  /** 启动控制面板 **/
	var html = '<div id="smtCfgTab" class="PY_tag">	<ul>		<li><div class="PY_tago"><a href="javascript:;" class="n1">欢迎</a></div></li>		<li><div class="PY_tagn"><a href="javascript:;" class="n2">界面与样式</a></div></li>		<li><div class="PY_tagn"><a href="javascript:;" class="n3">阅读与互动</a></div></li>		<li><div class="PY_tagn"><a href="javascript:;" class="n4">关于</a></div></li>	</ul></div><div id="smtCfgBox" class="c1"><div class="tab n1">	<h2><b></b>感谢您使用“围脖精灵”！</h2>	<div class="txt">		<p>聪明的精灵正在为您服务。</p>		<p>如果您想了解精灵的工作内容，就到各个选项卡里看看吧。</p>	</div></div><div class="tab n4">	<h4>围脖精灵<span id="smtVer"></span></h4>	<p>作者: <a href="http://t.sina.com.cn/cssmagic" target="_blank">@CSS魔法</a> (birdstudio)</p>	<hr />	<p>版权协议: 所有脚本程序代码以 GPLv3 协议发布。</p>	<p>源代码: （即将发布于 <a href="http://www.cssmagic.net/lab/smt/" target="_blank">“围脖精灵”官方主页</a>）</p>	<hr />	<p>致谢:</p>	<p>- 头像放大功能的灵感来自于 <a href="http://t.sina.com.cn/zeal" target="_blank">@ZEAL</a> 的 tsinaAvatarShower 脚本。</p>	<p>- 目前所用图片资源来自于“新浪微博”和“新浪博客”。</p></div><div class="tab n2"><div class="col">	<h3><span>侧边栏</span></h3>	<p class="dis"><label><input type="checkbox" id="smtSideAboutMe" />显示“关于我”</label></p>	<h3><span>话题搜索</span></h3>	<p class="dis"><label><input type="checkbox" id="smtTopicColPubBox" />在话题页折叠隐藏发布框（可展开）</label></p>	<p class="new dis"><label><input type="checkbox" id="smtTopicSearchBoxAdd" />在话题页启用独立的话题搜索框</label></p>	<p><label><input type="checkbox" id="smtTopicSearchBoxAutoFill" />在搜索框中填入当前话题关键词</label></p>	<h3><span>头像</span></h3>	<p class="dis"><label><input type="checkbox" id="smtAvatarBig" />启用悬停触发大头像功能</label></p></div><div class="col">	<h3><span>粉丝/关注列表</span></h3>	<p><label><input type="checkbox" id="smtFllwListAvoidReflow" />消除鼠标在列表上滑过时的页面跳动</label></p>	<p><label><input type="checkbox" id="smtFllwListRemoveFllwAllBtn" />去除粉丝列表下方的“关注本页所有人”按钮</label></p>	<h3><span>样式</span></h3>	<p><label><input type="checkbox" id="smtFormLabelPointerStyle" />为表单标签设置手形鼠标、悬停高亮的样式</label></p>	<p><label><input type="checkbox" id="smtLayerTitleMovableStyle" />为对话框标题栏设置可移动鼠标的样式</label></p></div></div><div class="tab n3"><div class="col">	<h3><span>微博列表</span></h3>	<p><label><input type="checkbox" id="smtOrigBoxReposLink" />转发气泡框内“原文转发/评论”链接移至右下角</label></p></div><div class="col">	<h3><span>短网址</span></h3>	<p><label><input type="checkbox" id="smtSinaUrlOpt" />优化 SinaURL（直接链到源地址，免中转）</label></p>	<p class="sub1"><label><input type="checkbox" id="smtSinaUrlReplace" value="smtSinaUrlOpt" />用源网址完全替换短网址</label></p>	<p class="sub2"><label><input type="checkbox" id="smtSinaUrlReplaceShortThan" value="smtSinaUrlReplace" />仅当源地址长度不超过<input type="text" class="number" id="smtSinaUrlReplaceShortThanN" style="width:24px;text-align:right;" onclick="this.focus();return false;" />字节时</label></p></div></div></div>';
	var cfg = {
		title:'围脖精灵 - 控制面板',width:600,zIndex:1000,hidden:true,
		btns:[{text:'保存设置',select:true,nohide:true},{text:'取消'}]
	};
	$.cp = unsafeWindow.App.customDialog(html, cfg);
	$.cp.show();
	function fnSetCPBtn() {  //设置控制面板的按钮样式与事件
		//新版补丁
		var eW = $cls('layerBtn')[0];
		eW ? eW.className = 'MIB_btn' : eW = $cls('MIB_btn')[0];
		var nlBtn = $tagIn(eW,'a');
		nlBtn[0].className = 'btn_normal';
		nlBtn[1].className = 'btn_notclick';
		$addEv(nlBtn[0],'click',fnSaveCfg);
	}
	fnSetCPBtn();
	function fnSetCPTab() {  //设置控制面板的标签页
		var nlTab = $qsA('#smtCfgTab li a');
		var eW = $('smtCfgBox');
		$each(nlTab,function(e){
			$addEv(e,'click',function(){
				var n = this.className.slice(1);
				eW.className = 'c'+n;
				$qs('#smtCfgTab .PY_tago').className='PY_tagn';
				this.parentNode.className='PY_tago';
			});
		});
	}
	fnSetCPTab();
	fnLoadCfg();
}
function fnLoadCfg() {  /** 读取个性化设置参数，并对各选项进行初始化 **/
	$('smtVer').appendChild($crT('v'+$.cfg.ver));
	function $getP(e){return e.parentNode.parentNode;}
	var elInputCB = $qsA('#smtCfgBox input[type=checkbox]');
	$each(elInputCB,function(e){e.checked = $getV(e.id);});
	var elInputT = $qsA('#smtCfgBox input[type=text]');
	$each(elInputT,function(e){e.value = $getV(e.id);});
	var elInputNum = $qsA('#smtCfgBox input.number');
	$each(elInputNum,function(e){
		$addEv(e,'blur',function(){  //修正数字型输入框的用户输入值
			if (!Number(this.value)) this.value = $.cfg[this.id];
		});
	});
	//----
	fnSetInput('#smtCfgBox p.dis input',0);
	fnIniInputOfSub(1);
	fnIniInputOfSub(2);
	fnIniInputOfSub(3);
	fnSetInput('#smtCfgBox p.off input',0);
	//----
	$each(elInputCB,function(e){
		$addEv(e,'click',function() {
			fnSetLineDependOn(this);
			fnSetInput('#smtCfgBox p.on input',1);
			fnSetInput('#smtCfgBox p.off input',0);
			fnSetInlineInputTxt(this);
		});
	});
	function fnSetInlineInputTxt(e){  //设置本行内文本框的有效性
		var eInputTxt = $getP(e).querySelector('input[type=text]');
		if (eInputTxt) {
			eInputTxt.disabled = !e.checked;
		}
	}
	function fnSetLineDependOn(e) {  //设置下属控件
		var el = $qsA('#smtCfgBox input[value='+e.id+']');  //e 下属控件的 value 已设定为 e.id，因此得到下属控件
		if (el.length==0) return false;
		var eW;
		if (e.checked && !$hasCls($getP(e).className,'off')) {  //如果它选中了，那么把下属选项打开(类名 on)
			$each(el,function(eInput){
				eW = $getP(eInput);
				$rmvCls(eW,'off');
				$addCls(eW,'on');
				fnSetLineDependOn(eInput);  //递归
			});
		} else if (!e.checked || $hasCls($getP(e).className,'off')) {
			$each(el,function(eInput){
				eW = $getP(eInput);
				$rmvCls(eW,'on');
				$addCls(eW,'off');
				fnSetLineDependOn(eInput);
			});
		}
	}
	function fnIniInputOfSub(n) {
		$each($qsA('#smtCfgBox p.sub'+n+' input[type=checkbox]'),function(e){
			if(!$(e.value).checked) $getP(e).className += ' off';
			else if(n > 1 && $hasCls($getP($(e.value)).className,'off')) $addCls($getP(e),'off');
		});
	}
	function fnSetInput(sQS,b) {
		$each($qsA(sQS),function(e){e.disabled = !b;});
	}
}
function fnSaveCfg() {  /** 收集个性化设置参数，保存到本地存储 **/
	var elInputCB = $qsA('#smtCfgBox input[type=checkbox]');
	$each(elInputCB,function(e){$setV(e.id, (e.checked ? 1 : 0));});
	var elInputT = $qsA('#smtCfgBox input[type=text]');
	$each(elInputT,function(e){$setV(e.id, e.value);});
	$.cp.close();
	unsafeWindow.App.alert("您的个性化设置已保存！<br />页面刷新后生效。", {title:'保存成功',icon:3});
}
/* --------------------------------------------- */
function fnFixFollowListPage() {  //去除粉丝列表下方的“关注本页所有人”按钮；消除鼠标在列表上滑过时的页面跳动
	if ($.url.isMyFan && $getV('smtFllwListRemoveFllwAllBtn')) {var eBtn = $('attbtn');if (eBtn) $off(eBtn.parentNode);}
	if ($getV('smtFllwListAvoidReflow')) $.css += '.conBox_r{margin-bottom:-10px;}.MIB_linedot_l{min-height:68px;}\n';
}
function fnSetSearchPage() {
	var eInput = $('hot_keyword_top');
	var sKW = eInput.value;
	if ($getV('smtTopicSearchBoxAutoFill')) {  //在搜索框中填入当前话题关键词
		$('m_keyword').value = sKW;
		$('hot_keyword').value = sKW;
	}
}
function fnSetShortUrl(eW) {  //优化 SinaURL（直接链到源地址，免中转）
	if (!eW) return false;
	var nlLink = $tagIn(eW,'a');
	$each(nlLink,function(e){
		var s = e.title;
		if ($hasT(e.href,'//sinaurl.cn/') && s) {
			if (!$hasT(e.innerHTML,'<img')) {  //不处理视频短网址的 href
				e.href = s;
				e.removeAttribute('title');
			}
			if (sCfgReplace) {  //用源网址完全替换短网址；仅当源地址长度不超过[]字节时
				if (sCfgReplaceShortThan && s.length > parseInt(sCfgReplaceShortThanN,10)) return false;
				$setT(e,s);
				e.removeAttribute('title');
			}
		}
	});
}
function fnHideModule(e) {
	if (e) $off(e);
}


/** 启动，根据网址进行分流 **/
if ($.url.isHome || $.url.isHomeMore) fnSetConfigLink();
if ($.url.isHome) {
	//if (!$getV('smtSideAboutMe')) fnHideModule($qs('.mainR .f_pro'));  //显示“关于我”
}
else if ($.url.isMyFllw || $.url.isMyFan) fnFixFollowListPage();
else if ($.url.isTopic) fnSetSearchPage();

if ($.url.hasFeedList || $.url.isDetail) {
	if ($getV('smtOrigBoxReposLink')) $.css += '.MIB_assign p.source:after{content:"";display:block;clear:both;height:0;}.source_att{float:right;white-space:nowrap;}\n';
	if ($getV('smtSinaUrlOpt')) {
		var sCfgReplace = $getV('smtSinaUrlReplace');
		var sCfgReplaceShortThan = $getV('smtSinaUrlReplaceShortThan');
		var sCfgReplaceShortThanN = $getV('smtSinaUrlReplaceShortThanN');
		if ($.url.hasFeedList) fnSetShortUrl($cls('MIB_feed')[0]);
		else fnSetShortUrl($cls('singleBlogCont')[0]);
	}
}


/** 启动，根据个性化设置进行分流 **/
if (!$.url.isRoot) {
	if ($getV('smtFormLabelPointerStyle')) $.css += 'label[for]{color:#666 !important;cursor:pointer;}label[for]:hover{color:#000 !important;}\n';
	if ($getV('smtLayerTitleMovableStyle')) $.css += '.layerBoxTop{cursor:move !important;}\n';

	GM_addStyle($.css);
}



