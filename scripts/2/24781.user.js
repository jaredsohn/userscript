// ==UserScript==
// @name           PCHOME KDS [w/o style mod Ver]
// @namespace      http://pto2k.blogspot.com
// @description    宽带山和谐版[无样式版]
// @include        http://club.pchome.net/*
// ==/UserScript==

/*
changelog
2008-04-4 22:35:24
move style related part to stylish

2008-03-31 19:24:50
quotation font
quotation box corner
forum pages: title shortened
forum pages: topic link highlight color changed, underline removed

2008-03-30 23:28:02
new! double click a message to quote it!
new! copy UNO's stylish css for post listing (http://club.pchome.net/topic_1_15_2460191__.html)
remove pinned topics in topic list
fix right sidebar selection due to layout upgrade
sidebar selection method improved, modification in the future will be easy

2008-03-23 18:17:56
added 5 control keys in topic pages: v b n m y
for view all/view top floor only/previous page/next page/last page, respectively.

2008-3-21
3<br>s removed, saving more space
line above sign shortened, and is grey now, the less the more
font size of signs and people info changed to 8px
other small style fixes

2008-3-21
style changes, color, font, border etc
floor num. in post
resize and move 3 buttons to the top right:new post,my post,etc

2008-3-20
force all links open in same window
post list page sidebar config for different forums
remove sign default and blank signs
remove extra link breaks

2008-3-19
removed some blocks in right side bar, both in topic and forum pages

2008-3-18
first version
*/


/*
功能计划
keyboard navigate:show/hide sidebar etc
hide reply box untile mouseover
登录条改成隐藏式样，鼠标经过边缘后显示 div club_login_wrapper
添加上一页下一页链接

http://club.pchome.net/forum_1_15___c_md.html 人气排序
http://club.pchome.net/forum_1_15___d_md.html 回复排序
http://club.pchome.net/forum_1_15___b_md.html 发表时间排序
http://club.pchome.net/forum_1_15.html	回复时间排序


*/

