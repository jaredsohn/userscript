// ==UserScript==
// @name           HC_GetOutOfLadyForum
// @namespace      http://my.hoopchina.com/358/
// @description    keep you from getting in Lady forum
// @include        http://bbs.hoopchina.com/*
// @copyright     2009, totu
// @version        1.0
// ==/UserScript==

//---------------------------------------------------------------------------------------------------
//说明：
//目的：伊人之间是 HoopChina 的女性论坛，男士为避免误入，可安装此脚本。
//脚本行为：
//	1. 通过检测 URL 判断当前页面是否为伊人之间版块
//	2. 通过检测 Title 和 meta 判断当前页面是否为伊人之间帖子
//	3. 若 1 或 2 为真，在当前页面显示警示信息，并跳转到步行街版块
//注意：
//	1. 此脚本目前适用于 HoopChina 新版，尚未针对旧版进行测试
//---------------------------------------------------------------------------------------------------

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getOut(){
	addGlobalStyle('table { font-size: large ! important; color: red ! important;}');
	var strHtmlOut = '<table id="content" align="center"><tr><td>JRS,要切记</td></tr>' + '<tr><td>女更衣室是禁地！</td></tr>' + '<tr><td>臭男人,滚出去</td></tr>' + '<tr><td>否则对你不客气！</td></tr>' + '<tr><td><img src="http://i3.6.cn/cvbnm/77/b4/13/276d76eea2594e0a7a69ced55094ea2b.jpg"></img></td></tr></table>';
	var strBlind = '<table id="content"><tr><td>啊啊啊!!!瞎了我的狗眼!!</td></tr>' + '<tr><td>快逃!</td></tr>' + '<img src="http://i3.6.cn/cvbnm/7c/bc/54/01aad2e26dfe06097d66e7b923c147e3.jpg"></img></td></tr></table>';
	window.setTimeout(function() { document.body.innerHTML = strHtmlOut; }, 2000);
	window.setTimeout(function() { document.body.innerHTML = strBlind;}, 4000);
	window.setTimeout(function() { window.location.href = "http://bbs.hoopchina.com/bxj?fboardl";}, 6000);
	
}

function checkForumURL(){
	var thisURL = window.location.href;
	var LadyForumURLPatrn = "http:\/\/bbs\.hoopchina\.com\/lady\w*";
	var reg = new RegExp(LadyForumURLPatrn, "g");
	if(reg.exec(thisURL)){
		getOut();
	}
}


function checkArticleHCNewVer(){
	
	var invalidTitle = 0;
	var invalidkwMeta = 0;
	var invalidDescMeta = 0;
	
	var thisTitle = document.title;
	var LadyForumTitlePatrn = "-\\s*\u4f0a\u4eba\u4e4b\u95f4\\s*-\\s*\u864e\u6251\u4f53\u80b2$";	// "- 伊人之间 - 虎扑体育"
	var regTitle = new RegExp(LadyForumTitlePatrn, "g");
	if(regTitle.exec(thisTitle)){
		invalidTitle = 1;
	}
	
	var LadyForumkwMetaPatrn = ",\u4f0a\u4eba\u4e4b\u95f4$";	// ",伊人之间"
	var regkwMeta = new RegExp(LadyForumkwMetaPatrn, "g");
	var kwMetas = document.evaluate(
	"//meta[@name='keywords']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i = 0; i < kwMetas.snapshotLength; i++) {
		var thiskwMeta = kwMetas.snapshotItem(i);
		if(regkwMeta.exec(thiskwMeta.content)){
		invalidkwMeta = 1;
		}
	}
	
	var LadyForumDescMetaPatrn = "\u6765\u81ea\u864e\u6251\u4f53\u80b2\u8bba\u575b\u7684\u4f0a\u4eba\u4e4b\u95f4\.$";	// "来自虎扑体育论坛的伊人之间."
	var regDescMeta = new RegExp(LadyForumDescMetaPatrn, "g");
	var descMetas = document.evaluate(
	"//meta[@name='description']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i = 0; i < descMetas.snapshotLength; i++) {
		var thisDescMeta = descMetas.snapshotItem(i);
		if(regDescMeta.exec(thisDescMeta.content)){
		invalidDescMeta = 1;
		}
	}
	
	if(invalidTitle && invalidkwMeta && invalidDescMeta){
		getOut();
	}
}

checkForumURL();
checkArticleHCNewVer();

