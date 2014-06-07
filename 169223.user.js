// ==UserScript==
// @name    URI
// @author s896221565
// @description  URI
// @create 2013
// @version 2013.6.01
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        *

// ==/UserScript==
////////////////////反盗链规则
/*规则格式：
	refererlist=[
		{"name":"string",
		 "includeURI":/Regexp/,
		 "exclude":/RegExp/,
		 "Specific":"string"}, PS:此处如果是"-"代表移除referer元素
		 ...
		 ]
*/
var refererlist = [ //下面规则可以按上面提示添加，
    //原规则大部分来自Firefox扩展mason，部分自己收集
    {"name": "Pixiv",
        "includeURI": /\.pixiv\.net/,
        "excludeURI": /member_illust\.php/,
        "Specific": ""},
    {"name": "百度图片",
        "includeURI": /(imgsrc|hiphotos)\.baidu\.com/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "百度空间",
        "includeURI": /bdimg\.com/,
        "excludeURI": null,
        "Specific": "http://hi.baidu.com"},
    {"name": "新浪博客1",
        "includeURI": /(photo|album)\.sina\.com\.cn/,
        "excludeURI": null,
        "Specific": "http://blog.sina.com.cn"},
    {"name": "新浪博客2",
        "includeURI": /http:\/\/s\d{1,2}\.sinaimg\.cn\//,
        "excludeURI": null,
        "Specific": "http://blog.sina.com.cn"},
    {"name": "163图片",
        "includeURI": /img\d{0,9}\.(bimg\.126\.net|(?:photo|blog)\.163\.com)/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "56.com",
        "includeURI": /photo\.56\.com/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "flickr.com",
        "includeURI": /flickr\.com/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "网易论坛",
        "includeURI": /img.*(126\.net|163\.com)/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "太平洋电脑",
        "includeURI": /img\d*\.pconline\.com\.cn/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "pcgame.com.cn",
        "includeURI": /pcgames\.com\.cn/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "搜狐",
        "includeURI": /pp\.sohu\.com(\.cn)?/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "中关村在线",
        "includeURI": /zol\.com\.cn/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "QQ相册",
        "includeURI": /(photo\.store\.qq|qtimg)\.com/,
        "excludeURI": /qzone\.qq\.com/,
        "Specific": ""},
    {"name": "搜搜图片",
        "includeURI": /pic\.wenwen\.soso\.com/,
        "excludeURI": null,
        "Specific": "http://www.soso.com/"},
    {"name": "VeryCD",
        "includeURI": /verycd\.com/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "51.com",
        "includeURI": /images\d{0,2}\.51\.com/,
        "excludeURI": null,
        "Specific": ""},
    {"name": "雨林木风",
        "includeURI": /www\.ylmf\.net/,
        "excludeURI": null,
        "Specific": ""},
     {"name": "photobucket",
        "includeURI": /\.photobucket\.com/,
        "excludeURI": null,
        "Specific": ""},
	{"name": "imgur",
		"includeURI": /imgur\.com/,
		"excludeURI": null,
		"Specific": ""},
	{"name": "萌妹",
		"includeURI": /\.imouto\.org/,
		"excludeURI": null,
		"Specific": ""},
	{"name": "异次元",
		"includeURI": /img\.ipc\.me/,
		"excludeURI": null,
		"Specific": "http://www.iplaysoft.com"},
	{"name": "PhotoBucket",
		"includeURI": /\.photobucket\.com/,
		"excludeURI": null,
		"Specific": ""},
	{"name": "观看QQ源视频",
		"includeURI": /vsrctfs\.tc\.qq\.com/,
		"excludeURI": null,
		"Specific": ""},
	{"name": "56源视频",
		"includeURI": /\.56\.com/,
		"excludeURI": null,
		"Specific": "-"},
	{"name": "tuita",
		"includeURI": /img\d\.tuita\.cc/,
		"excludeURI": null,
		"Specific": ""},
	{"name": "煎蛋网图片",
		"includeURI": /tankr\.net\/s\/medium/,
		"excludeURI": null,
		"Specific": ""},
	{"name": "isnowfy",
		"includeURI": /\/\/www\.isnowfy\.com/,
		"excludeURI": null,
		"Specific": ""},
  /*{"name": "youku",
		"includeURI": /v\.youku\.com/,
		"excludeURI": null,
		"Specific": "-"},*/
];