/* 用id查对象 */
var getObj = function(objId) {
 return document.all ? document.all[objId] : document.getElementById(objId);
}
/* 用xpath查对象 返回一个*/
var xpath = function(query) {
	queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);
}
/* 用xpath查对象 返回全部*/
var xpathAll = function(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
/* 修改样式表 */
var addCSS = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
/* 删除对象 */
var removeMe = function(item){
	//alert(item)
	if (item) {
	item.parentNode.removeChild(item);}
	//alert("remove");
}
/* 隐藏对象 */
var hideMe = function(item){
	//alert(item)
	if (item) {
		with (item.style){
			display="none";
		}
	}
}

/*
var scripts = [
    'http://club.pchome.net/js/popupImages.js',
    'http://club.pchome.net/js/postFunction.js'
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}
*/

var quoteThis = function(thisMc){
	quoteMsg = unsafeWindow['quoteMsg'];
	idStr=thisMc.id;
	idStr=idStr.split("_")[3]
	quoteMsg(idStr)
//	alert(id)
}



/* 如果是发帖成功页面，直接跳转 */
var jumpLink, linkText1, linkRef, linkText2;
jumpLink = document.getElementsByTagName('a');
if (jumpLink.length){
	for(var i=0; i<jumpLink.length; i++){
		linkText1 = jumpLink[i].text;
		linkRef = jumpLink[i].href;
		linkText2 ="需要转入主题列表请点击这里";
		if (linkText1 == linkText2){
			window.location.href = linkRef;	
		}
	}
}

/* 获得通用对象 隐藏对象 */
/*
club_login_wrapper = getObj("club_login_wrapper");//登录控制条
top_content = getObj("top_content");//傻logo和广告，还是盛大的广告
submenu = getObj("submenu");//论坛导航
breadcrumbs = getObj("breadcrumbs");//位置，我知道我在哪里
at_wrapper = getObj("at_wrapper");//公告announcement和专题theme
admin = getObj("admin");//亲爱的管理员，你会点他们么
//button = getObj("button");//发表文章 我的帖子 精华库 ，链接以后重写到上面去吧
topic_search = getObj("topic_search");//发表文章 我的帖子 精华库 

hideMe(club_login_wrapper);
hideMe(top_content);
hideMe(submenu);
hideMe(breadcrumbs);
hideMe(at_wrapper);
hideMe(admin);
//hideMe(button);
hideMe(topic_search);
*/


/*
button333 = xpath("//div[@id='button']/parent::*[div[@id='']]")
removeMe(button333);
*/

/* 用CSS来改一些 */
/*
addCSS('body{font-family:"Lucida Grande", Tahoma, Verdana, arial, sans-serif, hei !important;font-size:12px;background:#fdefff;}');
addCSS('div{font-family:"Lucida Grande", Tahoma, Verdana, arial, sans-serif, hei !important;}');
addCSS('.o_info{display:none}');//每贴的广告
//addCSS('#sign{display:none}');//签名
addCSS('.fn{font-size:8px; margin:1px; height:12px;line-height:10px;}');//帖子的功能链接
addCSS('.author_info{font-size:5px;padding:3px;}');//发帖人信息
addCSS('.author{font-size:12px !important;padding:0px;}');//发帖人名
addCSS('.hppp{display:none;}');//ppp
addCSS('.avatars{text-align:center;}');//头像居中
addCSS('#sign{height:auto;}');//签名高度
addCSS('.p_time{font-size:9px;padding:2px;background:#ffdeff;height:12px !important;width:100%;-moz-border-radius:0px 0px 5px 5px;margin-bottom:0px;border:none;}');//发帖时间
//addCSS('div{font-size:6px;}');
addCSS('#button{font-size:7px;right: 2px; top: -26px; position: absolute; }');//三个按钮的位置
addCSS('#button a{ width:auto; height:16px; line-height:16px; color:333; text-align:center; display:block; float:left; margin-right:1px; font-weight:normal;}');
addCSS('#button a:hover{ color:#333}');
addCSS('#publish{ background:#B5DDF2; border:1px #2476B7 solid;content:"发" !important;}');
addCSS('#my_topic{ background:#E3CFFF;  border:1px #B581FF solid;content:"无" !important;}');
addCSS('#ess{ background:#9CDC6E; border:1px #5FC43C solid;content:"精" !important;}');
addCSS('#publish a{content:"发" !important;}');
addCSS('#my_topic a{content:"无" !important;}');
addCSS('#ess a{content:"精" !important;}');
addCSS('#topic_title{background-color:#7b7cff;border:0px;-moz-border-radius:6px 6px 0px 0px;}');//标题颜色
addCSS('.rtag .t{background-color:#7b7cff;border:0px;}');//边栏标题颜色
//addCSS('.th.t{background-color:#7b7cff;border:0px;}');
addCSS('#main_frame,#left_content,#right_content{border:none;}');//去掉左边和右边的边框
addCSS('#mainmenu{-moz-border-radius:6px 6px 0px 0px;}');//导航栏的圆角，原来的底图角是不透明的
addCSS('.mc {padding:5px !important;}');
addCSS('.greyline{color:#dddddd !important;padding 0px !important;line-height:3px;}');
//addCSS('.rtag,.t{background:#4b4dff;border:0px;color:black;}');
addCSS('.ul .list_item top{dispay:none !important;}');
addCSS('.fn2{margin-bottom:5px !important;}');//帖子和回复间的空间
addCSS('div#left_content .top{display:none !important;}');//不显示置顶的几个帖子
addCSS('div#left_content .list_title{display:none !important;}');//不显示列表表头
addCSS('div#left_content td{font-family:"Lucida Grande", Tahoma, Verdana, arial, sans-serif, hei !important;-moz-border-radius:9px 0px 9px 0px !important;}');//引用
addCSS('div#left_content table{-moz-border-radius:9px 0px 9px 0px !important;}');//引用



addCSS('div#left_content .list_item{border-bottom:1px dotted !important;}');
addCSS('div#left_content .list_item:hover{background-color:#F3A3FF !important;color:#fff !important;text-decoration:none !important;}');
addCSS('div#left_content .list_item li{height:auto !important;padding:2px !important;line-height: 1.50 !important;}');
addCSS('div#left_content .list_item .i3{width:400px !important;}');
addCSS('div#left_content .list_item .i3 a:hover,div#left_content .list_item .i3 a:active {color:#6d0cc5 !important;text-decoration:none !important;}');
addCSS('div#left_content .list_item .i3 a.zhuti{font-size:0.7em;background-color:#BBFBFD !important;border:1px solid #ccc !important;font-weight:light !important;padding:0 2px !important;-moz-border-radius:80% !important;}');
addCSS('div#left_content .list_item .i3 a.zhuti:hover{background-color:#aaa !important;color:#fff !important;text-decoration:none !important;}');
addCSS('div#left_content .list_item .i2,div#left_content .list_item .i4{font-size:100% !important;height:100% !important;}');
addCSS('div#left_content .list_item .i2:before{content:"/" !important;}');
addCSS('div#left_content .list_item .i2{position:relative !important;left:458px !important;margin-right:-100px !important;width:auto !important;}');
addCSS('div#left_content .list_item .i4{padding-right:55px !important;clear:right !important;text-align:right !important;width:50px !important;}');
addCSS('div#left_content .list_item .i5,div#left_content .list_item .i6,div#left_content .list_item .i7,div#left_content .list_item .i8{float:right !important;height:auto !important;line-height:normal !important;width:auto !important;padding:0 !important;font-size:9px !important;}');
addCSS('div#left_content .list_item .i5,div#left_content .list_item .i7{width:7em !important;text-align:left !important;}');
addCSS('div#left_content .list_item .i6:after,div#left_content .list_item .i8:after{content:"by" !important;font-size:smaller !important;margin-right:4px !important;}');
addCSS('div#left_content .list_item .i7{clear:right !important;}');
addCSS('div#left_content .list_item .i7 a,div#left_content .list_item .i8{color:grey !important;}');
addCSS('div#left_content .list_item .i8:after{margin-left:4px !important;}');

*/

/* 帖子页面 */
if(window.location.href.indexOf("topic")>-1){
	/* 去掉minihome图片，链接点人名就可以了嘛 */
	var allDivs, miniHome;
	allDivs = xpathAll("//img[@src='img/minihome.gif']");	
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		miniHome = allDivs.snapshotItem(i);
		removeMe(miniHome)
	}
	/* 	签名有的还是比较有意思的，所以区别对待，删除默认的签名档 */
	//	allBlankSign = xpathAll("//text()[/parent::div[@id='sign'] and contains('这个家伙很懒')]")//不知道能不能直接匹配
	allBlankSign = xpathAll("//text()/parent::div[@id='sign']")
	for(var i=0;i<allBlankSign.snapshotLength;i++){
		thisSign = allBlankSign.snapshotItem(i)
		if(thisSign.textContent.indexOf("这个家伙很懒，什么也没留下......")>-1){
			removeMe(thisSign);
		}else if(thisSign.textContent.indexOf("&amp;nbsp;")>-1){
			removeMe(thisSign);
		}else if(thisSign.textContent.length<5){//短于5个字的也删除，其实是没有找到匹配只有一个换行的方法
			removeMe(thisSign);
		}else{
			thisSign.style.fontSize='10px';
			thisSign.style.paddingLeft='12px';
			
		}
	}
	/* 	对于删除的签名挡，上方还有一条线和几个没用的换行需要清理 */
	allLines = xpathAll("//text()/parent::div[@class='mc']")
	//alert(allLines.snapshotLength);
	for(var i=0;i<allLines.snapshotLength;i++){
		thisLine = allLines.snapshotItem(i);
		thisLine.innerHTML = thisLine.innerHTML.replace(/<br><br><br>/g,"<br>");
		if(thisLine.innerHTML.indexOf("id=\"sign\"")==-1){
			thisLine.innerHTML = thisLine.innerHTML.replace("------------------------------------------------------------------------------------------- <br>","")
		}else{
			thisLine.innerHTML = thisLine.innerHTML.replace("------------------------------------------------------------------------------------------- <br>","<span class=\"greyline\">------------------------</span><br>")
		}
	}
	

//缩小个人信息的字体，解决了，也！
	infoDiv = xpathAll("//div[contains(text(),'来自：')]");
	for(var i=0;i<infoDiv.snapshotLength;i++){
		infoDivThis = infoDiv.snapshotItem(i);
		infoDivThis.style.fontSize="8px";
		infoDivThis.style.lineHeight="8px";
		}


/*将被删除的楼号重新和时间写在一起*/	
	pTime = xpathAll("//div[@class='p_time']")
	for(var i=0; i<pTime.snapshotLength; i++){
		orgStr = pTime.snapshotItem(i).innerHTML;
		newStr = "&nbsp;&nbsp;&nbsp;"+(i+1)+"F&nbsp;&nbsp;"+orgStr;
		pTime.snapshotItem(i).innerHTML = newStr;
	}
	
	/* 边栏清理*/
	allSideDivs = xpathAll("//div[parent::div[@id='right_content']]");
	docHref = window.location.href
	if (docHref.indexOf("topic_1_26_")>-1){// 汽车
		killList = ("1-2-3-5-6-7-9-10");
	} else if(docHref.indexOf("topic_1_")>-1){// KDS
		killList = ("1-2-3-4-5-7-8-9-11-14-15");
	} else if (docHref.indexOf("topic_6_")>-1){// 二手区
		killList = ("1-2-3-5-7-8");
	} else if (docHref.indexOf("topic_16_")>-1){// 汽车
		killList = ("1-2-3-5-6-7-9-10");
	} else if (docHref.indexOf("topic_10_")>-1){// 贴图
		killList = ("1-2-3");
	} else {//美院联盟/活动/etc
		killList = ("1-2-3-5-6-7-8-10-11");
	}
	killListArr=killList.split("-");
	//alert(killListArr.length);
	for(var i=0; i<allSideDivs.snapshotLength; i++){
		for(var j=0; j<killListArr.length; j++){
			if((i+1)==killListArr[j]){
				removeMe(allSideDivs.snapshotItem(i));
			}
		}
	}
	/* 给消息添加点击引用的功能 */
	allMc = xpathAll("//div[contains(@id,'Message')]");
	//alert(allMc.snapshotLength);
	for(var i=0; i<allMc.snapshotLength; i++){
		thisMc=allMc.snapshotItem(i);
		thisMc.addEventListener('dblclick', function(event){quoteThis(this)}, false); 
	}
}

