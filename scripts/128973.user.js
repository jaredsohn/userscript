// ==UserScript==  
// @name         人人2B过滤器
// @author       IamSigma.js@gmail.com  
// @description  一个在你浏览人人网时，帮你隐藏“求关注”、“求回访”等与主题无关的垃圾评论的贴心小助手。(火狐版)
// @version	1.3.0
// @icon	http://g8up.cn/favicon.ico
// @match	http://*.renren.com/*
// @run-at	document-idle
// @downloadURL	https://userscripts.org/scripts/source/128973.user.js
// @updateURL	https://userscripts.org/scripts/source/128973.meta.js
// @homepage	http://g8up.com/chrome/update/RRSBfilter/?via=ff1.3.0
// @contributionURL	https://me.alipay.com/duxing
// @contributionAmount	￥1.00
// ==/UserScript== 
var len = 0 ; //本次扫描总数
var killedNum = 0;//本次sb
//词库目前不够智能，向误伤的孩纸表示哀怜，后续会更新成动态词库 -Sigma
var SBWORD = [
'互访', '求来访', '求关注', '求人气', '求围观', '求访', '访必回','互粉',
'关注我','互踩','刷人气','加好友','加我好友','求交往','求交友','请关注',
'速进','联系我','见状态','回访','欢迎来访',
'来看看吧','瘦身', '减肥','减重','淘宝兼职'
];
//堆积的高频无意义纯字符
var punctuations = ['\\.','·','。',',','，','`','…','0','1','2','3','='];