///////////////////广告过滤白名单 (正则表达式数组)
/*格式：[/Regexp/,/RegExp/]
  一些列子：(\/\/|\.)valf\.atm\.youku\.com\/crossdomain\.xml 相当于 ||valf.atm.youku.com/crossdomain.xml
	    其中(\/\/|\.)是为了匹配||模式，即匹配*://valf....或*://*.valf....但不匹配*://abcvalf....

*/
var whitelist = [/(\/\/|\.)analytics\.163\.com\/ntes\.js/,/(\/\/|\.)static\.atm\.youku\.com.*\.swf/,/(\/\/|\.)valf\.atm\.youku\.com\/crossdomain\.xml/,/(\/\/|\.)js\.tudouui\.com\/bin\/player/];
whitelist.push(/(\/\/|\.)valf\.atm\.youku\.com\/valf\?/);
whitelist.push(/\/\/td\.atm\.youku\.com\/crossdomain\.xml/);
///////////////////广告过滤规则 (正则表达式数组)
var blacklist=[/\/\/secure\.gaug\.es/,/\/\/stat\.ku6\.com/,/\/\/gug\.ku6cdn\.com/,/\/\/.*\.snyu\.com/,/\/\/dcads\.sina\.com\.cn/,/(\/\/|\.)log\.vdn\.apps\.cntv\.cn/,/\/\/d\.cntv\.cn\/crossdomain\.xml/,/(\/\/|\.)acs86\.com/,/\/\/86file\.megajoy\.com/,/(\/\/|\.)ugcad\.pps\.tv/,/(\/\/|\.)stat\.ppstream\.com/,/(\/\/|\.)player\.pplive\.cn.*\/PPLivePlugin\.swf/,/(\/\/|\.)mat1\.gtimg\.com\/ent\/flash/,/(\/\/|\.)mat1\.gtimg\.com\/sports\/.*ad/,/\/\/adslvfile\.qq\.com/,/(\/\/|\.)56\.com\/cfstat/,/(\/\/|\.)56\.com\/flashApp\/ctrl_ui_site\/pause_ad_panel\//,/(\/\/|\.)56\.com\/js\/promo\//,/(\/\/|\.)stat\.56\.com/,/(\/\/|\.)v-56\.com/,/\/\/acs\.56/,/(\/\/|\.)letv\.allyes\.com/,/(\/\/|\.)dc\.letv\.com/,/(\/\/|\.)pro\.hoye\.letv\.com/,/(\/\/|\.)js\.letvcdn\.com\/js\/.*\/stats\//,/(\/\/|\.)player\.letvcdn\.com\/p\/.*\/pb\/pbTip\.swf/,/(\/\/|\.)letvimg\.com\/gugwl\//,/(\/\/|\.)img1\.126\.net/,/(\/\/|\.)img2\.126\.net/,/(\/\/|\.)stat\.ws\.126\.net/,/(\/\/|\.)adgeo\.163\.com/,/(\/\/|\.)g\.163\.com\/.*&affiliate=/,/(\/\/|\.)popme\.163\.com/,/(\/\/|\.)ifengimg\.com\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.swf/,/(\/\/|\.)games\.ifeng\.com\/webgame\//,/(\/\/|\.)img\.ifeng\.com\/tres\/html\//,/(\/\/|\.)img\.ifeng\.com\/tres\/ifeng\//,/(\/\/|\.)img\.ifeng\.com\/tres\/market\//,/(\/\/|\.)play\.ifeng\.com\/resource_new\/js\/playbox\.js/,/(\/\/|\.)sta\.ifeng\.com/,/(\/\/|\.)stadig\.ifeng\.com/,/(\/\/|\.)ifengimg\.com\/ifeng\/ad\//,/(\/\/|\.)ifengimg\.com\/ifeng\/sources\//,/(\/\/|\.)ifengimg\.com\/mappa\//,/\/\/w\.cnzz\.com\/c\.php/,/(\/\/|\.)qq\.com\/livemsg\?/];
blacklist.push(/\/\/xiu\.56\.com\/xapi\/offsite_swf_more\.php\?ver=4/);//56
//blacklist.push(/\/\/202\.112\.24\.186.*\/PushWeb/,/\/\/res\.nie\.netease\.com/,/\/\/js\.tongji\.linezing\.com/);
/*搜狐广告*/
blacklist.push(/(\/\/|\.)itc\.cn.*\/tracker\.js/,/(\/\/|\.)txt\.go\.sohu\.com\/ip\/soip/,/(\/\/|\.)xls\.go\.sohu\.com/,/(\/\/|\.)images\.sohu\.com\/bill\//,/(\/\/|\.)images\.sohu\.com\/cs\//,/(\/\/|\.)js\.sohu\.com\/track\//,/(\/\/|\.)js\.sohu\.com\/wrating0820\.js/,/(\/\/|\.)news\.sohu\.com\/upload\/article\/2012\/images\/swf\//,/(\/\/|\.)z\.t\.sohu\.com/,/(\/\/|\.)imp\.go\.sohu\.com/,/(\/\/|\.)images\.sohu\.com\/ytv\//,/(\/\/|\.)mfiles\.sohu\.com\/tv\/csad\//,/(\/\/|\.)tv\.sohu\.com\/upload\/static\/global\/hdpv\.js/,/(\/\/|\.)tv\.sohu\.com\/upload\/trace\//,/(\/\/|\.)p\.aty\.sohu\.com/,/(\/\/|\.)vm\.aty\.sohu\.com/,/(\/\/|\.)v\.blog\.sohu\.com\/dostat\.do\?/,/(\/\/|\.)his\.tv\.sohu\.com\/his\/ping\.do\?/,/(\/\/|\.)count\.vrs\.sohu\.com/,/(\/\/|\.)data\.vrs\.sohu\.com\/player\.gif?/,/(\/\/|\.)hd\.sohu\.com\.cn/);
/*百度广告*/
blacklist.push(/(\/\/|\.)cb\.baidu\.com/);
blacklist.push(/(\/\/|\.)cbjs\.baidu\.com/);
blacklist.push(/(\/\/|\.)cpro\.baidu\.com/);
blacklist.push(/(\/\/|\.)drmcmm\.baidu\.com/);
blacklist.push(/(\/\/|\.)duiwai\.baidu\.com/);
blacklist.push(/(\/\/|\.)eclick\.baidu\.com/);
blacklist.push(/(\/\/|\.)eiv\.baidu\.com/);
//blacklist.push(/(\/\/|\.)hm\.baidu\.com/);
blacklist.push(/(\/\/|\.)nsclick\.baidu\.com/);
blacklist.push(/(\/\/|\.)sclick\.baidu\.com/);
blacklist.push(/(\/\/|\.)spcode\.baidu\.com/);
/*土豆广告*/
blacklist.push(/(\/\/|\.)tudou\.com.*\/outside\.php/);
blacklist.push(/(\/\/|\.)player\.pb\.ops\.tudou\.com\/info\.php\?/);
blacklist.push(/(\/\/|\.)stat.*\.tudou\.com/);
/*优酷广告规则*/
blacklist.push(/(\/\/|\.)l\.ykimg\.com/);
blacklist.push(/(\/\/|\.)p-log\.ykimg\.com/);
blacklist.push(/(\/\/|\.)e\.stat\.ykimg\.com\/red\//);
blacklist.push(/(\/\/|\.)atm\.youku\.com/);
blacklist.push(/(\/\/|\.)hz\.youku\.com\/red\//);
blacklist.push(/(\/\/|\.)lstat\.youku\.com/);
blacklist.push(/(\/\/|\.)e\.stat\.youku\.com/);
blacklist.push(/(\/\/|\.)l\.youku\.com.*log\?/);
blacklist.push(/(\/\/|\.)t\.stat\.youku\.com/);
blacklist.push(/(\/\/|\.)static\.youku\.com\/.*\/js\/cps\.js/);
blacklist.push(/(\/\/|\.)static\.youku\.com\/.*\/index\/js\/hzClick\.js/);
blacklist.push(/(\/\/|\.)static\.youku\.com\/.*\/index\/js\/iresearch\.js/);
//blacklist.push(/(\/\/|\.)f\.youku\.com\/player\/getFlvPath\/fileid\//);

/*爱奇艺规则*/
blacklist.push(/(\/\/|\.)msg\.iqiyi\.com/);
blacklist.push(/(\/\/|\.)afp\.qiyi\.com/);
blacklist.push(/(\/\/|\.)static\.qiyi\.com\/js\/pingback\//);
blacklist.push(/(\/\/|\.)jsmsg\.video\.qiyi\.com/);
blacklist.push(/(\/\/|\.)msg\.video\.qiyi\.com/);
blacklist.push(/(\/\/|\.)uestat\.video\.qiyi\.com/);
//blacklist.push(/\/\/pic\d\.qiyipic\.com\/crossdomain\.xml/);
//blacklist.push(/(\/\/|\.)data\.video\.qiyi\.com\/videos\/other\//);
//blacklist.push(/\/\/api\.cupid\.qiyi\.com/);

/* 优酷播放器地址 */
var yk1="http://lovejiani.duapp.com/opengg/player_ss.swf";
var yk2="https://haoutil.googlecode.com/svn/trunk/youku/player.swf";
var yk3="http://player.opengg.me/player.swf";
var ykext="?showAd=0&VideoIDS=$2";//外链参数

if(localStorage["ykplayer"]==undefined)//默认使用bae
	localStorage["ykplayer"]=yk1;

//URL重定向规则(用于替换优酷播放器、去除google重定向等功能)
/*格式：
	name:规则名称
	find:匹配(正则)表达式
	replace:替换(正则)表达式
	extra:额外的属性,如adkillrule代表是去广告规则
*/
var redirectlist=[
		{name:"替换优酷播放器",//请勿在此条规则前加入其他规则
		find:/^http:\/\/static\.youku\.com\/.*?q?(player|loader)(_[^.]+)?\.swf/,
		replace: localStorage["ykplayer"],
		extra:"adkillrule"
		},
		{name:"替换优酷外链播放器",//请勿在此条规则前加入其他规则
		find: /^http:\/\/player\.youku\.com\/player\.php\/(.*\/)?sid\/([\w=]+)\/v\.swf/,
		replace: localStorage["ykplayer"]+ykext,
		extra:"adkillrule"
		},
		{name:"替换ku6播放器",
		find: /^http:\/\/player\.ku6cdn\.com\/default\/common\/player\/\d*\/player\.swf/,
		replace: 'http://lovejiani.duapp.com/antiad/ku6.swf',
		extra:"adkillrule"
		},
		/*{name:"替换爱奇艺播放器",
		find: /^http:\/\/www\.iqiyi\.com\/player\/\d+\/Player\.swf/,
		replace: 'http://lovejiani.duapp.com/player/iqiyi.swf',
		extra:"adkillrule"
		},*/
		{name:"qy重定向",
		find: /^http:\/\/www\.iqiyi\.com\/player\/[a-z0-9]{7,}\.swf/,
		replace: "http://www.iqiyi.com/player/vrs/20120620132333/1cc81e80-74ba-45f0-8a44-928268bab799.swf",
		extra:"adkillrule2"
		},
		{name:"td重定向",
		find: /^http:\/\/td\.atm\.youku\.com\/tdcm\/adcontrol/,
		replace: "http://www.tudou.com/util/tools/www_hd.txt",
		extra:"adkillrule2"
		},
		{name:"pl重定向",
		find: /(\/\/|\.)player\.pplive\.cn.*\/PPLivePlugin\.swf/,
		replace: "about:blank",
		extra:"adkillrule2"
		},
		{name:"去除google重定向",
		find:/^https?:\/\/www\.google\.com.+&url=.*?([^&]+).*/,
		replace:"$1",
		extra:"ggredirectrule"
		}
	];


//当前不去广告的tab
var whitetab=[];
//存放当前阻挡的url
var blockurls=[];//示例:blockurls["tabid6"]=["sd","sdf"];
//探测到的媒体文件的url
var mediaurls=[];//示例:mediaurls["tabid6"]=[{name:"aa",url:"sd",size:"0.12MB"},{name:"bb",url:"sdf",size:"1.32MB"}];