/* 帖子列表页面*/
if(window.location.href.indexOf("forum_")>-1){

	document.title="和谐的PCHOME";

	/* 边栏清理*/
	allSideDivs = xpathAll("//div[parent::div[@id='right_content']]");
	docHref = window.location.href
	if(docHref.indexOf("forum_1_")>-1){// KDS
		killList = ("1-2-3-5-6-7-8-10-11");
	} else if (docHref.indexOf("forum_6_")>-1){// 二手区
		killList = ("1-2-3-5-7-8");
	} else if (docHref.indexOf("forum_2_")>-1){// 数码区
		killList = ("1-2-3-4-7-8-9");
	} else if (docHref.indexOf("forum_16_")>-1){// 汽车
		killList = ("1-2-3-5-6-7-9-10");
	} else if (docHref.indexOf("forum_10_")>-1){// 贴图
		killList = ("1-2-3");
	} else {//美院联盟/活动/etc
		killList = ("1-2-3-5-6-7-8-10-11");
	}
	killListArr=killList.split("-");
	//alert(killListArr.length);
	for(var i=0; i<allSideDivs.snapshotLength; i++){
		for(var j=0; j<killListArr.length; j++){
			if((i+1)==killListArr[j]){
				removeMe(allSideDivs.snapshotItem(i));
			}
		}
	}
	
	topic_type = xpath("//ul[@id='topic_type']");//页面底部图标说明
	removeMe(topic_type);
}
/*不准链接在新窗口打开*/
var outLinks, thisLink;
outLinks = xpathAll("//a[@target='_blank']");
if(outLinks){
	for (var i = 0; i < outLinks.snapshotLength; i++) {
		thisLink = outLinks.snapshotItem(i);
		thisLink.target="_top";
	}
}
/*给帖子页添加按键控制*/
if(window.location.href.indexOf("topic_")>-1){
	//根据按键控制上下页
	var navTopic = function(event){
		//var k = String.fromCharCode(event.which);	//代码转字符//n110 m109 b98 v118 p112 y121
		var k = event.which;
		//alert(k);
		if(disableKey=="FALSE"){
			if (k == "109"){
				topicNext();
			}
			if (k == "110"){
				topicPrev();
			}
			if (k == "118"){
				topicAll();
			}
			if (k == "98"){
				topicAuth();
			}
			if (k == "121"){
				topicLast();
			}
		}
	}
	document.addEventListener('keypress', navTopic, true);
	var disableKey = "FALSE";
	
	var textFocus = function(){
		disableKey = "TRUE";
		//alert(disableKey)
	}
	var textBlur = function(){
		disableKey = "FALSE";
		//alert(disableKey)
	}
	
	var topicNext = function(){
		if(nextLink){
			window.location.href = nextLink;
		}
	}
	var topicPrev = function(){
		if(prevLink){
			window.location.href = prevLink;
		}
	}
	var topicAuth = function(){
		if(authLink){
			window.location.href = authLink;
		}
	}
	var topicAll = function(){
		if (linkAll){
			window.location.href = linkAll;
		}
	}
	var topicLast = function(){
		if (lastLink){
			window.location.href = lastLink;
		}
	}
	
	var thisLink, nextLink, prevLink, authLink,linkAll;
	if (window.location.href.indexOf('topic_')>-1){
		thisLink = window.location.href;
		
		firstLink = xpath("//a[contains(text(),'<<')]");
		lastLink = xpath("//a[contains(text(),'>>')]");
		authLink = xpath("//a[contains(text(),'只看楼主')]");
	
		topicCode = thisLink.match(/.*\d{4,}(?=_\d{1,3}_+\.html|_*\.html|_*TRUE\.html|_*\d{1,3}_*TRUE\.html)/);
		if (thisLink.length==topicCode.length+5){
			thisLink = topicCode+"___.html"
		}
		//alert(topicCode);
		//alert(topicCode[0])
		if(thisLink.indexOf('TRUE')>-1){
			linkAll = topicCode+"___.html";
			//alert("楼主");
		}else if(thisLink == firstLink || thisLink == topicCode+"___.html" || thisLink == topicCode+"__.html" || thisLink == topicCode+".html"){
			nextLink = topicCode+"_2__.html"
			authLink = topicCode+"___TRUE.html"
			//alert("第一页")
		}else if(thisLink == lastLink){
			pageCode = thisLink.match(/\d{1,3}(?=_*\.html)/);	
			//alert(pageCode);
			prevLink = topicCode+"_"+(pageCode-1)+"__.html"
			authLink = topicCode+"___TRUE.html"
			//alert("最后页")
		}else{
			pageCode = thisLink.match(/\d{1,3}(?=_*\.html)/);
			//alert(pageCode);
			nextLink = topicCode+"_"+(parseInt(pageCode)+1)+"__.html"
			prevLink = topicCode+"_"+(pageCode-1)+"__.html"
			authLink = topicCode+"___TRUE.html"
			//alert("中间页")
		}
	}
	
	//给文本输入框添加触发器
	function initSetTextarea() {
		if (!document.getElementsByTagName){ return; }
		var allfields = document.getElementsByTagName("textarea");
		// loop through all input tags and add events
		//alert(allfields.length)
		for (var i=0; i<allfields.length; i++){
		//alert(allfields[i].id)
		//alert("ok");
			var field = allfields[i];
			//if ((field.getAttribute("type") == "text") || (field.getAttribute("type") == "password") ) {
				field.addEventListener('focus',textFocus,true);
				field.addEventListener('blur',textBlur,true);
			//}
		}
	}
	
	initSetTextarea();
}