function killer(){
	var iKnowWhereSBsAre = '';
	var curURL = window.location.href.toLowerCase(),
		regPerson  = new RegExp(/http:\/\/www\.renren\.com\/\d{9}(((\?.*)?$)|((#.*)$))/),//首页
		regProfile = new RegExp(/http:\/\/www\.renren\.com\/\d{9}\/profile/);//个人主页
		regBlog    = new RegExp(/http:\/\/blog\.renren\.com\/blog\/\d{9}\/.+/),//个人日志
		regComment = new RegExp(/http:\/\/gossip\.renren\.com\/getgossiplist\.do\?id=\d{9}/),//留言板
		regPage    = new RegExp(/http:\/\/page\.renren\.com\/.+\/note\/\d+/), //公共主页日志
		regGroup   = new RegExp(/http:\/\/xiaozu\.renren\.com\/xiaozu\/\d+\/.+/);//小组
		regPhoto   = new RegExp(/http:\/\/page\.renren\.com\/\d{9}\/photo\//);//公共主页相册
		regZhan    = new RegExp(/http:\/\/zhan\.renren\.com\/.*/);//小站
		regShare   = new RegExp(/http:\/\/share\.renren\.com\/share\/\d{9}/);//分享
		regBShare  = new RegExp(/http:\/\/blog\.renren\.com\/share\/\d{9}/);//日志分享
		regPPhoto  = new RegExp(/http:\/\/photo\.renren\.com\/photo\/\d{9}/);//个人相册 added2012.10.13
		regeFdoing = new RegExp(/http:\/\/page\.renren\.com\/\d{9}\/fdoing/);//个人状态 added2012.10.13

	if(regPerson.test(curURL)){
		iKnowWhereSBsAre = {item:'.feed-replies .a-reply',cmt:'p.text'};
		_log('首页');
	}
	else if( regProfile.test( curURL ) ){
		iKnowWhereSBsAre = {item:'.feed-replies .a-reply',cmt:'p.text'};
		_log('个人主页');
	}
	else if( regPPhoto.test( curURL ) ) {
		iKnowWhereSBsAre = {item:'#commContainer dd',cmt:'p.content'};
		_log('个人相册');
	}
	else if( regeFdoing.test( curURL ) ) {
		iKnowWhereSBsAre = {item:'#comment_list dd',cmt:'p.content span'};
		_log('个人状态');
	}
	else if( regPage.test( curURL ) ) {
		iKnowWhereSBsAre = {item:'#commentlist li',cmt:'div.text-content'};
		_log('公共主页日志');
	}
	else if( regBShare.test( curURL ) ){
		iKnowWhereSBsAre = {item:'#cmtsListCon>div.replies>div:not([id="ilike"])>dl[id*="comment_list"]>dd',cmt:'p.content'};
		_log('日志分享');
	}
	else if( regBlog.test( curURL ) || regPhoto.test( curURL ) ){
		iKnowWhereSBsAre = {item:'div.replies dl.replies:not([id="ILike_Box"]) dd',cmt:'p.content'};
		_log('个人日志、公共主页相册');
	}
	else if( regShare.test( curURL ) ){
		// iKnowWhereSBsAre = {item:'div.replies div dl.replies dd',cmt:'p.content span'};
		//iKnowWhereSBsAre = {item:'#cmtsListCon div.replies div dl.replies dd',cmt:'p.content'};//操蛋，异步加载的评论不带<span />！FUCK！FUCK！FUCK！
		iKnowWhereSBsAre = {item:'#allCmtsList>div>dl[class="replies"]:not(:first-child)>dd',cmt:'p.content'};//视频分享
		//参考资料：http://www.w3.org/TR/css3-selectors/#negation
		_log('分享');
	}
	else if( regGroup.test( curURL ) ){
		iKnowWhereSBsAre = {item:'#topicList li',cmt:'div.content'};
		_log('小组');
	}
	else if( regZhan.test( curURL ) ){
		iKnowWhereSBsAre = {item:'.reply-list li',cmt:'span.comment-text'};
		_log('小站');
	}

	if( iKnowWhereSBsAre != ''){
		superKiller( iKnowWhereSBsAre );
		// setKilledNum( killedNum ); 
		loger(len);//日志输出
	}
}
/*
{
	item:containerId,容器id和item标签名，如'#comment_list dd'
	cmt:commentId  评论内容标签名，如'p.content span'
}
*/
function superKiller( json ){
	// _log('I\'m killing ...')
	try{
		var itemSelector = json.item,
			cmtSelector = json.cmt;

		var items = document.querySelectorAll( itemSelector );
		if( items ){
			len = items.length
			for( var i = 0 ; i < len ; i ++ ){
				var item = items[i];
				if ( item.getAttribute("rrsb") != 1 ) {
					var	cmt = item.querySelector( cmtSelector ).innerHTML;
					if( filter( cmt ) ){
						howToTreatSB( item , i , cmt );
					}
				}
				item.setAttribute("rrsb",1);//标记处理
			}
		}
	}catch( e ){
		var url = encodeURIComponent( window.location.href ),
			error =  encodeURIComponent( e.toString() );
		new Image().src = "http://duxing.sinaapp.com/chrome/update/RRSBfilter/infocenter.php?url=" + url + "&error=" + error;
	}
}

function filter ( cmt ) {
	var _cmt = trim (cmt),
		comm = getChinese( _cmt );
	if (comm == '') {//没有中文
		return punctuationFilter( _cmt );
	}
	for (var d = 0,	l = SBWORD.length; d < l; d++) {//扫描屏蔽词
		if (comm.indexOf(SBWORD[d]) >= 0) {
			return true;
		}
	}
	return false;
}

function punctuationFilter( cmt ){//过滤符号堆积的评论
		var comm = filtChinese( cmt );
		if( comm == '' ){
			return false;
		}
		for (var i = 0 ; i < punctuations.length; i++) {
			var reg = new RegExp( punctuations[i] + "+");
			if(comm.replace( reg , '') == ''){
				return true;
			}
		}
		return false;
}

function howToTreatSB( SBNode , i , cmt ){
	var n = 30 ,
		tBlur  = setInterval(function(){
		n--;
		SBNode.style.opacity = (n/100)+'';
		if(n==6){
			clearInterval( tBlur );
		}
	},400);
	killedNum ++;
	_log( i + 'sb:' + trim(cmt));
}

function loger ( len ) {
	console.log('【人人2B过滤器1.3.0(火狐版)\'s log】');
	console.log('当前地址：' + window.location.href);
	console.log('扫描个数：' + len);
	console.log('本次 SB ：' + killedNum + '头');
	console.log('用户反馈：http://rrurl.cn/hM9mhk');
	console.log('执行时刻：' + getTime() + '\n');
}

function _log( msg ){
	console.log( 'rrsb:' + msg );
}

function getTime() {
	var str = '',
	d = new Date(),
	h = d.getHours(),
	m = d.getMinutes(),
	s = d.getSeconds();
	str = h + ':' + (m < 10 ? '0' + m: m) + ':' + (s < 10 ? '0' + s: s );
	return str;
}
function trim( str ) {     
     return str.replace( /(^\s*)|(\s*$)/g , "" );
}
function getChinese( str ) {
     return str.replace( /[^\u4e00-\u9fa5]+/g , "" );
}
function filtChinese( str ){
	return str.replace( /[\u4e00-\u9fa5]+/g , "" );
}

killer();	
