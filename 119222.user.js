// ==UserScript==
// @name          GoogleKingKongR
// @namespace     http://userstyles.org
// @description	  改善 Google 的搜索结果界面，提高阅读效率
// @author        SUCCESS/modified by gsky916
// @version	 5.6.12
// @updateURL       https://userscripts.org/scripts/source/119222.meta.js
// @downloadURL   https://userscripts.org/scripts/source/119222.user.js
// @include       http://www.google.*/search*
// @include       http://www.google.*/*#*
// @include       https://www.google.*/*#*
// @include       https://www.google.*/search*
// @include       https://encrypted.google.com/search*
// @exclude      https://www.google.*/search*&tbm=isch*
// @exclude      https://www.google.*/search*&tbm=shop*
// @exclude      https://encrypted.google.com/search*&tbm=isch*
// @exclude      https://encrypted.google.com/search*&tbm=shop*


// ==/UserScript==
/* 更新记录 ***********************************************************************
 部分修改 by gsky916
 【2013.8.20】
 修正：宽屏排版问题。
 【2013.6.21】
 修正：修复右侧栏位置问题。
 修正：以图搜图第一页之后分栏失效的问题。 
 【2013.6.10】
 修正：如果搜索结果页有地图，会出现排版错乱的问题。 
 【2013.6.2】
 修正：调整google右侧边栏位置解决重叠问题。
 修正：修复“在此站点搜索”功能。
 【2013.4.29】
 修正：修正“类似搜索查询结果”造成的排版问题。
 【2013.3.23】
 修正：自动翻页至第二页出错（即自动翻页只能到第二页的问题）。
 修正：自动翻页时博客条目缩略图不能显示的问题。
 【2012.12.10】
 修正：视频条目改版后缩略图失效和链接拆断的问题。
 修正：调整以图搜图页面排版，解决多分栏条目重叠问题。
 修正：统一网页、视频、新闻页面的百宝箱工具栏位置。
 修正：修复部分搜索条目标题下划线不能显示的问题。
 【2012.11.23】
 修正：google左侧边栏改版所导致的脚本失效。
 修正：隐藏自动加载下一页中的相关搜索和相关服务条目。
 修正：图片信息所产生的排版问题。
 新增：GM支持的脚本自动更新功能。
 注：原GKK的更新功能应该能继续协同工作，如果原作者恢复更新将自动更新回到原版。
 【2012.8.7】
 修正：部分”在此站点中搜索”无法显示的问题。
 注：此修改可能仅适用于中文界面下，目前看来英文界面已经完全改版。
 【2012.3.18】
 修正：以图搜图的部分排版问题。
 【2012.3.17】
 修正：使用google搜索地区,机构,公用设施,etc. 时自动生成地图信息所产生的排版问题。
 【2012.2.27】
 修正：以图搜图结果直接点击图片会跳转回主页的问题。
 【2012.1.13】
 修正：搜索结果的地址为https开头时，“在此站点中搜索”无法搜索正确域名的问题。
 修正：针对google近期的页面调整进行微调避免部分功能失效。
 【2012.1.11】
 修正：微调CSS尝试解决部分情况下分栏内容互相重叠的问题。
 注：这类问题主要是由于浏览器窗口宽度限制导致的。
 在窗口分辨率足够大的情况下即便不作调整也不会有问题，反之如果想在一个800X600的窗口下开启分3栏，那么无论如何也很难调整出好的效果。
 【2012.1.7】
 修正：之前修改导致视频、新闻页面无法自动翻页的错误。
 修正：隐藏视频、新闻搜索页自动翻页后每页重复的的邮件提醒条目。
 【2012.1.6】
 修正：相关搜索结果“消失”的问题。
 修正：新闻、博客等条目移到页面上方时视频和新闻标题错乱的问题。
 修正：新闻、博客等条目框架关键字包含 HTML 标签文字时产生的问题（偶然发现，以前和Z大提过并修复了类似的问题，当时未发现此处）
 【2011.11.27】
 修正：相关搜索结果CSS设置失效的问题
 【2011.11.20】
 修正：自动翻页问题
 修正：新版google宽版布局问题
 修正：屏蔽preview，恢复网页快照链接（美国访问无快照链接，国内访问尚无此问题）
 修正：“在此站点搜索”无法使用的问题（同上，美国问题）
 修正：新闻、博客等条目移到页面上方失效的问题。
 修正：使用横向多列布局时，新闻、博客等条目移到页面上方导致页面错乱的问题。
 修正：自动翻页第1页之后视频和图片搜索结果无法显示缩略图的问题（总算解决了，Z大还在时就留下来的陈年老BUG，类牛满面）
 修正：自定义搜索跳转和百宝箱开关显示不正常的问题。
 修正：GKK设置链接不能显示的问题。
 修正：启用“禁止Google记录我的点击情况”后点击图片结果跳转到主页的问题(imgurl=http)。
 修正：其它一些小细节。

【尚存在的问题】
尚未处理的部分，证实有问题的：
 1. 显示站点favicon（部分站点显示不出），
 2. 网页preview图片（全部无法显示），
 oojeoo同学对这2个问题做了部分修改，但我这里测试之后发现一些情况下仍存在比较严重的问题，会导致页面错乱或者无法自动翻页，gkk设置失踪等。
 我个人从不使用这2个功能，因此搁置了，问题留给其它大牛吧。

其它未验证的：
包括浮动搜索框、快捷键定位、标示序列号等功能都未测试，个人从来不用，是否正常不清楚。

【CSS部分】
关于自定义CSS部分：appbar , resultStats, 等处的css受分辨率和浏览器页面缩放等影响较大，不具备通用性，放入自定义CSS调整。

【其它补充】
由于google针对不同浏览器类型，不同UA版本，不同访问地区（国内访问/使用VPN访问），不同语系（英语显示/中文显示）进行了区分式的设计。不同的设计方案之间有时差异很大，google的这种做法客观上导致维护负担的剧增。我个人的修改版仅在最新正式版Firefox+ 中文显示的情况下进行了测试。不能肯定其它的情形下脚本的正常运行。
修改过程中使用了mozest论坛skofkyo同学的部分css，使用了oojeoo同学对GKK设置按钮的修改，以及参看了googlemonkeyR的部分代码，感谢为gkk付出劳动的同学们！

 ***********************************************************************
 【2010.10.3】 更新 V5.6
     修正： 搜索框固定在页面顶部或底部时，导航条中“更多”点击后显示空白的问题
     修正： Chrome 下几处显示错位的问题。
 【2010.6.26】 更新 V5.5
     增加： 允许关闭左侧的百宝箱。（设置界面中有选项）
     修正了若干错误。
 【2010.5.7】 更新 V5.4
     增加： 设置是否将新闻、博客等条目移到页面上方。
     修正： Google UI改版引起的问题。
 【2010.4.18】 更新 V5.3
     增加： 自定义快捷键定位到下/上一页。
     修正： 相关搜索提示部分的 CSS 设定失效的问题。
     修正： 完善了增强获取缩略图的逻辑。
     修正： CSS 样式设置中颜色选择器有时不能正确生成颜色值的问题。
     修正： 其他几个细节问题。
     初步支持 Chrome。
     已知在 Chrome 中有如下问题：
          1、不能加载来源于百度的相关搜索提示
          2、不能在自定义搜索引擎中使用编码为 GB2312 的关键字
          3、勉强支持脚本的自动检查更新
     由于 Chrome 禁止页面脚本的跨域访问，所以目前上述1、2两项无解，3项有近似解。除了做成扩展还有其他办法吗？
 【2010.3.31】 更新 V5.2
     增加： 自动加载下一页后，document 会抛出 GKK_NextPageLoaded 事件，方便和其他脚本的配合。
     修改： 允许搜索结果条目的缩进。
     修正： 相关搜索提示如果来自百度的话，显示不正常的问题。
 【2009.10.15】 更新 V5.1
     增加： 允许将相关搜索移到页面上部。
     增加： 可以设置相关搜索的样式。
     修正： 若干细节问题。
 【2009.9.25】 更新 V5.0
     修正： 搜索框不能浮动在页面顶部的问题。
 【2009.9.25】 更新 V4.9
     修正： 无法打开设置界面的问题。
 【2009.8.18】 更新 V4.8
     修正： 更新 4.7 版后无法显示“关于xx的。。。”的问题。
 【2009.8.16】 更新 V4.7
     修正： 3.0 版 Firefox 无法打开设置界面的问题。
 【2009.8.08】 更新 V4.6
     增加： 增强获取缩略图的能力。不过一般不用开启此功能。
     修正： 可以正常处理 URL 中包含 # 的页面了。
     修正： @ # $& = : / ; ? + ' 当关键字包含这些字符时，用其他搜索引擎搜索会不正常的问题。
     再次增加： 快捷键定位到搜索框后允许全部选中文本。
     其他一些小的修改。
 【2009.6.11】 更新 V4.5
     修正： 提高与某些脚本如 Display original image 的兼容性。
     修正： google 小改版后，不能显示设置按钮的问题。
 【2009.5.27】 更新 V4.4
     修正： 在没有百宝箱功能的google上无法打开设置界面的问题。
 【2009.5.25】 更新 V4.3
     增加： 自动检查新版本。不用像之前那样要打开设置界面才检查了。
 【2009.5.24】 更新 V4.2.1
     修正： 与百宝箱的时光隧道功能的兼容问题。
 【2009.5.22】 更新 V4.2
     修正： 与百宝箱功能的兼容问题。
     增加： 允许百宝箱固定在页面左侧。
 【2009.5.1】 更新 V4.1
     增加： 允许隐藏自动翻页分隔符。
     增加： 允许显示站点 favicon。
     其他一些小的修改。
 【2009.4.15】 更新 V4.0
     修正： 搜索关键字包含 HTML 标签文字时产生的问题。
 【2009.2.26】 更新 V3.9
     修正： 翻页提示符显示错位的问题。
 【2009.2.10】 更新 V3.8
     修正： 不能正确处理“类似网页”搜索结果页面的问题。
     修正： 如果不选中“自动加载下一页”，打开设置界面再取消时仍然加载第二页的问题。
   改进了排版对齐的处理方式和判断是否应该加载下一页的方式，现在滚动页面时比以前更流畅了。
     其他一些小的修改。
 【2009.1.15】 更新 V3.7
     修正： 3.6版后某些情况下会卡死的问题。
 【2009.1.14】 更新 V3.6
     修正： 由于 userscripts.org 页面变化导致的自动检查更新功能失效的问题。
     修正： 2.5版后“约有xx项查询结果”那一行背景色消失的问题。
     修正： 2.8版后 searchwiki 功能失效的问题。已知的 bug：只有第一页 searchwiki 有效，自动翻页的无效。
     增加： 允许搜索框固定在页面顶部或底部。
     增加： 配置界面对英文、繁体中文的支持。
     重写部分代码，提高处理速度。
     其他一些小的修改。
 【2008.12.30】 更新 V3.5
     修正： 谷歌新增的足球 Onebox 功能不能显示的问题。
   优化代码，提高处理速度。
 【2008.12.27】 更新 V3.4
     修正： 如果设置了 CSS 中“条目”的 padding-top 和 padding-bottom ，可能导致排版无法对齐的问题。
     修正： CSS 中颜色选择器不能正确关闭的问题。
   优化代码，提高处理速度。
 【2008.12.25】 更新 V3.3
   优化一点代码，提高处理速度。
 【2008.12.25】 更新 V3.2
   优化一点代码，提高处理速度。
 【2008.12.24】 再更新 V3.1
     修正： 排版模式有时不能对齐的问题。
 【2008.12.24】 更新 V3.0
   发布到 userscripts 上，启用自动检查更新功能。
   一些细节的改进。
 【2008.12.21】 更新 V2.9
     修正：  某些站内搜索时，自动翻页的内容乱码的问题。
   一些细节的改进。
 【2008.12.16】 更新 V2.8
     修正：  解决与英文 Google 新增的 searchwiki 功能的冲突。
   已知的问题： 应用脚本后，searchwiki 功能将失效。
 【2008.12.15】 更新 V2.7
     修正： 右侧广告错位的问题。
 【2008.12.14】 更新 V2.6
   添加的其他搜索引擎按顺序显示，需要 GB 编码的链接不再添加到最后了。
 【2008.12.13】 更新 V2.5
   “约有xx项查询结果”那一行如果过宽，就折到两行，避免撑开屏幕
   一些细节的改进。
 【2008.12.10】 更新 V2.4
     修正： CSS 设置区图片取色不正确的问题。
 【2008.12.10】 更新 V2.3
     增加： 其他搜索引擎允许使用 GB2312 编码。
   一些细节的改进。
 【2008.12.09】 更新 V2.2
   修改了设置界面中效果预览的变化规则，能够更准确反映 CSS 的变化。
     增加： 快捷键定位到搜索框后，允许选择清除全部文字或者光标紧跟在文字之后。
 【2008.12.08】 更新 V2.1
     修正： 如果定义了单按键定位到搜索框，就无法在搜索框中使用该按键的问题。
     增加： 自动加载下一页时有提示。
     增加： 允许选择在新页面或当前页打开其他搜索引擎。
 【2008.12.07】 更新 V2.0
     修正： “在此站点中搜索”功能有时失效的问题。
     增加： 快捷键定位到搜索框后允许全部选中文本。
     增加： CSS 详细设置（排版布局和取色功能借鉴自 Google Fx 脚本，做了部分改进，感谢原作者）。
 【2008.11.29】 更新 V1.8
     修正： “在此站点中搜索”功能有时失效的问题。
 【2008.11.29】 更新 V1.7
     增加： 快捷键定位到搜索框。
     增加： 允许在每个条目末尾添加“在此站点中搜索”链接。
 【2008.11.25】 更新 V1.6
     修正： 相关信息（黄色框部分）链接不能在新标签页打开的问题。
     修正： “排版模式  对齐3”时，脚本执行错误的问题。
     增加： 缩短账户名称功能（将 user@gmail.com 缩短为 user）。
 【2008.11.25】 更新 V1.5
   重写部分代码，提高处理速度。
     修正： 计算器等功能无法显示的问题。
     增加： 允许自定义预览缩略图的大小。（缩略图功能取自 googlepreview 扩展，做了部分修改，感谢原作者）
     增加： 允许自定义其他搜索引擎。
 【2008.11.15】 更新 V1.4
     修正： 完全兼容 google extra 脚本。（估计与其他脚本的兼容性应该也有提高吧）
   改进让搜索结果左右对齐的方式。
 【2008.11.14】 更新 V1.3
   搜索结果可以左右对齐了。
 【2008.11.11】 更新 V1.2
   排版更加紧凑。
   将页面导航条添加到分页提示中.
   自动翻页时第一页与第二页更加紧凑。
     修正： 提高与某些脚本，比如 google extra 的兼容性。
     修正： 变化了一些逻辑顺序，处理速度有一点提高。
 【2008.11.10】 更新 V1.1
     修正： 在中文谷歌中浏览器停止响应的问题。
     增加： 允许强制在新页面打开链接。
************************************************************************/
(function(){
var scriptVersion = '5.6';
var scriptUrl = 'http://userscripts.org/scripts/show/39159';
var installUrl = 'http://userscripts.org/scripts/source/39159.user.js';

/***********************************************************************************
* 语言支持
***********************************************************************************/
var Lng;
switch (navigator.language){
	default : // en-US：tanslated by foxhound
		Lng = {
			openOptions:'open options',
			closeOptions:'close options',
			OtherEngines:'Wiki【{word}】|http://en.wikipedia.org/wiki/Special:Search?search={word}',
			preview_title:'Thumbshot',
			preference:'GKK Prefs',
			site_filter:'Search from this site',
			resAbout1:'News,focus,videos,pics,blogs related to ',
			resAbout2:'',
			gui_title:'Prefs',
			gui_scripturl:'Script homepage',
			gui_welcome1:'Welcome to ',
			gui_welcome2:'here</a> with your feedback.',
			gui_preview_title:'Preview',
			gui_preview_optionsBox:'Options',
			gui_options_title_1:'General',
			gui_options_columns:'Columns',
			gui_options_direction:'Browsing Direction',
			gui_options_direction_1:'Horizontal',
			gui_options_direction_2:'Vertical',
			gui_options_mode:'Layout Mode',
			gui_options_mode_1:'Compact',
			gui_options_mode_2:'Alignment 1',
			gui_options_mode_3:'Alignment 2',
			gui_options_mode_4:'Alignment 3',
			gui_options_mode_tip:'Note: When "Browsing Direction" set to ‘horizontal’, "Layout Mode" will be fixed to "Compact" or "Alignment 1".',
			gui_options_fitwidth:'Fit Width',
			gui_options_floatInput:'InputForm floats on the ',
			gui_options_floatInputPos_1:'Top',
			gui_options_floatInputPos_2:'Bottom',
			gui_options_shortenUserName:'Shorten the user’s name（user@gmail.com -> user）',
			gui_options_optionsBoxStat:'Search Tools',
			gui_options_optionsBoxStat_1:'show',
			gui_options_optionsBoxStat_2:'hide',
			gui_options_optionsBoxStat_3:'remember the last',
			gui_options_floatOptionsBox:'floats on the left',
			gui_options_removeAd:'Remove Ads on the right',
			gui_options_EnableSearchWithOtherEngines:'Add other search engines',
			gui_options_OtherEnginesTarget_1:'open in new tab',
			gui_options_OtherEnginesTarget_2:'open in current tab',
			gui_options_OtherEnginsFloat:'Floats with InputForm',
			gui_options_OtherEngines_tip:'Please don’t modify the content below if you don’t understand them.',
			gui_options_SearchTipTop:'Move related searches to the top',
			gui_options_searchTip:'Add related searches from Baidu.com',
			gui_options_AutoNextPage:'Auto next page',
			gui_options_Focus2NextPageKeys:'Hotkey focus to next page',
			gui_options_Focus2PrevPageKeys:'prev page',
			gui_options_HideAutoNextPage:'Hide next page tip',
			gui_options_DisableTracking:'Disable Google tracking my search results',
			gui_options_Focus2Keyword:'Hotkey focus to Input and ',
			gui_options_Focus2KeywordAction_1:'Clear',
			gui_options_Focus2KeywordAction_2:'Follow',
			gui_options_Focus2KeywordAction_3:'Select all',
			gui_options_Focus2KeywordKeys:'Hotkey',
			gui_options_CheckUpdate:'Check for updates when the Prefs UI is opened',
			gui_options_title_2:'Results',
			gui_options_addAbout:'Move News,focus,videos,pics,blogs to the top',
			gui_options_addPreview:'Show Thumbshots ',
			gui_options_PreviewSize:' Size',
			gui_options_PreviewEnhance:'Enhance Fetch（not recommended if not necessary）',
			gui_options_addFavicon:'Show Favicon',
			gui_options_addFavicon_h:'Hide if not exist',
			gui_options_addResultNum:'Show Counter Numbers',
			gui_options_searchSite:'Add "Search from this site"',
			gui_options_OpenInNewTab:'Open in a new tab',
			gui_options_bgcolor:'Change the background-color of search entry in:【CSS Style】->【Holder】->【Background-Color】',
			gui_options_save:'Save',
			gui_options_cancel:'Cancel',
			gui_options_title_3:'CSS Style',
			gui_options_css_holder:'Holder',
			gui_options_css_counter:'Counter',
			gui_options_css_title:'Title',
			gui_options_css_desc:'Description',
			gui_options_css_keyword:'Keyword',
			gui_options_css_url:'URL',
			gui_options_css_reflinks:'RefLinks',
			gui_options_css_related:'Related Searches',
			gui_options_css_default:'Defaults',
			gui_options_css_gen:'Generated CSS',
			gui_options_css_customize:'Customize CSS',
			gui_CheckUpdate_1:'New version is available.',
			gui_CheckUpdate_2:' View Change Logs',
			gui_CheckUpdate_3:' or ',
			gui_CheckUpdate_4:'Update',
			gui_options_css_default_tip_1:'All the CSS values will be set to defaults.\nContinue？',
			gui_options_css_default_tip_2:'All the CSS values have been set to defaults.\nRefresh the page to see the changes.',
			gui_isLoading:'is loading',
			gui_autonextpage_1:'',
			gui_autonextpage_2:'page',
			gui_autonextpage_3:'',
			gui_preview_keyword:'Keyword ',
			gui_preview_title_1:'Title1 ',
			gui_preview_title_2:'Title2 ',
			gui_preview_title_3:'Title3 ',
			gui_preview_title_4:'Title4 ',
			gui_preview_desc_1:'Desc1 ',
			gui_preview_desc_2:'Desc2 ',
			gui_preview_desc_3:'Desc3 ',
			gui_preview_desc_4:'Desc4 ',
			gui_preview_translate:'Translate this page',
			gui_preview_cached:'Cached',
			gui_preview_similar:'Similar pages',
			gui_preview_related:'Searches related to: Keyword ',
			gui_preview_relatedKW_1:'Keyword 1',
			gui_preview_relatedKW_2:'Keyword 2',
			gui_preview_relatedKW_3:'Keyword 3',
			gui_preview_relatedKW_4:'Keyword 4',
			update_ignore:'Ignore for 24 hours',
			update_skip:'Skip this version',
			update_view:'view',
			update_imme:'Update',
			update_chrome:'Please uninstall old version before install the new one.\n And remember to save your settings before uninstall.',
			update_available:'update available',
			update_currentVersion:'current'
		};
		break;
	case 'zh-CN':
		Lng = {
			openOptions:'打开百宝箱',
			closeOptions:'关闭百宝箱',
			OtherEngines:'百度一下【{word}】|http://www.baidu.com/s?ie=utf-8&wd={word}',
			preview_title:'缩略图',
			preference:'GKK设置',
			site_filter:'在此站点中搜索',
			resAbout1:'关于',
			resAbout2:'的新闻、焦点、视频、图片、博客等内容',
			gui_title:'参数设置',
			gui_scripturl:'访问 userscripts 页面',
			gui_welcome1:'欢迎来',
			gui_welcome2:'这里</a>发表任何意见或建议。',
			gui_preview_title:'效果预览',
			gui_preview_optionsBox:'百宝箱',
			gui_options_title_1:'常规',
			gui_options_columns:'分栏数量',
			gui_options_direction:'阅读方向',
			gui_options_direction_1:'横向',
			gui_options_direction_2:'纵向',
			gui_options_mode:'排版模式',
			gui_options_mode_1:'紧凑',
			gui_options_mode_2:'对齐1',
			gui_options_mode_3:'对齐2',
			gui_options_mode_4:'对齐3',
			gui_options_mode_tip:'注：阅读方向为“横向”时，排版模式将固定为“紧凑”或“对齐1”',
			gui_options_fitwidth:'适合宽度',
			gui_options_floatInput:'搜索框浮动在页面',
			gui_options_floatInputPos_1:'顶部',
			gui_options_floatInputPos_2:'底部',
			gui_options_shortenUserName:'缩短帐户名（将 user@gmail.com 缩短为 user）',
			gui_options_optionsBoxStat:'左侧百宝箱',
			gui_options_optionsBoxStat_1:'显示',
			gui_options_optionsBoxStat_2:'隐藏',
			gui_options_optionsBoxStat_3:'记住最后一次的状态',
			gui_options_floatOptionsBox:'并且浮动在页面左侧',
			gui_options_removeAd:'移除右侧的广告',
			gui_options_EnableSearchWithOtherEngines:'添加其他搜索引擎',
			gui_options_OtherEnginesTarget_1:'在新页面打开',
			gui_options_OtherEnginesTarget_2:'在当前页打开',
			gui_options_OtherEnginsFloat:'跟随搜索框浮动',
			gui_options_OtherEngines_tip:'以下内容若不知何意，请勿修改',
			gui_options_SearchTipTop:'将相关搜索提示移到页面上部',
			gui_options_searchTip:'添加百度的相关搜索提示',
			gui_options_AutoNextPage:'自动加载下一页',
			gui_options_Focus2NextPageKeys:'快捷键定位到下一页',
			gui_options_Focus2PrevPageKeys:'上一页',
			gui_options_HideAutoNextPage:'隐藏自动翻页分隔符',
			gui_options_DisableTracking:'禁止Google记录我的点击情况',
			gui_options_Focus2Keyword:'快捷键定位到搜索框并',
			gui_options_Focus2KeywordAction_1:'清除全部文字',
			gui_options_Focus2KeywordAction_2:'紧跟文字之后',
			gui_options_Focus2KeywordAction_3:'选中全部文字',
			gui_options_Focus2KeywordKeys:'快捷键',
			gui_options_CheckUpdate:'每次打开此设置界面时自动检查是否有新版本',
			gui_options_title_2:'搜索条目',
			gui_options_addAbout:'新闻、焦点、视频、图片、博客等内容移至页面上方',
			gui_options_addPreview:'显示页面缩略图',
			gui_options_PreviewSize:'大小',
			gui_options_PreviewEnhance:'增强获取（一般不用开启）',
			gui_options_addFavicon:'显示站点的 Favicon',
			gui_options_addFavicon_h:'若没有则显示空白',
			gui_options_addResultNum:'给搜索结果标序号',
			gui_options_searchSite:'添加“在此站点中搜索”',
			gui_options_OpenInNewTab:'强制在新页面打开链接',
			gui_options_bgcolor:'改变搜索条目背景色在： 【CSS 样式】 -> 【条目】 -> 【Background-Color】',
			gui_options_save:'保存',
			gui_options_cancel:'取消',
			gui_options_title_3:'CSS 样式',
			gui_options_css_holder:'条目',
			gui_options_css_counter:'序号',
			gui_options_css_title:'标题',
			gui_options_css_desc:'描述',
			gui_options_css_keyword:'关键字',
			gui_options_css_url:'链接地址',
			gui_options_css_reflinks:'参考链接',
			gui_options_css_related:'相关搜索',
			gui_options_css_default:'全部恢复至默认 CSS',
			gui_options_css_gen:'生成的 CSS',
			gui_options_css_customize:'自定义 CSS',
			gui_CheckUpdate_1:'检测到新版本，请点击',
			gui_CheckUpdate_2:'查看',
			gui_CheckUpdate_3:'或',
			gui_CheckUpdate_4:'升级',
			gui_options_css_default_tip_1:'除自定义 CSS 外的其他所有 CSS 设置将恢复到默认状态。\n继续吗？',
			gui_options_css_default_tip_2:'除自定义 CSS 外的其他所有 CSS 设置已恢复到默认状态，刷新页面后生效。',
			gui_isLoading:'正在加载下一页',
			gui_autonextpage_1:'自动翻页。当前',
			gui_autonextpage_2:'第',
			gui_autonextpage_3:'页',
			gui_preview_keyword:'关键字',
			gui_preview_title_1:'标题一',
			gui_preview_title_2:'标题二',
			gui_preview_title_3:'标题三',
			gui_preview_title_4:'标题四',
			gui_preview_desc_1:'描述一',
			gui_preview_desc_2:'描述二',
			gui_preview_desc_3:'描述三',
			gui_preview_desc_4:'描述四',
			gui_preview_translate:'翻译此页',
			gui_preview_cached:'网页快照',
			gui_preview_similar:'类似网页',
			gui_preview_related:'相关搜索：',
			gui_preview_relatedKW_1:'相关词一',
			gui_preview_relatedKW_2:'相关词二',
			gui_preview_relatedKW_3:'相关词三',
			gui_preview_relatedKW_4:'相关词四',
			update_ignore:'暂时忽略',
			update_skip:'跳过此版',
			update_view:'查看更新',
			update_imme:'立即更新',
			update_chrome:'Chrome用户请先卸载旧版本，再去脚本页面（点击查看更新即可）安装新版。\n卸载前请务必记好自定义的各项设置。',
			update_available:'发现新版本',
			update_currentVersion:'当前版本'
		};
		break;
	case 'zh-TW':
		Lng = {
			openOptions:'打開百寶箱',
			closeOptions:'關閉百寶箱',
			OtherEngines:'百度一下【{word}】|http://www.baidu.com/s?ie=utf-8&wd={word}',
			preview_title:'縮略圖',
			preference:'GKK設置',
			site_filter:'在此站點中搜索',
			resAbout1:'關於',
			resAbout2:'的新聞、焦點、視頻、圖片、博客等內容',
			gui_title:'參數設置',
			gui_scripturl:'訪問 userscripts 頁面',
			gui_welcome1:'歡迎來',
			gui_welcome2:'這裏</a>發表任何意見或建議。',
			gui_preview_title:'效果預覽',
			gui_preview_optionsBox:'百寶箱',
			gui_options_title_1:'常規',
			gui_options_columns:'分欄數量',
			gui_options_direction:'閱讀方向',
			gui_options_direction_1:'橫向',
			gui_options_direction_2:'縱向',
			gui_options_mode:'排版模式',
			gui_options_mode_1:'緊湊',
			gui_options_mode_2:'對齊1',
			gui_options_mode_3:'對齊2',
			gui_options_mode_4:'對齊3',
			gui_options_mode_tip:'注：閱讀方向為“橫向”時，排版模式將固定為“緊湊”或“對齊1”',
			gui_options_fitwidth:'適合寬度',
			gui_options_floatInput:'搜索框浮动在页面',
			gui_options_floatInputPos_1:'頂部',
			gui_options_floatInputPos_2:'底部',
			gui_options_shortenUserName:'縮短帳戶名（將 user@gmail.com 縮短為 user）',
			gui_options_optionsBoxStat:'左側百寶箱',
			gui_options_optionsBoxStat_1:'顯示',
			gui_options_optionsBoxStat_2:'隱藏',
			gui_options_optionsBoxStat_3:'記住最後一次的狀態',
			gui_options_floatOptionsBox:'並且浮動在頁面左側',
			gui_options_removeAd:'移除右側的廣告',
			gui_options_EnableSearchWithOtherEngines:'添加其他搜索引擎',
			gui_options_OtherEnginesTarget_1:'在新頁面打開',
			gui_options_OtherEnginesTarget_2:'在當前頁打開',
			gui_options_OtherEnginsFloat:'跟隨搜索框浮動',
			gui_options_OtherEngines_tip:'以下內容若不知何意，請勿修改',
			gui_options_SearchTipTop:'將相關搜索提示移到頁面上部',
			gui_options_searchTip:'添加百度的相關搜索提示',
			gui_options_AutoNextPage:'自動加載下一頁',
			gui_options_Focus2NextPageKeys:'快捷鍵定位到下一頁',
			gui_options_Focus2PrevPageKeys:'上一頁',
			gui_options_HideAutoNextPage:'隱藏自動翻頁分隔符',
			gui_options_DisableTracking:'禁止Google記錄我的點擊情況',
			gui_options_Focus2Keyword:'快捷鍵定位到搜索框並',
			gui_options_Focus2KeywordAction_1:'清除全部文字',
			gui_options_Focus2KeywordAction_2:'緊跟文字之後',
			gui_options_Focus2KeywordAction_3:'選中全部文字',
			gui_options_Focus2KeywordKeys:'快捷鍵',
			gui_options_CheckUpdate:'每次打開此設置界面時自動檢查是否有新版本',
			gui_options_title_2:'搜索條目',
			gui_options_addAbout:'新聞、焦點、視頻、圖片、博客等內容移至頁面上方',
			gui_options_addPreview:'顯示頁面縮略圖',
			gui_options_PreviewSize:'縮略圖大小',
			gui_options_PreviewEnhance:'增強獲取（一般不用開啟）',
			gui_options_addFavicon:'顯示站點的 Favicon',
			gui_options_addFavicon_h:'若沒有則顯示空白',
			gui_options_addResultNum:'給搜索結果標序號',
			gui_options_searchSite:'添加“在此站點中搜索”',
			gui_options_OpenInNewTab:'強制在新頁面打開鏈接',
			gui_options_bgcolor:'改變搜索條目背景色在： 【CSS 樣式】 -> 【條目】 -> 【Background-Color】',
			gui_options_save:'保存',
			gui_options_cancel:'取消',
			gui_options_title_3:'CSS 樣式',
			gui_options_css_holder:'條目',
			gui_options_css_counter:'序號',
			gui_options_css_title:'標題',
			gui_options_css_desc:'描述',
			gui_options_css_keyword:'關鍵字',
			gui_options_css_url:'鏈接地址',
			gui_options_css_reflinks:'參考鏈接',
			gui_options_css_related:'相关搜索',
			gui_options_css_default:'全部恢復至默認 CSS',
			gui_options_css_gen:'生成的 CSS',
			gui_options_css_customize:'自定義 CSS',
			gui_CheckUpdate_1:'檢測到新版本，請點擊',
			gui_CheckUpdate_2:'查看',
			gui_CheckUpdate_3:'或',
			gui_CheckUpdate_4:'升級',
			gui_options_css_default_tip_1:'除自定義 CSS 外的其他所有 CSS 設置將恢復到默認狀態。\n繼續嗎？',
			gui_options_css_default_tip_2:'除自定義 CSS 外的其他所有 CSS 設置已恢復到默認狀態，刷新頁面後生效。',
			gui_isLoading:'正在加載下一頁',
			gui_autonextpage_1:'自動翻頁。當前',
			gui_autonextpage_2:'第',
			gui_autonextpage_3:'頁',
			gui_preview_keyword:'關鍵字',
			gui_preview_title_1:'標題一',
			gui_preview_title_2:'標題二',
			gui_preview_title_3:'標題三',
			gui_preview_title_4:'標題四',
			gui_preview_desc_1:'描述一',
			gui_preview_desc_2:'描述二',
			gui_preview_desc_3:'描述三',
			gui_preview_desc_4:'描述四',
			gui_preview_translate:'翻譯此頁',
			gui_preview_cached:'網頁快照',
			gui_preview_similar:'類似網頁',
			gui_preview_related:'相关搜索：',
			gui_preview_relatedKW_1:'相关詞一',
			gui_preview_relatedKW_2:'相关詞二',
			gui_preview_relatedKW_3:'相关詞三',
			gui_preview_relatedKW_4:'相关詞四',
			update_ignore:'暫時忽略',
			update_skip:'跳過此版',
			update_view:'查看更新',
			update_imme:'立即更新',
			update_chrome:'Chrome用戶請先卸載舊版本，再去腳本頁面（點擊查看更新即可）安裝新版。\n卸載前請務必記好自定義的各項設置。',
			update_available:'發現新版本',
			update_currentVersion:'當前版本'
		};
		break;
}

var isChrome = /Chrome/.test(navigator.userAgent);
var NextPageLink;
var pageCount = 1; // 翻页计数
var ResultNum = 1; // 搜索结果计数
var IsLoadingNext; // 是否正在加载下一页
var optionsBox;	   // 是否打开了百宝箱
var optionsBoxMarginLeft;	   // 打开百宝箱后，res 的左间距
var defaultCSS = '\
.gkk_MultiCol .g {\n\
	background-color: #EBEFF9 !important;\n\
	padding-left: 0.5em !important;\n\
	padding-right: 0.5em !important;\n\
	margin-top: 0.5em !important;\n\
	padding-top: 0.2em !important;\n\
	margin-bottom: 0.2em !important;\n\
	padding-bottom: 0.2em !important;\n\
}\n\
.gkk_MultiCol .gkk_num {\n\
	font-size: 11pt !important;\n\
	font-weight: bold !important;\n\
}\n\
#brs {\n\
	background-color: #EBEFF9 !important;\n\
	border-color: #7A93FF !important;\n\
	border-style: solid !important;\n\
	border-width: thin !important;\n\
}\
';
var defaultCustomizeCSS = '\
/* 若要恢复搜索条目的缩进，请注释掉以下两行 */\n\
.gkk_MultiCol {-moz-column-gap: 1.4em; -webkit-column-gap: 0.5em;}\n\
.g {margin-left: 0 !important; width: 100% !important;}\n\
\n\
/* 若要恢复顶部的赞助商链接，请注释掉此行 */\n\
#tads {display: none;}\n\
\n\
/* 修改“其他搜索引擎”的显示位置 */\n\
#subform_ctrl {padding-top: 10px !important; margin-left: 10px !important; margin-right: 20px !important;margin-top: 10px !important;}\n\
#gkk_opboxbutton {width:200px !important;}\n\
\n\
/* 修改“搜索状态（条数/用时）”的显示高度 */\n\
/* #appbar > div{height: 30px !important;} */\n\
/* #resultStats{top:10px !important;} */\n\
/* #ab_name span {position:relative !important;top: -12px !important;} */\n\
\n\
/* 调整“其他搜索引擎”字体大小 */\n\
.gkk_oe {font-size: 13px !important;}\n\
\n\
/* 取消注释可调整“其他搜索引擎”间距 */\n\
/* .gkk_oe a {margin-right: 3px;} */\n\
\n\
/* 隐藏preview浮窗 */\n\
.vspib {display: none;} .vshid {display: inline; margin-left:7px;}\n\
\n\
/* Google搜索结果宽版显示 */\n\
div#cnt { min-width:100% !important; }\n\
#center_col {margin-right:0px!important; max-width:100% !important;}\n\
#cnt #res .g .s {max-width:100% !important;}\n\
#cnt #center_col, #cnt #foot { width:auto !important;}\n\
.mw { max-width:99%!important;margin-left:-5px!important;}\n\
.big .mw { max-width:100%!important;}\n\
\n\
/* 解决中文界面下以图搜图部分文字重叠的问题 */\n\
/*(似乎是google的BUG，Chinese Only，英文界面勿用)*/\n\
/* #topstuff>div>div[style*="top:20%"]{top:0% !important;} */\n\
';

/***********************************************************************************
* 设置参数
***********************************************************************************/
// GreaseMonkey 的 getValue() 有一些限制，所以重定义一个 getValue()
//var getValue = function(n,v){var gmv=isChrome?localStorage.getItem(n):GM_getValue(n);return (gmv==undefined || gmv.length < 1) ? v : gmv;};
//var setValue = function(n,v){var gmv=isChrome?localStorage.setItem(n,v):GM_setValue(n,v);};
var getValue, setValue;
if(isChrome){
	getValue = function(n,v){var gmv=localStorage.getItem(n);return (gmv==undefined || gmv.length < 1) ? v : gmv;};
	setValue = function(n,v){var gmv=localStorage.setItem(n,v);};
}else{
	getValue = function(n,v){var gmv=GM_getValue(n);return (gmv==undefined || gmv.length < 1) ? v : gmv;};
	setValue = function(n,v){var gmv=GM_setValue(n,v);};
}

var Pref = {
		
		// 百宝箱最后一次时的状态，默认 true，展开
		 optionsBoxLastStat		: toBoolean(getValue('optionsBoxLastStat',			true))
		// 百宝箱初始状态： 1-显示（默认）； 2-隐藏； 3-记住上一次的状态
		,optionsBoxInitStat		: Number(getValue('optionsBoxInitStat',				2))

		// 浮动百宝箱
		,floatOptionsBox		: toBoolean(getValue('floatOptionsBox',		false))
		
		// 分栏数量，默认 1
		,columns				: Number(getValue('numcol',			2))
		
		// 搜索结果的排列方向：1-横向；2-纵向（默认）
		,direction				: Number(getValue('direction',			1))

		// 显示模式：1-紧凑；2-对齐，但比较松散（默认）；3-对齐，但比较松散；4-对齐，但比较松散
		,displayMode			: Number(getValue('mode',				2))

		// 给搜索结果条目添加序号，默认 关闭
		,addResultNum			: toBoolean(getValue('addResultNums',		false))

		// 是否自动加载下一页，默认 关闭
		,AutoNextPage			: toBoolean(getValue('AutoNextPage',		true))
		,Focus2NextPageKeys		: getValue('Focus2NextPageKeys',	'ctrl+40')
		,Focus2PrevPageKeys		: getValue('Focus2PrevPageKeys',	'ctrl+38')

		// 是否隐藏自动翻页分隔符，默认 不隐藏
		,HideAutoNextPage		: toBoolean(getValue('HideAutoNextPage',	false))

		// 将相关搜索提示移到页面上部，默认 否
		,SearchTipTop			: toBoolean(getValue('SearchTipTop',		false))
		
		// 如果英文Google没有相关搜索，则添加中文谷歌的相关搜索提示，默认 开启
		,EnableSearchTip		: toBoolean(getValue('SearchTip',			false))

		// 禁止Google记录我的点击情况，默认 关闭
		,DisableTracking		: toBoolean(getValue('DisableTracking',	true))

		// 强制在新页面打开链接，默认 关闭
		,OpenInNewTab			: toBoolean(getValue('OpenInNewTab',		false))

		// 将新闻、焦点、视频、图片、博客等内容移至页面上方，默认 否
		,addAbout				: toBoolean(getValue('addAbout',		true))

		// 添加缩略图预览，默认 否
		,addPreview				: toBoolean(getValue('addPreviews',		false))
		
		// 缩略图大小，默认 100%
		,PreviewSize			: Number(getValue('PreviewSize',		100))

		// 增强获取缩略图的能力，默认 关闭
		,PreviewEnhance			: toBoolean(getValue('PreviewEnhance',	false))
		
		// 添加 Favicon，默认 关闭
		,addFavicon				: toBoolean(getValue('addFavicons',		false))

		// 若没有 Favicon 则显示空白，默认 否
		,addFavicon_h			: toBoolean(getValue('addFavicons_h',		false))

		// 让搜索结果适合屏幕宽度，默认 关闭
		,fitwidth				: toBoolean(getValue('fitwidth',			false))

		// 搜索框浮动，1-顶部；2-底部
		,floatInput				: toBoolean(getValue('floatInput',		false))
		,floatInputPos			: Number(getValue('floatInputPos',			1))
		
		// 缩短账户名称
		,shortenUserName		: toBoolean(getValue('shortenUserName',	false))
		
		// 移除页面右侧的广告，默认 否
		,removeAd				: toBoolean(getValue('removeAd',			false))

		// 添加“在此站点中搜索”
		,searchSite				: toBoolean(getValue('searchSite',		true))
		
		// 快捷键定位到搜索框
		,Focus2Keyword			: toBoolean(getValue('Focus2Keyword',		false))
		,Focus2KeywordKeys		: getValue('Focus2KeywordKeys',	'alt+83')
		// 快捷键定位到搜索框后的动作：1-清除全部文字（默认）；2-紧跟文字之后；3-选中全部文字
		,Focus2KeywordAction	: Number(getValue('Focus2KeywordAction',	1))

		// 在页面上部添加其他搜索引擎
		,EnableSearchWithOtherEngines		: toBoolean(getValue('SearchWithOtherEngines',		true))
		// 其他搜索引擎地址
		,OtherEngines			: getValue('OtherEngines',		Lng.OtherEngines)
		// 其他搜索引擎打开方式，默认“在新页面打开”
		,OtherEnginesTarget		: getValue('OtherEnginesTarget','_blank')
		// 跟随搜索框浮动
		,OtherEnginsFloat		: toBoolean(getValue('OtherEnginsFloat',	false))
		
		// CSS
		,CSS					: getValue('CSS',				defaultCSS)
		,customizeCSS			: getValue('customizeCSS',		defaultCustomizeCSS)
		
		// 自动检查更新
		,lastCheck				: Number(getValue('lastCheck',			0))
		,skipVersion			: Number(getValue('skipVersion',		0))
		,newVersion				: Number(getValue('newVersion',		0))
};

/*********************************************************************************************
 * 开始处理
 *********************************************************************************************/
//var t0 = new Date().getTime();

//var t1 = new Date().getTime();
//alert((t1-t0));

/*********************************************************************************************
 * 各功能函数
 *********************************************************************************************/
	        
// 检查新版本
setTimeout(checkUpdate, 100);

function doit(){

    var resMarginLeft = parseInt(getComputedStyle(document.getElementById('res'), '').getPropertyValue('margin-left'));
    var resPaddingLeft = parseInt(getComputedStyle(document.getElementById('res'), '').getPropertyValue('padding-left'));

    // 添加 CSS 样式
	GM_addStyle('\
			   /* 让li以table方式显示，避免分列时被拆断，以及添加圆角效果等\
			   （补充：采用table显示在部分情况下会出现分栏之间交叠，现尝试改为inline-block 看是否能正常工作*/\
			      	.g {display: ' + (isChrome?(Pref.columns==1?'table':'inline-table'):'inline-block') + '; -moz-border-radius: 0.75em; -webkit-border-radius: 0.75em;}\
			      	/* 稍微减少二级条目的缩进避免条目溢出 */\
			      	.nrgt {margin-left:10px!important;}\
					/**************************************/\
					.gkk_e, .gkk_tope {-moz-border-radius: 0.75em; -webkit-border-radius: 0.75em; margin-left: ' + (resMarginLeft) + 'px; padding: 0.2em 0.5em;}\
					#brs {-moz-border-radius: 0.75em; -webkit-border-radius: 0.75em; padding: 0.2em 0.5em; margin: 0.75em 0;}\
					#subform_ctrl {z-index: 0; min-height: 0 !important; margin-left: 0; max-width: 100%;}\
			   /* 用于关闭左侧的百宝箱 */\
					.hidden {display: none !important;} .noMarginLeft {margin-left: 0px !important;}\
					#hdtb_msb > .hdtb_mitem.hdtb_msel:first-child {margin-left: 0px !important;}\
					#hdtb_msb > .hdtb_mitem:first-child {margin-left: 0px !important;}\
					#hdtb_msb > .hdtb_mitem:first-child a {margin-left: 0px !important;}\
			   /* 其他搜索引擎列表的样式 */\
					#gkk_oe {display: inline;}\
					#gkk_oe a {font-size:12px; text-decoration: none;}\
					#gkk_oe a:hover {text-decoration: underline;}\
					#resultStats {float: right;}\
			   /* 打开、关闭百宝箱按钮的样式 */\
					#gkk_opboxbutton {float: left; font-size:12px; color: #1111CC; cursor: pointer; display: inline-block; text-decoration: none; margin: 1px 0 2px 3px; width: 146px;}\
					#gkk_opboxbutton:hover {text-decoration: underline;}\
			   /* Google 的相关搜索上部留出个空白，并且变为横向的样式 */\
					#brs {margin-top: 0.5em;}\
					#brs p {display: inline; margin-right: 1em;}\
			   /* 隐藏自动加载下一页中的 相关搜索和相关服务条目 */\
					.gkk_nextpage #botstuff {display: none;}\
					.gkk_nextpage #topstuff {display: none;}\
			   /* 百宝箱选项提示区域顶部留出一点空白，左侧和搜索条目对齐 */\
					#tbbc {margin-top: 6px; margin-left: ' + (resMarginLeft + resPaddingLeft) + 'px;}\
			   /* 翻页分隔符样式 */\
					.gkk_nav {margin-left: ' + (resMarginLeft + resPaddingLeft) + 'px; ' + (isChrome?'':'width: 100%;') + '}\
					.gkk_nav #nav {margin: 2px auto !important;}\
					.gkk_nav .csb {display: none;}\
					.gkk_nav span {margin: auto 0 !important;}\
			   /* 去掉内容区上下的空白 */\
					#res {padding-top: 0 !important; padding-bottom: 0 !important;}\
			   /* 给后面的“共有xx条搜索结果”条目添加向右浮动的样式 */\
			      	#ssb {margin-bottom: 5px !important;} #ssb p {float: right;}\
			   /* 添加新闻、博客等相关内容框的样式 */\
					#resAbout {border: 2px solid #C0CDF7; margin: 5px 0 ' + (isChrome?'10px ':'0 ') + (resMarginLeft + resPaddingLeft) + 'px; padding: 0.5em 1.5em 0.4em 0.5em; -moz-border-radius: 0.75em; -webkit-border-radius: 0.75em;}\
			   /* 地址带 # 的页面阅读区默认最大宽度 84em，这里改成 200em 方便宽屏浏览 */\
					#cnt {max-width: none !important;}\
			   /* 去掉“据当地法律法规和政策，部分搜索结果未予显示。”这句提示的上下空白 */\
					#mfr {margin: 0px !important;}\
			   /* 百宝箱按钮左对齐 */\
					#subform_ctrl {clear: both;}\
			   /* 分栏区域左对齐 */\
					#cnt #center_col {margin-left: 3px !important;}\
			   /* 修正标题下划线 */\
					div#ires>ol>li h3.r{padding-bottom:1px;}\
			   /* 固定google生成的地图浮窗 */\
			        #lu_pinned_rhs{position:static !important;}\
                    #lu_pinned_rhs-placeholder{display:none}\
                    #lu_pinned_rhs > div{margin-top:5px !important;}\
               /* 计算器样式修正（暂时） */\
                    .vk_c {margin: 0px !important;}\
               /* 修正宽屏排版 */\
                    #rcnt>div.col[style="width:0"]{width: 100% !important;}\
			  '
			   +
			   // 去掉内容区右侧的空白。如果包含id为rhs的右侧栏则要保留空白
//			   (document.getElementById('rhs')?'':' #center_col, #foot {margin-right: 15px;}')
//			   ' #center_col, #foot {margin-right: 15px;}'
//			   +
			   // 去除右侧的广告并填补空白。如果右侧不是广告（id=mbEnd），则要保留右侧的空白。如果右侧什么都没有，则直接填补空白。
//			   (Pref.removeAd?' #mbEnd {display: none;}':' #mbEnd {margin-left: 1.4em;}')
//			   (Pref.removeAd?(document.getElementById('mbEnd')?' #rhs {display: none !important;} #center_col, #foot {margin-right: 15px;}':''):'')
			   (document.getElementById('mbEnd')?(Pref.removeAd?' #rhs {display: none !important;} #center_col, #foot {margin-right: 15px;}':''):(document.getElementById('rhs')?'':' #center_col, #foot {margin-right: 15px;}'))
			   +
			   // 让搜索结果适合屏幕宽度
			   (Pref.fitwidth?' .s {max-width: 200em !important;line-height: 1.5em !important;} .hc {margin-right: 3em !important} .j {max-width: 200em !important;}':'')
			   +
			   // 浮动百宝箱
			   (Pref.floatOptionsBox?' #top_nav {position: fixed !important; top: ' + getOffsetTop(document.getElementById('top_nav')) + 'px !important;}':'')
			   +
			   // 添加条目序号的样式
			   (Pref.addResultNum?' .gkk_num {display: inline;}':'')
			   +
			   // 添加预览缩略图的样式
			   (Pref.addPreview?' .gkk_previewimg {border: 1px solid rgb(187, 187, 187); margin: 2px 4px 5px 0px; width: ' + 111 * Pref.PreviewSize / 100 + 'px; height: ' + 82 * Pref.PreviewSize / 100 + 'px; background-position: center center; background-repeat: no-repeat;}':'')
			   +
			   // 添加 favicon 的样式
			   (Pref.addFavicon?' .gkk_favicon {visibility: hidden; margin: 0 4px -3px 0; width: 16px; height: 16px;}':'')
			   +
			   // 若没有 favicon 则显示空白
			   (Pref.addFavicon_h?'':'.gkk_favicon {display: none;}')
			   +
			   // 添加分栏样式
			   (' .gkk_MultiCol {overflow: visible !important; -moz-column-count: ' + Pref.columns + '; -moz-column-gap: 0.6em; -webkit-column-count: ' + Pref.columns + '; -webkit-column-gap: 0.5em;}')
			   +
			   // 隐藏自动翻页分隔符
			   (Pref.HideAutoNextPage?' .gkk_nav {display: none !important;}':'')
			   +
			   // 添加翻页分隔符的样式
			   (Pref.AutoNextPage?' #nav td {padding: 0 0.2em 0 0.2em !important;} #nav {margin-bottom: 0 !important;} #nav a {display: inline !important;}':'')
			   +
			   //分栏数量大于1时对以图搜图条目过长标题折行避免条目间重叠 
			   (Pref.columns > 1?' #res ol > li.g > div.vsc > table.ts td > h3.r {white-space: normal;}':'')
			   + Pref.CSS + Pref.customizeCSS
	);

	// 判断是否关闭左侧的百宝箱
    if(Pref.optionsBoxInitStat>1 && (Pref.optionsBoxInitStat==2 || !Pref.optionsBoxLastStat)){
        document.getElementById('top_nav').setAttribute('class','hidden'); 
        //document.getElementById('center_col').setAttribute('class','noMarginLeft'); 
        Pref.optionsBoxLastStat=false;
    }else{
        Pref.optionsBoxLastStat=true;
    }

	switch (matchNode('//div[@id="res"]/descendant::ol/descendant::li').snapshotLength>0) {
		// 若存在搜索结果
	    case true:

	   	    // 给搜索结果条目添加序号
	   	    if(Pref.addResultNum){
	   	        addResultNums(document.body); 
	   	    }

	   	    // 设置分栏格式
	   	    MultiCol(document.body, pageCount, Pref);
	
	   	    // 添加缩略图预览
	   	    if(Pref.addPreview){
	   	        addPreviews(document.body); 
	   	    }
	
	   	    // 添加站点 Favicon
	   	    if(Pref.addFavicon){
	   	        addFavicons(document.body); 
	   	    }
	
			// 添加“在此站点中搜索”
			if(Pref.searchSite){
	   	     	addseatchSite(document.body);
			}
	   	 
			// 统一格式，美化版面
			// 只有一列或者“紧凑”模式时不需要统一格式
			if (Pref.columns > 1 && Pref.displayMode > 1) {
				format('gkk_page_' + pageCount, Pref);
			}
	              
			// 将相关搜索提示移到页面上部
            if (Pref.SearchTipTop) {
                moveSearchTip2Top(resMarginLeft + resPaddingLeft, document.body);
            }

            // 暂停100ms再继续
			setTimeout(function(){

	        	// 禁止Google记录我的点击情况
	            if (Pref.DisableTracking) {
	                removeTracking(document.body);
	            }

	            // 强制在新页面打开链接
	            if (Pref.OpenInNewTab) {
	                OpenInNewTabs(document.body);
	            }

	            // 自动加载下一页
	            if (Pref.AutoNextPage) {
	                NextPageLink = matchNode('//td[@class="cur"]/following-sibling::td/a').snapshotItem(0);

	                // 删除第一页的页面导航条
	                var navTable;
	                if (navTable = document.getElementById('nav')) 
	                    navTable.parentNode.removeChild(navTable);
	                
	                // 去除不必要的隔行
	                try {
	                    matchNode('//body/br').snapshotItem(0).style.display = 'none';
	                } 
	                catch (e) {
	                }
	                
	                IsLoadingNext = false;
	                setTimeout(loadNextPage, 1000);
	                window.addEventListener('scroll', watch_scroll, true);
	
	                // 快捷键定位到下一页
	                var shift_Next = /shift/.test(Pref.Focus2NextPageKeys);
	                var alt_Next = /alt/.test(Pref.Focus2NextPageKeys);
	                var ctrl_Next = /ctrl/.test(Pref.Focus2NextPageKeys);
	                var tmp = Pref.Focus2NextPageKeys.split('+');
	                var keycode_Next = tmp[tmp.length - 1];
	
	                window.addEventListener('keydown', function(event){
	                    if ((event.altKey == alt_Next) && (event.ctrlKey == ctrl_Next) && (event.shiftKey == shift_Next) && (event.keyCode == keycode_Next) && (event.target.localName != 'INPUT') && !document.getElementById('preferences')) {
							var nextSplit = Pref.HideAutoNextPage?matchNode('//div[contains(@class,"gkk_nextpage")]'):matchNode('//div[@class="gkk_nav"]');
							var i, len = nextSplit.snapshotLength, topOffset = document.getElementById('center_col').parentNode.offsetTop, headerOffset = (Pref.floatInput && Pref.floatInputPos==1)?document.getElementById('gkk_header').offsetHeight:0;
							for(i=0;i<len;i++){
								if(window.scrollY<nextSplit.snapshotItem(i).offsetTop + topOffset - headerOffset){
									window.scrollTo(0, nextSplit.snapshotItem(i).offsetTop + topOffset - headerOffset);
									break;
								}
							}
							
	                    	event.preventDefault();
	                        event.stopPropagation();
	                    }
	                }, true);
	
	                // 快捷键定位到上一页
	                var shift_Prev = /shift/.test(Pref.Focus2PrevPageKeys);
	                var alt_Prev = /alt/.test(Pref.Focus2PrevPageKeys);
	                var ctrl_Prev = /ctrl/.test(Pref.Focus2PrevPageKeys);
	                tmp = Pref.Focus2PrevPageKeys.split('+');
	                var keycode_Prev = tmp[tmp.length - 1];
	
	                window.addEventListener('keydown', function(event){
	                    if ((event.altKey == alt_Prev) && (event.ctrlKey == ctrl_Prev) && (event.shiftKey == shift_Prev) && (event.keyCode == keycode_Prev) && (event.target.localName != 'INPUT') && !document.getElementById('preferences')) {
							var prevSplit = Pref.HideAutoNextPage?matchNode('//div[contains(@class,"gkk_nextpage")]'):matchNode('//div[@class="gkk_nav"]');
							var i, len = prevSplit.snapshotLength, topOffset = document.getElementById('center_col').parentNode.offsetTop, headerOffset = (Pref.floatInput && Pref.floatInputPos==1)?document.getElementById('gkk_header').offsetHeight:0;
							for(i=len-1;i>=0;i--){
								if(window.scrollY>prevSplit.snapshotItem(i).offsetTop + topOffset - headerOffset){
									window.scrollTo(0, prevSplit.snapshotItem(i).offsetTop + topOffset - headerOffset);
									break;
								}
							}
							if(i<0){window.scrollTo(0,0);}
	                    	event.preventDefault();
	                        event.stopPropagation();
	                    }
	                }, true);
	            }
			},100);			

		// 若不存在搜索结果
	    case false:

            // 给添加其他引擎的位置加个 id
    		//var div = matchNode('//div[@id="subform_ctrl"]/div[last()]').snapshotItem(0);
    		//if(div) div.setAttribute('id','gkk_oe');

            // 添加其他搜索引擎
            if (Pref.EnableSearchWithOtherEngines) {
                addSearchWithOtherEngines();
            }

    		// 开关百宝箱按钮
    		var optionsBoxA = document.createElement('a');
			optionsBoxA.setAttribute('id','gkk_opboxbutton');
			optionsBoxA.setAttribute('href','javascript: void(0);');
			if(Pref.optionsBoxInitStat==1 || (Pref.optionsBoxInitStat==3 && Pref.optionsBoxLastStat)){
				optionsBoxA.innerHTML = '<span class="mbi" style="background-position: -153px -83px; border: 0; float: left; height: 15px; margin: 0 5px 0 14px; width: 13px;"></span>' + Lng.closeOptions;
			}else{
				optionsBoxA.innerHTML = '<span class="mbi" style="background-position: -153px -69px; border: 0; float: left; height: 15px; margin: 0 5px 0 14px; width: 13px;"></span>' + Lng.openOptions;
			}

			document.getElementById('subform_ctrl').insertBefore(optionsBoxA,document.getElementById('subform_ctrl').firstChild);
			optionsBoxA.addEventListener('mousedown', function(event){
				if(Pref.optionsBoxLastStat){
					Pref.optionsBoxLastStat=false;
	   	        	document.getElementById('top_nav').setAttribute('class','hidden'); 
	   	        	//document.getElementById('center_col').setAttribute('class','noMarginLeft'); 
					optionsBoxA.innerHTML = '<span class="mbi" style="background-position: -153px -69px; border: 0; float: left; height: 15px; margin: 0 5px 0 14px; width: 13px;"></span>' + Lng.openOptions;
				}else{
	   	        	document.getElementById('top_nav').removeAttribute('class',''); 
	   	        	//document.getElementById('center_col').removeAttribute('class',''); 
					Pref.optionsBoxLastStat=true;
					optionsBoxA.innerHTML = '<span class="mbi" style="background-position: -153px -83px; border: 0; float: left; height: 15px; margin: 0 5px 0 14px; width: 13px;"></span>' + Lng.closeOptions;
				}
				setValue('optionsBoxLastStat', Pref.optionsBoxLastStat);
                event.preventDefault();
                event.stopPropagation();
            }, false);
        	
            // 添加百度的相关搜索提示
            if (Pref.EnableSearchTip && !isChrome) {
                addSearchTip();
            }

            // 添加 “GoogleKingKong 设置”
            addPreferences();

            // 缩短账户名称
            if (Pref.shortenUserName) {
                var username = matchNode('//div[@id="guser"]/nobr/b').snapshotItem(0);
                if (username) {
                    username.innerHTML = username.innerHTML.split('@')[0];
                }
            }

            // 浮动搜索框
            if (Pref.floatInput) {
                floatInput();
            }
            
            // 快捷键定位到搜索框
            if (Pref.Focus2Keyword && document.getElementsByName("q")[0]) {
                var shift = /shift/.test(Pref.Focus2KeywordKeys);
                var alt = /alt/.test(Pref.Focus2KeywordKeys);
                var ctrl = /ctrl/.test(Pref.Focus2KeywordKeys);
                var tmp = Pref.Focus2KeywordKeys.split('+');
                var keycode = tmp[tmp.length - 1];
                var lastKeyWord = '';

                window.addEventListener('keydown', function(event){
                    if ((event.altKey == alt) && (event.ctrlKey == ctrl) && (event.shiftKey == shift) && (event.keyCode == keycode) && (event.target.localName != 'INPUT') && !document.getElementById('preferences')) {
                        with (document.getElementsByName("q")[0]) {
                            value = value.replace(/\s*$/, '') + ' ';
                            focus();
                            switch (Pref.Focus2KeywordAction) {
                                case 1:
                                    lastKeyWord = value;
                                    value = '';
                                    break;
                                case 2:
                                    break;
                                case 3:
                                    select();
                            }
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }, true);
                
                // 如果已选择“清除全部文字”，那么当输入框失去焦点且没有文字的时候，填入上一次的搜索字词
                if (Pref.Focus2KeywordAction == 1) {
                    document.getElementsByName("q")[0].addEventListener('blur', function(event){
                        var input = event.target;
                        if (input.value == '' && lastKeyWord != '') {
                            input.value = lastKeyWord;
                        }
                    }, false);
                }
            }
			
            // 取消logo的链接，免得误击
            //document.getElementById('logo').removeAttribute('href');
		}
}

// 用 XPath 匹配元素
function matchNode(xpath, context){
    return document.evaluate(context?(xpath.indexOf('.')==0?xpath:'.' + xpath):xpath, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

document.getElementByXPath = function(XPath, contextNode)
{
    var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return (a.snapshotLength ? a.snapshotItem(0) : null);
};

document.getElementsByXPath = function(XPath, contextNode)
{
    var ret=[], i=0;
    var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
    {
        ret.push(a.snapshotItem(i++));
    }
    return ret;
};

// 获取元素至页面顶部的距离
function getOffsetTop(ele){
try{
	var ot = 0;
	do{
		ot += ele.offsetTop;
		ele = ele.offsetParent;
	}
	while(ele);
	return ot;
}
catch(e){}
	return 110;
}

function isAmazonCOM(href) {
	return href.toLowerCase().indexOf("www.amazon.com") == 7;
}

function getASIN(href) {
    var asin = href.match(/amazon.+\W+([0-9A-Z]{10})(\W+|$)/i);
    return asin ? asin[1] : null;
}

function getFullDomain(href) {
    var domain = href.match(/http(?:s)?:\/\/[^\/]+/i);
    return domain ? domain[0].toLowerCase() : href;
}

function getGPSub(href) {
    var site = getFullDomain(href);
    site = site.toLowerCase();
    if (site.indexOf("https://") == 0) {
        site = site.substring(8, site.length);
    }
    else if (site.indexOf("http://") == 0) {
        site = site.substring(7, site.length);
    } 
    if (site.indexOf("www.") == 0) {
        site = site.substring(4, site.length);
    } 
    return site.length > 0 ? ""+site.charAt(0) : "a";
}

// 根据站点根域名的首字母分配 googlepreview 服务器，分散服务器压力
function getImageURL(href) {
    var mw = href.match(/http:\/\/www\.google\..*\/interstitial\?url=/i);
    if (mw) {
        return "data:image/gif,GIF89ao%00R%00%E6%00%00%F4%0B%0B%F0%F3%F1fff%C4_Z%CC33%C4%B0%AC%AA%24%24%C3%A5%A0%C9%3E%3A%D8%D5%D3%FF_%5E%FF%24%24%FF%3A%3A%CC%CC%CC%DE()%FF%8B%8B%FF%A5%A3%FFRR%DF%24%24%BE%86%80%C8TR%FF33%EA%EC%E9%FA%8D%8B%FF%BC%BB%FFff%D6%8C%8B%F1%A9%A8%EF()%FE%F6%F5%F3PN%F1%DC%DA%FFII%E4%C7%C4%FF%99%99%C0sr%D5IF%F0%2F.%FF))%CBzy%FF%E6%E4%FF%7C%7C%FF%AC%AB%E1%BB%B9%FF%CC%CC%EF%3B%3A%E8%8F%8D%FF%5C%5B%E5%2F-%FFB%3A%CCff%DF%81%80%FA%24%24%CC%99%99%F6)*%F5%F3%F1%E4%D2%CF%F8%CC%CA%E8()%C7EC%F4%B5%B2%FF%DE%DB%FFts%EF%F2%F0%CC%87%85%F9%F2%F1%FF%93%91%C5%80%7B%CF%B0%AD%C3XW%C2rq%FF%FF%FF%EC%93%92%F8%FB%F9%FA%92%90%CF%40%3F%B3%24%24%FF%B4%B3%FF%AA%A7%CCff%DF%DB%D9%EB%E9%E6%CC%99%99%C6%88%85%FFff%FF%A1%9F%FF%5E_%FFAA%EF%F7%F7%FF%80%7F%FF%ED%EC%C5%B5%AD%D0%3E%3B%D3%D1%CE%E7%24%24%F2%C8%C6%BFzu%F8..%D2on%F4%F7%F5%CE%8C%84%FF%99%99%CF%B3%AE%F7%94%94%CEJB%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00o%00R%00%00%07%FF%80G%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%93%94%95%96%97%98%99%9A%9B%9C%9D%9E%9F%A0%A1%8C%3D%18N%22%A7%109%A2%AB%A0%2C%10%0F)%19%19%0AV%B5V%22%9F%00%00%AC%9CZ*%0F%19%11W%0C%C4%C4W%20%C8%AA%8A%BA%85%BB%89%CC%BC%99(U%3E%11%0C%15%D8a%DA%D8%15%C4a%3C%CB%D0G%E2%87%E4%D1%94Z%22%3E%20%D8%26%26%DC%15%EE%F0%26_%CF%BA%BB%F7%83%F7%CE%E3%CE%CC%FF%FC%F6%E9%C3G%D0%DC%26j%EC*%2CP%10a%01%B6%85%0D%E11%E8%80%A8%60%3FC%D02%12%BC%D8%CC%DF%3E%8D%9EX%A4%88%F00%83%20%10%0B%16%9Et%D8%CEEEA%1E%07%E6%E3%08%90c%BF%99%E2%3E%F2%DB%F4%40%C15%13%3E%08%81P%40%E8%85%3Bw-%82%94%EB%083%26%CD%8D%20%9F%0E%0C%85b%DD%C3%26%8A%90%B0%AC%60c%C5RBQ%A3JmJ%D6f%CEN%18%14%5C%E1f%02%EB%A1%1AL%FF%B4i%B3%A1%E1%EB%D4%A68%03%3A%C5%2B%F6%E6NMU%AC%B1%A5%01%C1%10%10%03%3A%E0%D9%10s%AE1%22!%20%AEq%5B%10%B4P%11%2F%F0%B8%CAp%CC%99%90%10%C9%0F%B3%20%CA%B0%B5%02%07%C6%9D%3B%3B%99%F7%40%91%8F%A3%26t%00%89f%F0Q%EDH%3D%DE%3D%ACB%C8H%DDA3hds%40%24u%A4%DB%91%40%C0%5E%80%EB%C8%08%26%12%94%08%02%13W%1B%87%25P%CAA%DD)%F0%22%C0%BC%7C%B9w%BF%7Bi%83%EE%87JNT_pA%BD%DC0%12%A6%24%D1%EE%FD%2F%D9%8FR%C3%3A5%87%3C%92%87%F3%0AI%10%C6d%02%CA%A5%C3%0E%09T%B4%1DX%02%91%03%92~e%F1g%1F%25%1F%94%00%60f%99q%40%40%01%F6%D4wWM%1Fn4V_6a%12%02%0C6%0C%88!7a%E8%40%C0%01%01%84SV%84%22%D28%E2~%13r%82%03%09%3A%A4%A8b%05rq%20%C1%0E%05%FC%B0%08%89%F89%18%13%FF%84%E11%C5%C9%0D5p%E1%80%0E%1CTY%A5%03%08L%D0%C5%7C%C61%D2%1F'Q%981%C4%00%14P0%00%18%07t%11c%97%E1%7C%F9I%00%16%C49%06%9Bt%D6i%E7%9Dx%E6%A9%E7%9E%7C%F6%E9%E7%9F%80%06*%E8%A0%84%16j%E8%A1%96%08%20%00%A2%A0(%EA%A8%A3G(j%88%A4%91PJ)%A3%97F%BAh'%99%1E%9A%E9%A3%9Bj%3A%C8%A3%93B*)%A8%82%90Z%08%AA%90%8E%DA%AA%A5%A1r%1A%2B%AC%A9n%DA%A9%AB%84%D0Z%EB%AE%B9%DA%EAk%A9%A2%06%EB%C9%A7%BF%06%ABj%AF%BA%5E%0Aj%AC%C6%16%AB%E9%AB%AD~B%2C%AF%CAF%EB%EA%A9%CE%DE%8Ak%B3%D4%FA%AA%AD%26%D3r%DB%2B%22%D8%F2*%2C%B3%C9%16%5B%AD(%E1%A6%7B%AB%AA%D5z%CB%AC%B8%F1%AE%CBh4%DF%DE%2B%ED%BC%AB%E4%AB%AF%AC%FF%F2%E2o%C0%E0%1Ek%F0%A2%CB%22%AC%AD%BB%EA%FE%3A%B0%C0%CEv%8B%AA%B8%E3%8AJ%2B%94%C3%FC%3A%86%B1%B9%E9%1E%02%AF%C3%0D%DFyq%C8%DD%9A%8Bl%C8%1D%DB9r%C9%2C%7Fko%B9%14%D3%B9%F1%B9%24%03%7Bm%A8%13%3FL%B0%C9%3B%0F%9Bq%CF%40%17%AAs%D0%92%0C%BD%E7%C7%F5*%8C%F3%C7%BB%E6%0C%AD%B0*%CFJr%CA0%EB%CA%ED%C4%22K%DD%F2%D4%0A%B3%FC%AC%A9%3F%B3%D9.%D7%25%A7%0C%F5%D9YWL5%CA5%2B%0B%B5%D1%AC%20%BD%F4%D6%D1b%0D%AD%D5h%DF%0B7%D1%8E%EC%CD%F7%DF%80%07.%F8%E0%84%17n%F8%E1%88'%AEx(%81%00%00%3B";
    }

    var fullDomain = getFullDomain(href);
    var protocol = "unknown";
    var site = fullDomain;
    if (site.indexOf("http://") == 0) {
        site = site.substring(7, site.length);
        protocol = "http://";
    } 
    else if (site.indexOf("https://") == 0) {
        site = site.substring(8, site.length);
        protocol = "https://";
    }
    
    var preview = "http://"+getGPSub(site)+".googlepreview.com/preview?s=" + protocol + site + "&ra=1";
	if (!isAmazonCOM(href)) {
		return preview;
	}
	var isbn = getASIN(href);
	if (isbn != null) {
		if (isAmazonCOM(href)) {			
			return "http://images.amazon.com/images/P/" + isbn + ".01.TZZZZZZZ.jpg";
		}
	}

    return preview;
}

// 切换 googlepreview 服务器，强力获取缩略图
function switchImageURL(src){
	if(src.indexOf('open.thumbshots.org') > 0) {
		return "data:image/gif;base64,R0lGODlhbwBSAKIAAMzMzP///+Xl5e/v79XV1d/f3/n5+QAAACH5BAAHAP8ALAAAAABvAFIAAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd/wMOA8ZRg9l06nGAIHgiMwMNwFBMmnIjpYBjsEApIQyO4KggHBICgoxtCujjs2EAQBwPWjPbt3BgD0HWdyoWJ7SHsFYnMedWp1YkYBhYVPUIVEYmN6cIccfF1qCgBHO2JykYZMQAByBZ+ZmgUFdYmVXGdmkU9ZmK5+rJpOvD2Jv8IUs8M4vsYiZL5ITklhTFFwTQtQBsjJE4xlXWF8AFq4AlxyXrpvldkWkApu7XKr3H3loWOzpeoTwfjwU5j9i8IVKZYvQpprcY6Q8+epT0BOjmoVlPBqjJ8spxjO62So/9K4iS+WpAHZoqJEkihTquxAJko0Xy2L6HC5ssKdAWbGbfGjQ45OfDUn5KniackYdmBGjgrqY5yZpeGcQfnH1GbDOnme1NKitCoxLwHcgHWEy1Yfr2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx58qCU2Dj8iNDl8IXEMVXtWefgIAVwWApIzbHpBeQrBDZ0dAPAV+tfoBpjcgPOlSs8CVW/gUBZlMQ4znwLAhcVcZ6SjZlNQmXEXthZxlksb5Jl2msBwPh/z/OEy4HTuU6TZcPnhunrPd91u/Xhl+0m8zxqqV7tMppirPEvUJ9L10dWQb5cxA9nESIcu669m8IFOTwbo4gocmyG21DXedabTUuqddsuE+YGlxxALbJJbfnCcswN++V3DhhvwgRCMJ2u8VkCJTNDj2YS6tIOiAxoWE99oo3wDU1iXdIPeBt5V88lyLX74nGzb6fZRkEFKyMAmRLrxj3NnIAlEbmf0lqAHsqzWDm+soYKJI+DQdw+YMzawmWquKaCKExqiUhuWLVoRwjV2WgCNVoLlBkVmgA2SJ2GEFmrooYgmqlICADs=";
	}
	
	var site = (src.match(/s=http.*/i) + '').replace(/s=|&ra=1/ig,'');
	var srv = (src.match(/http.*\?s=/i) + '').replace(/\?s=/ig,'');
	var siteGPSub = getGPSub(site);
	var srvGPSub = getGPSub(srv);

	if (srvGPSub == 'a' && siteGPSub == srvGPSub){
		return "http://b.googlepreview.com/preview?s=" + site + "&ra=1";
	}
	if (siteGPSub == srvGPSub){
		return "http://a.googlepreview.com/preview?s=" + site + "&ra=1";
	}
	else if(srvGPSub == '0') {
		return 'http://open.thumbshots.org/image.pxf?url=' + site;
	}
	else if(srvGPSub.charCodeAt(0) + 4 == siteGPSub.charCodeAt(0)) {
		return "http://"+ String.fromCharCode(siteGPSub.charCodeAt(0) + 1) +".googlepreview.com/preview?s=" + site + "&ra=1";
	}

	return "http://"+ (srvGPSub.charCodeAt(0) + 4>122?'0':String.fromCharCode(srvGPSub.charCodeAt(0) + 4)) +".googlepreview.com/preview?s=" + site + "&ra=1";
}

// 给搜索结果条目添加序号
function addResultNums(doc){
	var elements = Pref.addAbout?matchNode('//div[@id="res"]/descendant::li[child::div[starts-with(@class,"s")] and descendant::a[@class="l"]][not(descendant::*[@class="gkk_num"])]/h3[1]', doc):matchNode('//div[@id="res"]/descendant::li/h3[1]', doc);
	//var elements = Pref.addAbout?matchNode('//div[@id="ires"]/descendant::li/div/descendant::h3[1]', doc):matchNode('//div[@id="ires"]/descendant::li/descendant::h3[1]', doc);
	var i, len = elements.snapshotLength;
    for (i = 0; i < len; i++) {
        var num = document.createElement('div');
		num.setAttribute('class','gkk_num');
        num.innerHTML = '&nbsp;' + (ResultNum++) + '&nbsp;';
		var element = elements.snapshotItem(i);
		element.parentNode.insertBefore(num, element);
    }
}

// 添加缩略图预览
function addPreviews(doc){
    var resTables = matchNode('//li[(@class="g" or starts-with(@class,"g ")) and ancestor::div[@id="res"]][not(descendant::*[@class="gkk_previewimg"])]', doc);
	var i, len = resTables.snapshotLength;
    for (i = 0; i < len; i++) {
		var h3 = resTables.snapshotItem(i).getElementsByTagName('h3')[0];
		var link = resTables.snapshotItem(i).getElementsByTagName('a')[0];
        var a = document.createElement('a');
		a.setAttribute('target','_blank');
		a.setAttribute('href',link.href);
		var imgBlank = document.createElement('img');
		with(imgBlank){
			setAttribute('class', 'gkk_previewimg');
			setAttribute('align', 'left');
			src="data:image/gif;base64,R0lGODlhbwBSAKIAAMzMzP///+Xl5e/v79XV1d/f3/n5+QAAACH5BAAHAP8ALAAAAABvAFIAAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd/wMOA8ZRg9l06nGAIHgiMwMNwFBMmnIjpYBjsEApIQyO4KggHBICgoxtCujjs2EAQBwPWjPbt3BgD0HWdyoWJ7SHsFYnMedWp1YkYBhYVPUIVEYmN6cIccfF1qCgBHO2JykYZMQAByBZ+ZmgUFdYmVXGdmkU9ZmK5+rJpOvD2Jv8IUs8M4vsYiZL5ITklhTFFwTQtQBsjJE4xlXWF8AFq4AlxyXrpvldkWkApu7XKr3H3loWOzpeoTwfjwU5j9i8IVKZYvQpprcY6Q8+epT0BOjmoVlPBqjJ8spxjO62So/9K4iS+WpAHZoqJEkihTquxAJko0Xy2L6HC5ssKdAWbGbfGjQ45OfDUn5KniackYdmBGjgrqY5yZpeGcQfnH1GbDOnme1NKitCoxLwHcgHWEy1Yfr2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx58qCU2Dj8iNDl8IXEMVXtWefgIAVwWApIzbHpBeQrBDZ0dAPAV+tfoBpjcgPOlSs8CVW/gUBZlMQ4znwLAhcVcZ6SjZlNQmXEXthZxlksb5Jl2msBwPh/z/OEy4HTuU6TZcPnhunrPd91u/Xhl+0m8zxqqV7tMppirPEvUJ9L10dWQb5cxA9nESIcu669m8IFOTwbo4gocmyG21DXedabTUuqddsuE+YGlxxALbJJbfnCcswN++V3DhhvwgRCMJ2u8VkCJTNDj2YS6tIOiAxoWE99oo3wDU1iXdIPeBt5V88lyLX74nGzb6fZRkEFKyMAmRLrxj3NnIAlEbmf0lqAHsqzWDm+soYKJI+DQdw+YMzawmWquKaCKExqiUhuWLVoRwjV2WgCNVoLlBkVmgA2SJ2GEFmrooYgmqlICADs=";
		}
        var img = document.createElement('img');
		with (img) {
			setAttribute('class', 'gkk_previewimg');
			setAttribute('title', Lng.preview_title);
			setAttribute('align', 'left');
			setAttribute('src', getImageURL(link.href));
			style.display='none';
            addEventListener("load", function(e){
            	// 先移除空白图，再显示出真正的缩略图
            	e.target.parentNode.removeChild(e.target.previousSibling);            	
            	e.target.style.display = '';
            }, false);
            if(Pref.PreviewEnhance){
            	addEventListener("error", function(e){
            		e.target.style.border = '1px solid blue';
            		e.target.src = switchImageURL(e.target.src);
            	}, false);
            }
		}
		a.appendChild(imgBlank);
		a.appendChild(img);
        h3.parentNode.insertBefore(a, h3);
    }
}

// 添加站点 Favicon
function addFavicons(doc){
    var resTables = matchNode('//li[(@class="g" or starts-with(@class,"g ")) and ancestor::div[@id="res"]][not(descendant::*[@class="gkk_favicon"])]', doc);
	var i, len = resTables.snapshotLength;
    for (i = 0; i < len; i++) {
		var h3 = resTables.snapshotItem(i).getElementsByTagName('h3')[0];
		var base = h3.getElementsByTagName('a')[0].href.match(/http:\/\/[\w\.\-]+\/|https:\/\/[\w\.\-]+\//);
        var img = document.createElement('img');
		with (img) {
			setAttribute('class','gkk_favicon');
            addEventListener("load", function(e){
                e.target.style.display = 'inline';
                e.target.style.visibility = 'visible';
            }, false);
            src=base + 'favicon.ico';
		}
        h3.parentNode.insertBefore(img, h3);
    }
}

// 添加 “GoogleKingKong 设置”
function addPreferences(){
try{
	var guser = matchNode('//div[@id="guser"]/nobr').snapshotItem(0);
	//*****************
	var genuser = matchNode('//div[@id="gbd5"]/div/ol').snapshotItem(0);
	//*****************
	//var genuser = matchNode('//div[@id="appbar"]/div/ol/li/div/ul').snapshotItem(0);
	var preferences = document.createElement('a');
	if (guser) {
		with (guser) {
			appendChild(document.createTextNode(' | '));
			appendChild(preferences);
		}
	}
	if(genuser)
	{
	    //*************************
		var split = document.createElement('li');
		split.setAttribute("class","gbmtc");
		var spliter = document.createElement('div');
		spliter.setAttribute("class","gbmt gbmh");
		split.appendChild(spliter);
		//************************
		
		var preferencesli = document.createElement('li');
		
		//************************
		preferencesli.setAttribute("class","gbkp gbmtc");
		//************************
		//preferencesli.setAttribute("class","ab_dropdownitem");
		preferencesli.appendChild(preferences);
		with (genuser) {
			//**********************
			preferences.setAttribute("class","gbmt");
			//**********************
			
			//preferences.setAttribute("class","ab_dropdownlnk");
			
			//*********************
			appendChild(split);
			//*********************
			appendChild(preferencesli);
		}
	}
    with (preferences) {
        setAttribute('href', 'javascript: void(0);');
        //innerHTML = '<div>'+ Lng.preference + '</div>';
        innerHTML = Lng.preference;
        addEventListener('click', function(){
			var tbd = document.getElementById('tbd');
			optionsBox = tbd ? getComputedStyle(tbd,'').display != 'none' : false; // 如果打开了百宝箱，则做个标记，在设置界面的效果预览显示百宝箱的占位符
			optionsBoxMarginLeft = tbd ? tbd.clientWidth : 0; // 百宝箱宽度
            setPreferences();
        }, false);
    }
}
catch(e){
	printErrorLog(arguments.callee.toString().match(/^function\s*[^\(]+?\(/ig).toString().replace(/function\s*/ig,'') + ')', e);
}
}

// 浮动搜索框
function floatInput(){
    var css ;
	var header = document.createElement('div');
	var cnt = document.getElementById('cnt');
	cnt.parentNode.insertBefore(header, cnt);

	with (header) {
		appendChild(document.getElementById('gog'));
		appendChild(document.getElementById('sfcnt'));
		setAttribute('id', 'gkk_header');
		switch (Pref.floatInputPos) {
			case 1: // 顶部
				var rplheader = document.createElement('div');
				rplheader.setAttribute('id','gkk_rplh');
				parentNode.insertBefore(rplheader, header);

				if (Pref.OtherEnginsFloat) {
					appendChild(document.getElementById('subform_ctrl'));
					GM_addStyle('#sfcnt {padding-top: 7px;} #cnt {padding-top: 7px;}');
					rplheader.style.height = header.offsetHeight + 'px';
					css = '#gkk_header {position: fixed; top: 0px; width: 99%; background-color: white; border-bottom: 1px solid blue; padding-bottom: 2px; z-index: 10;}';
				}
				else {
					GM_addStyle('#sfcnt {padding-top: 7px; height: 55px} #cnt {padding-top: 7px;}');
					rplheader.style.height = header.offsetHeight-(isChrome?0:3) + 'px';
					css = '#gkk_header {position: fixed; top: 0px; width: 99%; background-color: white; border-bottom: 1px solid blue; z-index: 10;}';
				}
				
				break;
			case 2: // 底部
				var rplheader = document.createElement('div');
				document.body.appendChild(rplheader);

				if (Pref.OtherEnginsFloat) {
					appendChild(document.getElementById('subform_ctrl'));
					rplheader.style.height = header.offsetHeight + 'px';
					css = '#gkk_header {position: fixed; bottom: 0px; width: 99%; background-color: white; border-top: 1px solid blue; z-index: 10;}';
				}
				else {
					GM_addStyle('#sfcnt {padding-top: 7px; height: 55px} #cnt {padding-top: 7px;}');
					rplheader.style.height = header.offsetHeight + 'px';
					css = '#gkk_header {position: fixed; bottom: 0px; width: 99%; background-color: white; border-top: 1px solid blue; z-index: 10;}';
				}

				// 页面顶部导航条中“更多”点击后向上弹出
				css += ' #gbi {top: auto !important; bottom: ' + (header.offsetHeight+5) +'px;}';
				break;
		}
	}

	// 隐藏分割线；修正页面顶部导航条中“更多”点击后显示空白的问题
	css += ' .gbh {display: none;} #gbs {display: none;}';

	GM_addStyle(css);
}

// 添加 其他搜索引擎
function addSearchWithOtherEngines(){
    var div = document.getElementById('subform_ctrl');

    if (div) {
		var gbEngines = [], gbLinks = [];
        var keyword = getKeyword();
		var engines = Pref.OtherEngines.split(/\n/);
		for(var i=0;i<engines.length;i++){
			var engine = engines[i].split('|');
			if(engine.length>1){
				var searchEngine = document.createElement('a');

                if (engine[1].indexOf('{gb:word}') >= 0) {
                    gbEngines.push(engines[i]);
					gbLinks.push(searchEngine);
                }
                else {
					with (searchEngine){
					    setAttribute("class", "gkk_oe");
						setAttribute('href', engines[i].replace(engine[0] + '|','').replace(/{word}/ig, encodeURIComponent(keyword)));
                    	setAttribute('target', Pref.OtherEnginesTarget);
                    	innerHTML = engine[0].replace(/{word}/ig, keyword.replace('<','&lt;').replace('>','&gt;'));
					}
	        		div.appendChild(document.createTextNode(' '));
                }
        		div.appendChild(searchEngine);
			}
		}

		// 如果关键字需要替换成 GB2312 的编码
		if (gbEngines.length>0 && !isChrome){
			replace2GB(div, gbEngines, gbLinks, keyword);
		}

    }
}

// 将其他搜索引擎中的搜索关键字替换成 GB2312 编码格式。编码通过查询 baidu 获得
function replace2GB(div, gbEngines, gbLinks, keyword){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(keyword),
        overrideMimeType: 'text/xml; charset=gb2312',
        onload: function(resp){
            if (resp.status < 200 || resp.status > 300) {
                return;
            }
			
			var keywordGB = String(resp.responseText.match(/word=[^'"&]+['"&]/i)).replace(/word=|['"&]/ig,'');
			var i, len = gbEngines.length;
			for(i=0;i<len;i++){
				var engine = gbEngines[i].split('|');
				var searchEngine = document.createElement('a');
				with (searchEngine) {
					setAttribute('href', gbEngines[i].replace(engine[0] + '|', '').replace(/{gb:word}/ig, keywordGB));
					setAttribute('target', Pref.OtherEnginesTarget);
					innerHTML = engine[0].replace(/{word}|{gb:word}/ig, keyword.replace('<','&lt;').replace('>','&gt;'));
				}
				div.replaceChild(searchEngine, gbLinks[i]);
				div.insertBefore(document.createTextNode(' '),searchEngine);
			}
		
			// 如果搜索框浮动在顶部并且其他引擎跟随浮动，那么需要在添加完其他引擎后重新安排一下 replaceheader 的高度
			if (Pref.floatInput && Pref.floatInputPos == 1 && Pref.OtherEnginsFloat) {
				var rplh = document.getElementById('gkk_rplh');
				var hc = document.getElementById('gkk_header');
				rplh.style.height = hc.offsetHeight + 'px';
			}
		},
        onerror: function(){
            return;
        }
    });
}

// 禁止Google记录我的点击情况
function removeTracking(doc){
	var links = matchNode('//div[@id="res" or @id="resAbout"]/descendant::a[@onmousedown]',doc);
	var i, len = links.snapshotLength;
    for (i = 0; i < len; i++) {
        links.snapshotItem(i).removeAttribute('onmousedown');
    }
    //避免误伤"imgurl=http"
    links = matchNode('//div[@id="res" or @id="resAbout"]/descendant::a[contains(@href, "url?url=http://")]',doc);
    //links = matchNode('//div[@id="res"]/descendant::a[contains(@href, "=http://")]\
    //|//div[@id="resAbout"]/child::div/*[not(contains(@id,"imagebox_bigimages"))]/descendant::a[contains(@href, "=http://")]',doc);
	len = links.snapshotLength;
	var link;
    for (i = 0; i < len; i++) {
    	link = links.snapshotItem(i);
    	link.href = unescape(link.getAttribute('href').match(/http[^&]+/ig));
    }
}

// 强制在新页面打开链接
function OpenInNewTabs(doc){
	var links = matchNode('//a[(@class="l" and ancestor::div[@id="res" or @id="resAbout"]) or (ancestor::div[@id="resAbout"])]',doc);
	var i, len = links.snapshotLength;
    for (i = 0; i < len; i++) {
        links.snapshotItem(i).setAttribute('target','_blank');
    }	
}

// 添加“在此站点中搜索”
function addseatchSite(doc){
	if(location.href.indexOf(escape('site:'))>=0){
		return; // 如果已经是 site： 搜索了则退出
	}

    // 将点击搜索按钮的 Javascript 添加到 head 中
    if (!document.getElementById('ClickSearchBtnJS')) {
        var head = document.getElementsByTagName("head")[0];
        var ClickSearchBtnJS = document.createElement('script');
		with(ClickSearchBtnJS){
        	setAttribute('id', 'ClickSearchBtnJS');
        	type = "application/x-javascript";
        	innerHTML = '\
			function searchSite(url){\
				document.forms[0].q.value += " site:" + url;\
				document.forms[0].submit();\
			}';
		}
        head.appendChild(ClickSearchBtnJS);
    }
	
//	var cites = matchNode('//cite[ancestor::ol/li[@class="g" or starts-with(@class,"g ")] and following-sibling::span[@class="gl"]]',doc);
//	var cites = matchNode('//cite[1][ancestor::ol/li[@class="g" or starts-with(@class,"g ")] and following-sibling::span[@class="vshid"]]',doc);
    var cites = matchNode('//cite[1][ancestor::ol/li[@class="g" or starts-with(@class,"g ")] and following-sibling::div[descendant::a[contains(text(),"网页快照")]]]',doc);
	var i, len = cites.snapshotLength;
    for (i = 0; i < len; i++) {
		var site = cites.snapshotItem(i).innerHTML.replace(/<[^>]*>/ig,'').split('/')[0];
		//如果结果地址为https则向后推移2个斜杠获取域名
		if(site.indexOf('https:') == 0) {
        site = cites.snapshotItem(i).innerHTML.replace(/<[^>]*>/ig,'').split('/')[2];
        } 
		var a = document.createElement('a');
		with(a){
			innerHTML = Lng.site_filter;
			setAttribute('href','javascript:searchSite("' + site + '")');
		}
		/**************************************************************
		var span = cites.snapshotItem(i).nextSibling;
		while((span.nodeType != 1 && span != null) || span.className != 'vshid') {
			span = span.nextSibling;
		};
		if(span == null) continue;
        with (span) {
            appendChild(document.createTextNode(' - '));
            appendChild(a);
        }
        *********************************************************************/
        var span = document.createElement('span');
        with (span) {
            setAttribute('class', 'gl');
            setAttribute('style', 'white-space:normal;font-size:14px');
            appendChild(document.createTextNode(' - '));
            appendChild(a);
        }
        cites.snapshotItem(i).parentNode.appendChild(span);
	}
	//统一”类似结果”搜索的CSS
	    var vshid = matchNode('//span[@class="vshid"]',doc);
	    var i, len = vshid.snapshotLength;
	    if (len > 0) {for (i = 0; i < len; i++) {vshid.snapshotItem(i).setAttribute('class', 'vshid gl');}}
	
}

// 将相关搜索提示移到页面上部
function moveSearchTip2Top(marginLeft, doc){
    var relDivs = matchNode('//div[@id="gkk_rel"]|//div[@id="brs"]', doc);
	var len = relDivs.snapshotLength, relDiv;
    if (len > 0) {
        var firstDiv = matchNode('//div[@id="resAbout"]', doc).snapshotItem(0);
        if (!firstDiv) {
        	firstDiv = matchNode('//div[@id="res"]', doc).snapshotItem(0);
        }
        for(var i=0;i<len;i++){
        	relDiv = relDivs.snapshotItem(i);
        	firstDiv.parentNode.insertBefore(relDiv,firstDiv);
        	relDiv.setAttribute('class',relDiv.getAttribute('class') + ' gkk_tope');
        }
    }
    GM_addStyle('#brs {margin-left: ' + marginLeft + 'px}');
}

// 添加百度的相关搜索提示
function addSearchTip(){

    var i, len;
    var resDiv = matchNode('//div[@id="res" and descendant::*[@id="gkk_page_1"]]').snapshotItem(0);
    if(!resDiv) return;
    var keyword = document.getElementsByName('q')[0].value;
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(keyword),
        overrideMimeType: 'text/xml; charset=gb2312',
        onload: function(resp){
            if (resp.status < 200 || resp.status > 300) {
                return;
            }
            var divContainer3 = document.createElement('div');
            divContainer3.innerHTML = resp.responseText;
            var relDiv = matchNode('//table[descendant::td[text() = "相关搜索"]]', divContainer3).snapshotItem(0);
            if (relDiv) { // 百度的相关搜索如果存在
            	relDiv = relDiv.parentNode;
                var As = matchNode('//a[starts-with(@href, "s?wd=")]', relDiv);
                var A;
                len = As.snapshotLength;
                // 将链接替换为 Google 的
                for (i = 0; i < len; i++) {
                    A = As.snapshotItem(i);
                    A.setAttribute('href', 'search?q=' + encodeURIComponent(A.textContent));
                }
                
                // 去掉无用的 tr，让样式更好看
                var tr = matchNode('//tr[descendant::td[text() = "相关搜索"]]/following-sibling::tr', relDiv).snapshotItem(0);
                tr.parentNode.removeChild(tr);
                
                relDiv.innerHTML = relDiv.innerHTML.replace('相关搜索', '相关搜索（百度）');
                relDiv.setAttribute('id', 'gkk_rel');
                relDiv.setAttribute('class', 'e');
                if (document.getElementById('preferences')) 
                    relDiv.style.display = 'none';
                GM_addStyle('#brs .s{width:8%; padding-left:10px; height:25px;}');
   				resDiv.appendChild(relDiv);
  
			    // 将相关搜索提示移到页面上部
	            if (Pref.SearchTipTop) {
                	relDiv.style.width='auto';
	                moveSearchTip2Top();
	            }
            }
            delete divContainer3;
        },
        onerror: function(){
            return;
        }
    });

}

// 分栏
function MultiCol(doc, pagecount, Pref){
try{
    var i, len;
	var ols = matchNode('//div[@id="ires"]/child::ol[descendant::li]', doc);
	var resContainer;
	len = ols.snapshotLength
	for(i = 0; i < len; i++){
		resContainer = ols.snapshotItem(i);
		if(!resContainer.getAttribute('id') || resContainer.getAttribute('id')=='rso'){ // 对地址包含 # 的页面，ajax 生成的 ol 的 id=rso，要把这个 id 也改掉以方便后面的 format() 统一格式
			resContainer.setAttribute('id','gkk_page_' + (pagecount));
		}

		// 如果打开了设置界面，那么不添加 class ，使得设置界面中的预览能够正常变化
		if(!document.getElementById('preferences'))	resContainer.setAttribute('class','gkk_MultiCol');
	}
    
	// 移动关于搜索关键字的新闻、焦点、视频、图片、博客等内容 
	//add:视频和新闻结果title被赋予了同级<li>标签，需要分别处理
	
	var videotitle = matchNode('//div[@id="res"]/descendant::ol/li[@class="head" and descendant::a[contains(text(),"视频")]]', doc);
	var resAbouttitle;
	len = videotitle.snapshotLength
	for(i = 0; i < len; i++){
		resAbouttitle = videotitle.snapshotItem(i);
		}
    
    var videobox = matchNode('//div[@id="res"]/descendant::ol/li[@id="videobox"]', doc);
    var resAboutvideo;
    len = videobox.snapshotLength
	for(i = 0; i < len; i++){
		resAboutvideo = videobox.snapshotItem(i);
		}
	
	/*var newstitle = matchNode('//div[@id="res"]/descendant::ol/li[@class="head" and descendant::a[contains(text(),"新闻")]]', doc);
	var newsAbouttitle;
	len = newstitle.snapshotLength
	for(i = 0; i < len; i++){
		newsAbouttitle = newstitle.snapshotItem(i);
		}
    
    var newsbox = matchNode('//div[@id="res"]/descendant::ol/li[@id="newsbox"]', doc);
    var resAboutnews;
    len = newsbox.snapshotLength
	for(i = 0; i < len; i++){
		resAboutnews = newsbox.snapshotItem(i);
		}*/
	
	var resAboutLis = matchNode('//div[@id="res"]/descendant::ol/li[@id="newsbox"]\
								|//div[@id="res"]/descendant::ol/li[@id="productbox"]\
								|//div[@id="res"]/descendant::ol/li[@id="imagebox_bigimages"]\
								', doc);								
	// 如果存在 id='timelinemain' 的元素，说明这是“时光隧道”页面，那么通过使 len=0 的方式，不做放入 resAbout 的处理
	//len = document.getElementById('timelinemain')? 0 : resAboutLis.snapshotLength;

    if (Pref.addAbout) {
		var resDiv = matchNode('//div[@id="res"]', doc).snapshotItem(0);

		// 每次点击搜索按钮后，必须先删除已有的 resAbout 。（这一步是为了处理 ajax 生成的页面）
		if (pagecount==1){
			var lastResAboutContainerDiv = document.getElementById('resAbout');
			if (lastResAboutContainerDiv) lastResAboutContainerDiv.parentNode.removeChild(lastResAboutContainerDiv);
		}
		//分开处理视频新闻结果和其它结果
		var e1 = videobox.snapshotLength;
		var e2 = resAboutLis.snapshotLength;
		//var e3 = newsbox.snapshotLength;
		
		//if (e1 > 0 || e2 > 0|| e3 > 0){
		if (e1 > 0 || e2 > 0){
        var resAboutContainerDiv = document.createElement('div');
        resAboutContainerDiv.setAttribute("id", "resAbout");
		resAboutContainerDiv.innerHTML = '<span>' + Lng.resAbout1 + '<font color="red">' + getKeyword().replace('<','&lt;').replace('>','&gt;') + '</font>' + Lng.resAbout2 + '</span><br>';
		var resAboutContainer = document.createElement('div');
		resAboutContainer.setAttribute('class','gkk_MultiCol');
		resAboutContainerDiv.appendChild(resAboutContainer);
		}
		
		if (e1 > 0) {
        for (i = 0; i < e1; i++) {
            var tablevideo = document.createElement('tablevideo');
            with (tablevideo) {
                setAttribute('class', 'g');
                innerHTML = '<tr><td>' + resAbouttitle.innerHTML + resAboutvideo.innerHTML + '</td></tr>';
            }
            resAboutContainer.appendChild(tablevideo);
            resAbouttitle.parentNode.removeChild(resAbouttitle);
            resAboutvideo.parentNode.removeChild(resAboutvideo);
        }
		}
		
		//做成table之后反而导致图片结果的hover zoom失效，不如直接移动。
		var resAboutLi;
		if (e2 > 0) {
        for (i = 0; i < e2; i++) {
            resAboutLi = resAboutLis.snapshotItem(i);
            //var table = document.createElement('table');
            //with (table) {
            //    setAttribute('class', 'g');
            //    innerHTML = '<tr><td>' + resAboutLi.innerHTML + '</td></tr>';
            //}            
            resAboutContainer.appendChild(resAboutLi); // 移动结果 Li
            //resAboutLi.parentNode.removeChild(resAboutLi); // 删除掉
        }
        }
        
        /*if (e3 > 0) {
        for (i = 0; i < e3; i++) {
            var tablenews = document.createElement('tablenews');
            with (tablenews) {
                setAttribute('class', 'g');
                innerHTML = '<tr><td>' + newsAbouttitle.innerHTML + '<br>' + resAboutnews.innerHTML + '</td></tr>';
            }
            resAboutContainer.appendChild(tablenews);
            newsAbouttitle.parentNode.removeChild(newsAbouttitle);
            resAboutnews.parentNode.removeChild(resAboutnews);
        }
		}*/
        if(resAboutContainerDiv){
        resDiv.parentNode.insertBefore(resAboutContainerDiv, resDiv);
        }
    }
    
	//Google改版后赋予"更多视频"单个链接<li>标签，将其合并以免条目拆断
    var videolinks = matchNode('//div[@id="res"]/descendant::ol/li/a[@class="fl"][contains(.,"的更多视频")]', doc);
	var videolink;
	len = videolinks.snapshotLength
	if(len > 0){
	for(i = 0; i < len; i++){
		videolink = videolinks.snapshotItem(i);
		videoli = videolink.parentNode;
		videoli.previousSibling.appendChild(videolink);
		videoli.parentNode.removeChild(videoli)
		}
    }
    
    //处理类似搜索查询的结果
    var exli = matchNode('//div[@id="res"]/descendant::ol[@id="gkk_page_1"]/li[@class="expl-group"]', doc).snapshotItem(0);
    if (exli && Pref.columns > 1) {
        var exh3 = matchNode('//div[@id="res"]/descendant::ol[@id="gkk_page_1"]/li[@class="expl-group"]/h3', doc).snapshotItem(0);
        exh3.setAttribute("style", "display:block;text-align:center;margin-top:5px");
        var exol = matchNode('//div[@id="res"]/descendant::ol[@id="gkk_page_1"]/li[@class="expl-group"]/ol', doc).snapshotItem(0);
        exol.setAttribute("class","gkk_MultiCol");
        exol.setAttribute("id","exol");
        exol.setAttribute("style","margin-top:5px");
        var exlichild = matchNode('//div[@id="res"]/descendant::ol[@id="gkk_page_1"]/li[@class="expl-group"]/*', doc);
        var exlis;
        len = exlichild.snapshotLength
        for(i = 0; i < len; i++){
		exlis = exlichild.snapshotItem(i);
		exli.parentNode.parentNode.appendChild(exlis);
		}
		exli.parentNode.removeChild(exli);
        //单独进行排序，这里一律采用横向
        var exolLis = matchNode('//div[@id="res"]/descendant::ol[starts-with(@id,"exol")]/li', doc);
        len = exolLis.snapshotLength;
        var cols = Pref.columns;
        for (var j = 0; j < cols; j++) {
            for (i = j; i < len; i += cols) {
                exol.appendChild(exolLis.snapshotItem(i));
            }
        }    
    }    

    // 移动搜索结果条目
    // 只有在横向，并且分栏数量大于1时才处理，重新排布搜索结果的顺序
    if (Pref.direction == 1 && Pref.columns > 1) {
        
        //如果是以图搜图页面需先处理“包含匹配图片的页面”项防止排序出错
        var cpp = matchNode('//li[descendant::h3[text() = "包含匹配图片的页面"]]', doc).snapshotItem(0);
        if(cpp){
        var ncpli = matchNode('//div[@id="res"]/descendant::ol[@id="gkk_page_1"]/li[child::div[not(table)]]', doc);
        var ncplis;
        len = ncpli.snapshotLength
        for(i = 0; i < len; i++){
		ncplis = ncpli.snapshotItem(i);
		resAboutContainer.appendChild(ncplis);
		} 
		var cppsp = document.createElement('span');
		cppsp.innerHTML = cpp.innerHTML;
		cppsp.setAttribute("style", "display:block;text-align:center;");
		document.getElementById('topstuff').appendChild(cppsp);
		cpp.parentNode.removeChild(cpp);
        }
		        
        //排序	
        var resLis = matchNode('//div[@id="res"]/descendant::ol[starts-with(@id,"gkk")]/li', doc);
        len = resLis.snapshotLength;
        var cols = Pref.columns;
        for (var j = 0; j < cols; j++) {
            for (i = j; i < len; i += cols) {
                resContainer.appendChild(resLis.snapshotItem(i)); // 移动结果 Li
            }
        }
    }
    
    //对google右边栏进行移动，维持分栏美观
    var rhs = matchNode('//div[@id="rhs_block"][descendant::div[@id="knop" or contains(@class,"knop") or @id="lu_pinned_rhs"]]', doc).snapshotItem(0);
    var resDiv = matchNode('//div[@id="res"]', doc).snapshotItem(0);
    if(rhs){
        resDiv.parentNode.insertBefore(rhs, resDiv.parentNode.firstChild);
        //rhs.setAttribute('style','padding-bottom: 1px;');
        }
}
catch(e){
	printErrorLog(arguments.callee.toString().match(/^function\s*[^\(]+?\(/ig).toString().replace(/function\s*/ig,'') + ')', e);
}							
}

// 统一格式，美化版面
function format(id, Pref){
    var i, j, len;
    var resContainer = document.getElementById(id) || document.getElementById('rtr'); // 百宝箱中选“最新结果”后，内容区的id为rtr
    var resTables = matchNode('//ol[@id="' + id + '" or @id="rtr"]/li[@class="g" or starts-with(@class,"g ") or @class="plus"]');
    len = resTables.snapshotLength;
    if (len > 0) {
        switch (Pref.displayMode) {
            case 1:
                break;
            case 2:
             /*
             * 由于使用的 -moz-column-count 样式分列，为了保持每一列顶部对齐，必须使得每列所包含的 child 数量一样，所以要插入 plusNum 个 table 充数
             */
                var modNum = len % Pref.columns;
                if (modNum > 0) {
                    // plusNum 为统一格式而补充的 table 数量; insertIndex 为需要插入补充 table 的位置
                    var plusNum = Pref.columns - modNum;
                    var insertIndex = Math.floor(len / Pref.columns);
                    
                    for (i = 0; i < plusNum; i++) {
                        var plustable = document.createElement('li');
                        plustable.setAttribute('class', 'plus');
                        plustable.innerHTML = '<br />';
                        resContainer.insertBefore(plustable, resTables.snapshotItem(len - 1 - insertIndex * i).nextSibling);
                    }
                }
                
                break;
            case 3:
                /*
             * 由于使用的 -moz-column-count 样式分列，为了保持每一列顶部对齐，必须使得每列所包含的 child 数量一样，所以要插入 plusNum 个 table 充数
             */
                var modNum = len % Pref.columns;
                if (modNum > 0) {
                    // plusNum 为统一格式而补充的 table 数量; insertIndex 为需要插入补充 table 的位置
                    var plusNum = Pref.columns - modNum;
                    var insertIndex = Math.floor(len / Pref.columns);
                    
                    for (i = 1; i <= plusNum; i++) {
                        var plustable = document.createElement('li');
                        plustable.setAttribute('class', 'plus');
                        plustable.innerHTML = '<br />';
                        resContainer.insertBefore(plustable, resTables.snapshotItem(insertIndex * i));
                    }
                }
                
                break;
            case 4:
                /*
             * 由于使用的 -moz-column-count 样式分列，为了保持每一列顶部对齐，必须使得每列所包含的 child 数量一样，所以要插入 plusNum 个 table 充数
             */
                var modNum = len % Pref.columns;
                if (modNum > 0) {
                    // plusNum 为统一格式而补充的 table 数量。这些 table 将补充在末尾。
                    var plusNum = Pref.columns - modNum;
                    
                    for (i = 0; i < plusNum; i++) {
                        var plustable = document.createElement('li');
                        plustable.setAttribute('class', 'plus');
                        plustable.innerHTML = '<br />';
                        resContainer.appendChild(plustable);
                    }
                }
                
                break;
        }
        
        var Highest, height, isDiff;
        var tables = matchNode('//ol[@id="' + id + '" or @id="rtr"]/li[@class="g" or starts-with(@class,"g ") or @class="plus"]');
        len = tables.snapshotLength;
        var rows = len / Pref.columns;
		var modHeight = isChrome? 0 : tables.snapshotItem(0).offsetHeight - parseInt(getComputedStyle(tables.snapshotItem(0),'').height);

		var modTables = [];
        for (j = 0; j < rows; j++) {
			isDiff = false;
            Highest = tables.snapshotItem(j).offsetHeight;
            // 找出同一行 table 中的最大高度
            for (i = j+rows; i < len; i += rows) {
                height = tables.snapshotItem(i).offsetHeight;
				if (height != Highest) {
					isDiff = true;
					if (height > Highest) {
						Highest = height;
					}
				}
            }

            if (isDiff == true) {
                // 将需要改变高度的 table 和其所需高度放入数组中
                for (i = j; i < len; i += rows) {
					var tmp = [];
					tmp.push(tables.snapshotItem(i));
					tmp.push(Highest);
					modTables.push(tmp);
                }
            }
        }
		

		// 让同一行的 table 具有相同的高度
		len = modTables.length;
		for(i=0;i<len;i++){
			modTables[i][0].setAttribute('style', modTables[i][0].getAttribute('style') + '; height: ' + (modTables[i][1] - modHeight) + 'px;');
		}

		// 由于 Chrome 对分列处理不完善，所以每列要分别去掉头尾两个条目的 margin-top 和 margin-bottom，以保证同一行的条目能够对齐
		if(isChrome){
			len = tables.snapshotLength;
			var rows = len / Pref.columns;
			// 掐头
			for(i=0;i<len;i+=rows){
				tables.snapshotItem(i).setAttribute('style', tables.snapshotItem(i).getAttribute('style') + '; margin-top: 0 !important;');
			}
			// 去尾
			for(i=rows-1;i<len;i+=rows){
				tables.snapshotItem(i).setAttribute('style', tables.snapshotItem(i).getAttribute('style') + '; margin-bottom: 0 !important;');
			}
		}

    }
}

// 向 head 中添加 CSS 样式
function addCSS(cssString){
    var head = document.getElementsByTagName("head")[0];
    var css = document.createElement('style');
	css.textContent = cssString;
    head.appendChild(css);
	return css;
}

// CSS 样式设置有选项变动时，更新预览效果
function cssOnChange(input){
	var i, len, cInput;
	var css = [];
	var inputs = matchNode('//input[@class="' + input.className + '"]');
	len = inputs.snapshotLength;
	
	for(i=0;i<len;i++){
		cInput = inputs.snapshotItem(i);
		if(cInput.value){
			css.push('    ' + cInput.name + ': ' + cInput.value + ' !important;');
		}
	}

	var textarea = matchNode('//textarea[@id="' + input.className + '_gen"]').snapshotItem(0);
	if(css.length==0){ // 如果没有 CSS 设置，则清空 textarea
		textarea.innerHTML = textarea.value = ''; // 赋值 innerHTML 是为了可以使用 XPath
	}
	else{
        switch (input.className) {
            case 'css_holder':
                css.unshift('.g {');
                break;
            case 'css_counter':
                css.unshift('.gkk_num {');
                break;
            case 'css_title':
                css.unshift('.l {');
                break;
            case 'css_desc':
                css.unshift('.s {');
                break;
            case 'css_keyword':
                css.unshift('em {');
                break;
            case 'css_url':
                css.unshift('cite {');
                break;
            case 'css_reflinks':
                css.unshift('.gl {');
                break;
            case 'css_related':
                css.unshift('#brs {');
                break;
        }
		css.push('}');
		textarea.innerHTML = textarea.value = css.join('\n'); // 赋值 innerHTML 是为了可以使用 XPath
	}
	prefOnChange();
}

// 设置界面有选项变动时，更新预览效果
var previewCss;
function prefOnChange(){
	var i, len;
	var numcol = document.getElementById('numcol');
	var direction = document.getElementById('direction');
	var mode = document.getElementById('mode');
	var gkk_pref_Pref = {
		
		// 分栏数量，默认 2
		columns			: Number(numcol.options[numcol.selectedIndex].value)
		
		// 搜索结果的排列方向：1-横向；2-纵向（默认）
		,direction		: Number(direction.options[direction.selectedIndex].value)

		// 显示模式：1-紧凑；2-对齐，但比较松散（默认）；3-对齐，但比较松散；4-对齐，但比较松散
		,displayMode	: Number(mode.options[mode.selectedIndex].value)

		// 给搜索结果条目添加序号，默认 关闭
		,addResultNum	: document.getElementById('addResultNums').checked

		// 添加缩略图预览，默认 关闭
		,addPreview		: document.getElementById('addPreviews').checked
		
		// 缩略图大小，默认 100%
		,PreviewSize	: isNaN(document.getElementById('PreviewSize').value)?'100':document.getElementById('PreviewSize').value

		// 添加站点 Favicon，默认 关闭
		,addFavicon		: document.getElementById('addFavicons').checked

		// 让搜索结果适合屏幕宽度，默认 关闭
		,fitwidth		: document.getElementById('fitwidth').checked

		// 添加“在此站点中搜索”
		,searchSite		: document.getElementById('searchSite').checked
		
		// 相关搜索移到页面上部
		,SearchTipTop	: document.getElementById('SearchTipTop').checked
	}

	// 阅读方向为“横向”时，排版模式将固定为“紧凑”或“对齐1”
	if(gkk_pref_Pref.direction==1 && gkk_pref_Pref.displayMode>2){
		gkk_pref_Pref.displayMode=2;
		document.getElementById('mode').options[1].selected=true;
	}
	
	// 获取 CSS 设置
	var css = '';
	var textareas = matchNode('//textarea[string-length(text())>0 and ancestor::table[@class="gkk_pref_css"]]');
	len = textareas.snapshotLength;
	for (i = 0; i < len; i++) {
		css += '#gkk_pref_gui ' + textareas.snapshotItem(i).value + '\n';
	}
	css += '#gkk_pref_gui ' + document.getElementById('customizeCSS').value;

	if(previewCss) previewCss.parentNode.removeChild(previewCss);
	previewCss = addCSS(css);
	
    var gkk_pref_res = document.getElementById('gkk_pref_res_ori').cloneNode(true);
    gkk_pref_res.setAttribute('id','gkk_pref_res');
    gkk_pref_res.removeAttribute('style');

    var links = matchNode('//a[@class="l" and ancestor::li/div]/parent::h3', gkk_pref_res);
	var gkk_pref_ResultNum = 1;
	len = links.snapshotLength;
    for (i = 0; i < len; i++) {
        var link = links.snapshotItem(i);
        // 添加缩略图预览
        if (gkk_pref_Pref.addPreview) {
            var div = document.createElement('div');
            div.setAttribute('style', 'border: 1px solid rgb(187, 187, 187); float: left; margin: 2px 4px 5px 0px; width: ' + 111 * Number(gkk_pref_Pref.PreviewSize) / 100 + 'px; height: ' + 82 * Number(gkk_pref_Pref.PreviewSize) / 100 + 'px; background-color: rgb(170, 170, 170);');
            link.parentNode.insertBefore(div, link);
        }
        // 给搜索结果条目添加序号
        if (gkk_pref_Pref.addResultNum) {
            var num = document.createElement('span');
			num.setAttribute('class','gkk_num');
            num.innerHTML = '&nbsp;' + (gkk_pref_ResultNum++) + '&nbsp;';
            link.parentNode.insertBefore(num, link);
        }
        // 添加站点 Favicon
        if (gkk_pref_Pref.addFavicon) {
            var div = document.createElement('div');
            div.setAttribute('style', 'border: 1px solid rgb(187, 187, 187); margin: 3px 4px -3px 0px; width: 16px; height: 16px; background-color: rgb(170, 170, 170); display: inline-block;');
            link.parentNode.insertBefore(div, link);
        }
    }
    
    // 添加“在此站点中搜索”
    if (gkk_pref_Pref.searchSite) {
    	var spans = matchNode('//li/div/span[@class="gl"]', gkk_pref_res);
		len = spans.snapshotLength;
		for(i=0;i<len;i++){
			var a = document.createElement('a');
			with(a){
				innerHTML = Lng.site_filter;
				setAttribute('href','javascript: void(0);');
			}
			var split = document.createTextNode(' - ');
			var span = spans.snapshotItem(i);
        	with (span) {
            	appendChild(split);
            	appendChild(a);
        	}
		}
    }

	// 适合宽度
    var divs = matchNode('//li/div[@class="s"]', gkk_pref_res);
	len = divs.snapshotLength;
    for (i = 0; i < len; i++) {
        if (gkk_pref_Pref.fitwidth) {
        	divs.snapshotItem(i).setAttribute('style','max-width: none !important;');
        }
        else {
        	divs.snapshotItem(i).setAttribute('style','max-width: 42em !important;');
        }
    }
	
    // 设置分栏格式
    MultiCol(gkk_pref_res, 'pref', gkk_pref_Pref);

	// 将相关搜索提示移到页面上部
    if (gkk_pref_Pref.SearchTipTop) {
		moveSearchTip2Top(0, gkk_pref_res);
    }

	// 先清除现有的预览效果
	var div = matchNode('//div[@id="gkk_pref_res" and not(@style)]').snapshotItem(0);
	if (div) div.parentNode.removeChild(div);

	// 添加新的预览效果
    document.getElementById('gkk_pref_preview').appendChild(gkk_pref_res);

	// 左对齐相关搜索
    if (gkk_pref_Pref.SearchTipTop) {
		var ml = getComputedStyle(matchNode('//div[@id="res"]', gkk_pref_res).snapshotItem(0), '').getPropertyValue('margin-left');
		GM_addStyle('#gkk_pref_preview #brs {margin-left: ' + ml + ' !important;}');
    } else {
		GM_addStyle('#gkk_pref_preview #brs {margin-left: 0px !important;}');
    }
    
	// 设置分栏数量
	var gkk_pref_container = document.getElementById('gkk_page_pref');
	gkk_pref_container.setAttribute('style','-moz-column-count: ' + gkk_pref_Pref.columns + '; -moz-column-gap: 1.5em; -webkit-column-count: ' + gkk_pref_Pref.columns + '; -webkit-column-gap: 0.5em;');

    // 统一格式，美化版面
	// 只有一列或者“紧凑”模式时不需要统一格式
    if (gkk_pref_Pref.columns > 1 && gkk_pref_Pref.displayMode > 1) {
        format('gkk_page_pref', gkk_pref_Pref);
    }
    
    // 如果是 Chrome 要把 ol 的高度增加2px，否则会错位
    if(isChrome){
    	gkk_pref_container.setAttribute('style', gkk_pref_container.getAttribute('style') + ' height: ' + (gkk_pref_container.offsetHeight+2) + 'px');
    }

}

// 添加 CSS 样式候选项
var lstVL=null;
function addList(target, options, style){
    if (!target || !options) 
        return;
    if (lstVL != null) {
        lstVL.parentNode.removeChild(lstVL);
        lstVL = null;
		return;
    }
    var input;
    var lst = document.createElement("div");
    lst.className = "virtual-list";
    if (target.nodeName.toUpperCase() == "INPUT") {
        input = target;
        lst.style.marginTop = input.offsetHeight + "px";
    }
    else {
        input = target.previousSibling;
        lst.style.marginLeft = -(input.offsetWidth) + "px";
    }

    lst.style.minWidth = (target.offsetWidth + input.offsetWidth - 4) + "px";
    lstVL = lst;
    var setVal = function(ev){
        input.value = ev.target.innerHTML;
        input.focus();
        input.blur();
        lstVL.parentNode.removeChild(lstVL);
        lstVL = null;
		cssOnChange(input);
    };
    var db = options.split(",");
    var len = db.length;
    for (var x = 0; x < len; x++) {
        var p = document.createElement("span");
        p.innerHTML = db[x];
        p.addEventListener("click", setVal, false);
        if (input.value == db[x]) 
            p.className = "selected";
        lst.appendChild(p);
    }
    target.appendChild(lst);
    return false;
};
	
function getColor(ev){
	var x = ev.layerX - 10, y= ev.layerY - 10;
    var Rmx = 0, Gmx = 0, Bmx = 0;
    if (y <= 32) {
        Rmx = 255;
        Gmx = (y / 32) * 255;
        Bmx = 0;
    }
    else 
        if (y <= 64) {
            y = y - 32;
            Rmx = 255 - (y / 32) * 255;
            Gmx = 255;
            Bmx = 0;
        }
        else 
            if (y <= 96) {
                y = y - 64;
                Rmx = 0;
                Gmx = 255;
                Bmx = (y / 32) * 255;
            }
            else 
                if (y <= 128) {
                    y = y - 96;
                    Rmx = 0;
                    Gmx = 255 - (y / 32) * 255;
                    Bmx = 255;
                }
                else 
                    if (y <= 160) {
                        y = y - 128;
                        Rmx = (y / 32) * 255;
                        Gmx = 0;
                        Bmx = 255;
                    }
                    else {
                        y = y - 160;
                        Rmx = 255;
                        Gmx = 0;
                        Bmx = 255 - (y / 32) * 255;
                    };
    var r, g, b;
    if (x <= 50) {
        r = Math.abs(Math.floor(Rmx * x / 50));
        g = Math.abs(Math.floor(Gmx * x / 50));
        b = Math.abs(Math.floor(Bmx * x / 50));
    }
    else {
        x -= 50;
        r = Math.abs(Math.floor(Rmx + (x / 50) * (255 - Rmx)));
        g = Math.abs(Math.floor(Gmx + (x / 50) * (255 - Gmx)));
        b = Math.abs(Math.floor(Bmx + (x / 50) * (255 - Bmx)));
    };
    r = r>255?255:r;
    g = g>255?255:g;
    b = b>255?255:b;
    var c = "#";
    c += Math.floor(r / 16).toString(16);
    c += (r % 16).toString(16);
    c += Math.floor(g / 16).toString(16);
    c += (g % 16).toString(16);
    c += Math.floor(b / 16).toString(16);
    c += (b % 16).toString(16);
    return c.toUpperCase();
};
	
function addColorPicker(target){
    var cp = document.getElementById("colorpicker");
    if (cp) {
        cp.parentNode.removeChild(cp);
		return;
    }
    cp = document.createElement("div");
    cp.id = "colorpicker";
    var input;
    if (target.nodeName.toUpperCase() == "INPUT") {
        input = target;
        cp.style.marginTop = input.offsetHeight + "px";
    }
    else {
        input = target.previousSibling;
        cp.style.marginLeft = "-100px";
    }
    var pre = document.createElement("span");
    var img = document.createElement("img");
    with (img) {
        src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADACAIAAAB9DVH7AAAABGdBTUEAALGPC/xhBQAAAAd0SU1FB9IIDwckH4KetsUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAsdEVYdENyZWF0aW9uIFRpbWUAVGh1IDE1IEF1ZyAyMDAyIDE5OjM0OjU1ICsxMjAwuqQvdAAABmlJREFUeNrtneGJHEcUhIWw4QQS7P3TDycgcAICRyBwAgJHIByBUAbCEQhnIGcghyBnIIdwCzJIYIOFxPT8ebd1Va97unt2a6hfu7Nzs9PfvVdTM9tz/15ZrooeFz0pelr0rOh50Yuil0Wvi94UvS16V/S+6EPRTdH/UQ+vFv3weNGPTxb99HTRz88W/fJ80a8vFr16uei314t+f7Poj7eL/ny36K/3i/7+sOjm5qu+LffveaEX7mB9R+iK0ENCB0WPisAGHxSBHfu+6NS3Ew6Wl5MHa1qO1k8BoNa/DoBivmD+39DL3QdrNsSui5gNMjsmImaycmRNwtF1ENPycqUqNsEG1sHLSJ/16LS26481xctkTemzIj6VPgsAxezYnX7dPmtun7U2puY+S+qPoFHaZ+3BZ63jxgz7dj6rnV93zTqPPKvSZ4ENMnmWfdZ8PguMGzPsa2Gq5EjKRZ1nTeyzVhOcs/LNI9OclbfP2nmeJZ0SAp/VlyPXrJ4+C5yvM+diPX2W86wLyLOAmvusLYuXyRqbZzGlqnlk6uuG++yGQ8qZJPusnZN1evncSMegVlue6GCZrAw1n4riKyss6x2k8ZWoI6E+9JmsRmSB4w04AmUorszgE1n7FLS+VckRRsxk1ZEVjy7DEaAmIrZdzQL0SazdipjJ2sw6gBGQ+mOsYkzNqqxQ68fJCuWatRlZkQjwFsMRU8WYmhUrlMQaQMzdcHTNyvVHQITks4Bxl3pfRMw1awOypHYG1pHQyNUsaR1p57H/MllD86zKkYyMNEHDedbceVau1wBqbghJbTHXnZ1nTZNnSYiBxsQkCgxHOcTA9zJZffMsMEqAGulMkKlZoGNKiDnP2lWexUSUADpQs0AGm2t5Pjcc3Q1zASnIGGLmKdUscHFI8n3OsybOs1rd0CD5rIgYuAze8DYIkzX0RPpzazGIgVcY6O58xWSNJOuqkQ7Ery+kV+JNrolXTNY2ZHWg5nD6xzsAHwkWIHfDvmSBAy8BtYLwIAjgA6CLW17XYSYIiN+LYs1k1ZLFHHgwbpGaVjUrAsXgA6hZV3bNGu2zwOBUVjGpZsW31u3E4pVri7cUL5PVvhtWAgWqT85nRWokoECpQlXMZG1YsySgwMqAI6lR5oBKWnmTlSQrx0hcBzDCcBTXkf567QmgydpTniWhkXP5YJ0mYJqs7nmW1H0YNK4JgYwh169ds/qSxThdCSiGNaZmMecGElDOs/aQZwGgDsoFG2C4JI4YoFyzpjk3rGyUTJouicn7nWftIc+SfM1BuTzD+Cwm789dLnQ3HJ3BS6UqvsLco5CrWZVyN5wvdZDoGyLnWdOR9R8h5ia+fwgdg5hPMX+d+RYma0uyKjlab8cEIHwsOqY0iDWT1apmdShVEmKji5fJypHFHG/mdwuRGqbl5SbQ6saayZrSZzH9EUD38bTss87OZ0nFC1SxSp/VlzWT1dNnVSLW3Gcx+2OfNZ/P2q7lNfdZK7NNWDNZE/gsMJKVPst51mXnWasYIo6p3+HnWIvI22ftPM8CPltCjDklYPbn3yL7rD34LKnl5SbQYk4SnWddUp7V02cBlxf3ORYv+6w9+KwcR4zP8nVD+6ymiEm9Type9lmDuuEQ1hjomEbJ5Fl3enqTtTFZp5fznz3LZLUny7NnmaymZHn2LJPVlCzPnuWa1d1nXfTsWSarfTf07Fkma+OaddGzZ5msJFmePcs+a2951pnMnmWyuuZZFzR7lslqRpZnzzJZM+VZZzt7lsnqcW5Y2Sh3OXuWyeqRZ13i7Fkmq0cGf4mzZ5mswRHN2c6eZbJGHaztHtjaassmaz6ypAEETzg9Ek9TlX6805U+k9WMLHC8pQc2H08/epfBBzziPD7rvJIjhJjJqiULPBwecASokZ4JXVmzAH0Sa7cgZrI2tA5gBKT+GKsYU7MqK9T6capCuWZtSFYkArzFcMRUMaZmxQolsQYQczccXbNy/REQIfksYNyl3hcRc83agCypnYF1JDRyNUtaR9p55L9M1uA8q3IkIyNN0HCeNXeeles1gBppMhqmLea6s/OsafIsCTHQmI7KTCGAoxxi4HuZrL55FhglQI10JsjULNAxJcScZ+0qz2IiSgAdqFkgg821PJ8bju6GuYAUZAwx85RqFrg4JPk+51kT51mtbmiQfFZEDFwGb3YbhMkSli9l5MGTJ+WhBgAAAABJRU5ErkJggg==";
        addEventListener("mousemove", function(ev){
            var c = getColor(ev);
            pre.style.background = c;
        }, false);
        addEventListener("click", function(ev){
            var c = getColor(ev);
            input.value = c;
            input.focus();
            input.blur();
            cp.parentNode.removeChild(cp);
            cssOnChange(input);
        }, false);
        addEventListener("mouseout", function(ev){
            cp.parentNode.removeChild(cp);
        }, false);
    }
    cp.appendChild(img);
    cp.appendChild(pre);
    target.appendChild(cp);
    return false;
};

// 生成 CSS 选项的 table
function addCssTable(type, tableStyle, css){
	css = (css + '').replace(/null/ig,'');
	return '        <table id="gkk_pref_css_' + type + '" class="gkk_pref_css" style="' + tableStyle +'">\
            <tbody>\
                <tr>\
                    <td>\
                        <label>\
                            Font-Size:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="font-size" size="8" type="text" value="' + ((css.match(/\sfont-size:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Font-Color:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="color" size="8" type="text" value="' + ((css.match(/\scolor:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Font-Weight:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="font-weight" size="8" type="text" value="' + ((css.match(/\sfont-weight:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Text-Decoration:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="text-decoration" size="8" type="text" value="' + ((css.match(/\stext-decoration:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Text-Align:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="text-align" size="8" type="text" value="' + ((css.match(/\stext-align:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            White-Space:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="white-space" size="8" type="text" value="' + ((css.match(/\swhite-space:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Background-Color:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="background-color" size="8" type="text" value="' + ((css.match(/\sbackground-color:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Border-Color:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="border-color" size="8" type="text" value="' + ((css.match(/\sborder-color:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Border-Style:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="border-style" size="8" type="text" value="' + ((css.match(/\sborder-style:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Border-Width:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="border-width" size="8" type="text" value="' + ((css.match(/\sborder-width:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Margin-Left:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="margin-left" size="8" type="text" value="' + ((css.match(/\smargin-left:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Padding-Left:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="padding-left" size="8" type="text" value="' + ((css.match(/\spadding-left:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Margin-Right:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="margin-right" size="8" type="text" value="' + ((css.match(/\smargin-right:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Padding-Right:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="padding-right" size="8" type="text" value="' + ((css.match(/\spadding-right:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Margin-Top:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="margin-top" size="8" type="text" value="' + ((css.match(/\smargin-top:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Padding-Top:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="padding-top" size="8" type="text" value="' + ((css.match(/\spadding-top:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Margin-Bottom:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="margin-bottom" size="8" type="text" value="' + ((css.match(/\smargin-bottom:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Padding-Bottom:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="padding-bottom" size="8" type="text" value="' + ((css.match(/\spadding-bottom:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <label>\
                            Float:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="float" size="8" type="text" value="' + ((css.match(/\sfloat:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                    <td>\
                        <label>\
                            Clear:\
                        </label>\
                    </td>\
                    <td>\
                        <input class="css_' + type + '" name="clear" size="8" type="text" value="' + ((css.match(/\sclear:[^!]*!/i) + '').replace(/.*:\s*|\s*!|null/ig,'') + '') + '"><span class="gkk_pref_css_span">▼</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td colspan="4">\
                        <label>\
                        	' + Lng.gui_options_css_gen + ' ：\
                        </label><br>\
                        <label>\
                        	<textarea id="css_' + type + '_gen" rows="5" cols="62" wrap="off" style="font-size: small;" readonly>' + css + '</textarea>\
                        </label>\
                    </td>\
                </tr>\
            </tbody>\
        </table>\
';
}

// 闪动指定的元素
var pCss;
function blink(el, count){
	if(count>5){
		return;
	}
	pCss = addCSS('#gkk_pref_gui ' + el + ' {border:1px solid red !important;}' );
    setTimeout(function(){
		pCss.parentNode.removeChild(pCss);
        setTimeout(function(){
            blink(el, ++count);
        }, 150);
    }, 150);
}

// 设置参数
function setPreferences(){
	var i, len;

	var bodyElements = [], bodyElementsDisplay = [];
	var allElements = document.body.childNodes;
	len = allElements.length;
	for(i=0;i<len;i++){
		if (allElements[i].nodeType == 1 && getComputedStyle(allElements[i],'').display != 'none'){
			bodyElements.push(allElements[i]);
			bodyElementsDisplay.push(getComputedStyle(allElements[i],'').display);
			allElements[i].style.display='none';
		};
	}

	var code2keyTable={'65':'A','66':'B','67':'C','68':'D','69':'E','70':'F','71':'G','72':'H','73':'I','74':'J','75':'K','76':'L','77':'M','78':'N','79':'O','80':'P','81':'Q','82':'R','83':'S','84':'T','85':'U','86':'V','87':'W','88':'X','89':'Y','90':'Z','48':'0','49':'1','50':'2','51':'3','52':'4','53':'5','54':'6','55':'7','56':'8','57':'9','96':'Numpad 0','97':'Numpad 1','98':'Numpad 2','99':'Numpad 3','100':'Numpad 4','101':'Numpad 5','102':'Numpad 6','103':'Numpad 7','104':'Numpad 8','105':'Numpad 9','106':'Numpad *','107':'Numpad +','108':'Numpad Enter','109':'Numpad -','110':'Numpad .','111':'Numpad /','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','8':'BackSpace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Control','18':'Alt','20':'Cape Lock','27':'Esc','32':'Spacebar','33':'Page Up','34':'Page Down','35':'End','36':'Home','37':'←/Left Arrow','38':'↑/Up Arrow','39':'→/Right Arrow','40':'↓/Down Arrow','45':'Insert','46':'Delete','144':'Num Lock','186':';:','187':'=+','188':',<','189':'-_','190':'.>','191':'/?','192':'`~','219':'[{','220':'\|','221':']}','222':'"'};

	// 将 keycode 转换成按键名称
	function parse2keys(keycodes){
		var array = keycodes.split('+');
		array[array.length-1]=code2keyTable[array[array.length-1]] || '';
		return array.join('+');
	}

    // 将设置界面的 css 添加到 head 中
	addCSS('#gkk_pref_gui {\
            	background-color: white;\
                border: 2px solid black;\
				margin: 0 auto;\
				text-align: left;\
				-moz-border-radius: 0.5em;\
				-webkit-border-radius: 0.5em;\
            }\
			\
			#gkk_pref_gui_title {\
				font-weight: bold;\
				background: #CCCCCC;\
				color: #666666;\
            }\
			\
			#gkk_pref_gui fieldset {\
				margin-left: 1em;\
				margin-right: 1em;\
				margin-top: 0.5em;\
				margin-bottom: 0.5em;\
			}\
			\
			#gkk_pref_gui legend {\
				font-size : 12pt;\
				font-weight : bold;\
			}\
			\
			#gkk_pref_options div {\
				margin-bottom: 0.3em;\
				padding-left: 1em;\
			}\
			\
			.gkk_pref_css {\
				font-size: small;\
				padding: 0.5em 0;\
				white-space: nowrap;\
			}\
			\
			.gkk_pref_css label{\
				margin-left: 0.5em;\
			}\
			\
			.gkk_pref_css_span {\
				display : inline-block;\
				font-size : 12px;\
				border : 1px solid #999;\
				color : #000;\
				background-color : #fff;\
				padding : 1px;\
				margin-right: 0.5em;\
				-moz-border-radius-topright :5px;\
				-moz-border-radius-topleft :0px;\
				-moz-border-radius-bottomright :5px;\
				-moz-border-radius-bottomleft :0px;\
				-webkit-border-radius-topright :5px;\
				-webkit-border-radius-topleft :0px;\
				-webkit-border-radius-bottomright :5px;\
				-webkit-border-radius-bottomleft :0px;\
			}\
			.gkk_pref_css_span:hover {\
				color : #fff;\
				background-color : #000;\
				cursor : default;\
			}\
			.virtual-list {\
				position : absolute;\
				display : block !important;\
				overflow-y : auto;\
				overflow-x : hidden;\
				margin : 0;\
				margin-top : 2px;\
				padding : 0 !important;\
				max-height : 200px;\
				border : 1px solid #333;\
				background-color : white;\
			}\
			\
			.virtual-list span {\
				display : block !important;\
				margin : 0;\
				padding : 2px 0.5em;\
				font-family : Arial, Hevetica, sans-serif;\
				font-size : 9pt;\
				color : #000;\
				text-align : left;\
			}\
			\
			.virtual-list span:hover {\
				background-color : #33f;\
				color : white;\
			}\
			\
			.virtual-list span.selected {\
				background-color : #88f;\
				color : white;\
			}\
			\
			#colorpicker {\
				position : absolute;\
				display : block;\
				margin-top : 2px;\
				margin-left : -30px;\
				z-index : 9999999;\
			}\
			#colorpicker span {\
				display : inline-block;\
				width : 24px;\
				height : 24px;\
				border : 2px solid #000;\
				margin-left : 2px;\
				vertical-align: top;\
			}\
			#colorpicker img {\
				width : 100px;\
				height : 192px;\
				padding : 7px;\
				background-color : #888;\
				border : 3px solid #333;\
				cursor : crosshair;\
			}\
		');

	var bgDiv = document.createElement('div');
	with(bgDiv){
		setAttribute('id','preferences');
    	setAttribute('style','display: table; width:100%; height: 100%;');
    	innerHTML = '<div style="display: table-cell; text-align: center; vertical-align: middle; padding: 1em;">\
                <div id="gkk_pref_gui">\
                    <center>\
                        <table width="100%">\
                            <tr id="gkk_pref_gui_title">\
                            	<td colspan="2">\
                            		<div style="float: left; padding-left: 0.8em; font-size: small;">GoogleKingKong ' + Lng.gui_title + '&nbsp;&nbsp;&nbsp;&nbsp;v：' + scriptVersion + '</div>\
                            		<div id="check_update" style="float: right; padding-right: 0.8em; font-size: small;"><a href="' + scriptUrl + '" target="_blank">' + Lng.gui_scripturl + '</a></div>\
                            		<div style="float: right; padding-right: 0.8em; font-size: small;">' + Lng.gui_welcome1 + '<a href="http://board.mozest.com/viewthread.php?tid=26585" target="_blank">' + Lng.gui_welcome2 + '</div>\
                            	</td>\
                            </tr>\
                            <tr>\
                                <td colspan="2">\
                                    <fieldset id="gkk_pref_preview">\
										<legend>' + Lng.gui_preview_title + '</legend>\
										<div id="gkk_pref_res_ori" class="gkk_pref_preview_id-res" style="display: none;">\
											<div id="res">\
												<div id="ires">\
									                <ol>\
									                    <li class="g">\
											            	<h3 class="r"><a href="javascript: void(0);" class="l">' + Lng.gui_preview_title_1 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_title_1 + '</a></h3>\
											                <span class="std nobr">&nbsp;- [ <a linkindex="29" href="javascript: void(0);" class="fl">' + Lng.gui_preview_translate + '</a> ]</span>\
											                <div class="s">\
											                	' + Lng.gui_preview_desc_1 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_desc_1 + '<b>...</b>' + Lng.gui_preview_desc_1.repeat(15) + '<b>...</b>' + Lng.gui_preview_desc_1 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_desc_1 + '. <b>...</b>' + Lng.gui_preview_desc_1.repeat(15) + '<b>...</b>\
											                	<br>\
											                	<cite class="gkk_ct">\
											                    	www.urlstring1.com/path/ - 00k - \
											                	</cite>\
											                	<span class="gl"><a href="javascript: void(0);">' + Lng.gui_preview_cached + '</a> - <a href="javascript: void(0);">' + Lng.gui_preview_similar + '</a></span>\
											                </div>\
									                    </li>\
									                    <li class="g">\
											                <h3 class="r"><a href="javascript: void(0);" class="l">' + Lng.gui_preview_title_2 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_title_2 + '</a></h3>\
											                <span class="std nobr">&nbsp;- [ <a linkindex="29" href="javascript: void(0);" class="fl">' + Lng.gui_preview_translate + '</a> ]</span>\
											                <div class="s">\
											                	' + Lng.gui_preview_desc_2 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_desc_2 + '<b>...</b>' + Lng.gui_preview_desc_2.repeat(15) + ' <b>...</b>\
											                	<br>\
											                	<cite class="gkk_ct">\
											                	    www.urlstring2.com/path/ - 00k - \
											                	</cite>\
											                	<span class="gl"><a href="javascript: void(0);">' + Lng.gui_preview_cached + '</a> - <a href="javascript: void(0);">' + Lng.gui_preview_similar + '</a></span>\
											                </div>\
									                    </li>\
									                    <li class="g">\
											                <h3 class="r"><a href="javascript: void(0);" class="l">' + Lng.gui_preview_title_3 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_title_3 + '</a></h3>\
											                <span class="std nobr">&nbsp;- [ <a linkindex="29" href="javascript: void(0);" class="fl">' + Lng.gui_preview_translate + '</a> ]</span>\
											                <div class="s">\
											                   	' + Lng.gui_preview_desc_3 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_desc_3 + '<b>...</b>' + Lng.gui_preview_desc_3.repeat(15) + '<b>...</b>\
											                    <br>\
											                    <cite class="gkk_ct">\
											                        www.google.com/path/ - 00k \
											                    </cite>\
											                </div>\
									                    </li>\
									                    <li class="g">\
											                <h3 class="r"><a href="javascript: void(0);" class="l">' + Lng.gui_preview_title_4 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_title_4 + '</a></h3>\
											                <span class="std nobr">&nbsp;- [ <a linkindex="29" href="javascript: void(0);" class="fl">' + Lng.gui_preview_translate + '</a> ]</span>\
											                <div class="s">\
											                   	' + Lng.gui_preview_desc_4 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_desc_4 + '<b>...</b>' + Lng.gui_preview_desc_4.repeat(15) + ' <b>...</b>' + Lng.gui_preview_desc_4 + '<em class="gkk_kw">' + Lng.gui_preview_keyword + '</em>' + Lng.gui_preview_desc_4 + '. <b>...</b> ' + Lng.gui_preview_desc_4.repeat(15) + ' <b>...</b>\
											                    <br>\
											                    <cite class="gkk_ct">\
											                        www.urlstring4.com/path/ - 00k - \
											                    </cite>\
											                    <span class="gl"><a href="javascript: void(0);">' + Lng.gui_preview_cached + '</a> - <a href="javascript: void(0);">' + Lng.gui_preview_similar + '</a></span>\
											                </div>\
									                    </li>\
								                    </ol>\
												</div>\
												<div id="brs" class="e">\
													<table class="ts">\
														<tbody>\
															<tr>\
																<td class="std" nowrap="nowrap" valign="top" width="1%">' + Lng.gui_preview_related + '</td>\
																<td valign="top" width="80%">\
																	<table class="ts med">\
																		<tbody>\
																			<tr style="height: 1.5em;">\
																				<td style="padding-left: 1em;" valign="top"><a class="rsl" href="javascript: void(0);">' + Lng.gui_preview_relatedKW_1 + '</a></td>\
																				<td style="padding-left: 1em;" valign="top"><a class="rsl" href="javascript: void(0);">' + Lng.gui_preview_relatedKW_2 + '</a></td>\
																				<td style="padding-left: 1em;" valign="top"><a class="rsl" href="javascript: void(0);">' + Lng.gui_preview_relatedKW_3 + '</a></td>\
																				<td style="padding-left: 1em;" valign="top"><a class="rsl" href="javascript: void(0);">' + Lng.gui_preview_relatedKW_4 + '</a></td>\
																			</tr>\
																		</tbody>\
																	</table>\
																</td>\
															</tr>\
														</tbody>\
													</table>\
												</div>\
											</div>\
										</div>\
									</fieldset>\
                                </td>\
                            </tr>\
                            <tr id="gkk_pref_options">\
                                <td width="50%" valign="top">\
                                    <fieldset>\
										<legend>' + Lng.gui_options_title_1 + '</legend>\
										<div>\
										    <label style=" margin-left: 0.3em;">' + Lng.gui_options_columns + '：\
												<select name="numcol" id="numcol" class="gkk_pref_onchange">\
													<option value="1" ' + ((Pref.columns==1) ? 'selected="selected"':'') + '>1</option>\
													<option value="2" ' + ((Pref.columns==2) ? 'selected="selected"':'') + '>2</option>\
													<option value="3" ' + ((Pref.columns==3) ? 'selected="selected"':'') + '>3</option>\
													<option value="4" ' + ((Pref.columns==4) ? 'selected="selected"':'') + '>4</option>\
												</select>\
						                    </label>\
						                    <label style=" margin-left: 2em;">' + Lng.gui_options_direction + '：\
												<select name="direction" id="direction" class="gkk_pref_onchange">\
													<option value="1" ' + ((Pref.direction==1) ? 'selected="selected"':'') + '>' + Lng.gui_options_direction_1 + '</option>\
													<option value="2" ' + ((Pref.direction==2) ? 'selected="selected"':'') + '>' + Lng.gui_options_direction_2 + '</option>\
												</select>\
						                    </label>\
						                    <label style="display: inline-block; margin-left: 1em; padding-left: 1em;">' + Lng.gui_options_mode + '：\
												<select name="mode" id="mode" class="gkk_pref_onchange">\
													<option value="1" ' + ((Pref.displayMode==1) ? 'selected="selected"':'') + '>' + Lng.gui_options_mode_1 + '</option>\
													<option value="2" ' + ((Pref.displayMode==2) ? 'selected="selected"':'') + '>' + Lng.gui_options_mode_2 + '</option>\
													<option value="3" ' + ((Pref.displayMode==3) ? 'selected="selected"':'') + '>' + Lng.gui_options_mode_3 + '</option>\
													<option value="4" ' + ((Pref.displayMode==4) ? 'selected="selected"':'') + '>' + Lng.gui_options_mode_4 + '</option>\
												</select>\
						                    </label>\
						                    <label style="margin-left: 1em;">\
												<div style="display:inline-block;">\
						                        	<input name="fitwidth" id="fitwidth" class="gkk_pref_onchange" type="checkbox" ' + (Pref.fitwidth ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_fitwidth + '\
												</div>\
						                    </label><br>\
						                    <label>\
						                       	（' + Lng.gui_options_mode_tip + '）\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="floatInput" id="floatInput" type="checkbox" ' + (Pref.floatInput ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_floatInput + '\
						                    </label>\
						                    <label>\
												<select name="floatInputPos" id="floatInputPos">\
													<option value="1" ' + ((Pref.floatInputPos==1) ? 'selected="selected"':'') + '>' + Lng.gui_options_floatInputPos_1 + '</option>\
													<option value="2" ' + ((Pref.floatInputPos==2) ? 'selected="selected"':'') + '>' + Lng.gui_options_floatInputPos_2 + '</option>\
												</select>\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="shortenUserName" id="shortenUserName" type="checkbox" ' + (Pref.shortenUserName ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_shortenUserName + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
												<input type="checkbox" checked="true" disabled>&nbsp;' + Lng.gui_options_optionsBoxStat + '\
						                    </label>\
										    <label style="margin-left: 0.5em;">\
												<select name="optionsBoxInitStat" id="optionsBoxInitStat">\
													<option value="1" ' + ((Pref.optionsBoxInitStat==1) ? 'selected="selected"':'') + '>' + Lng.gui_options_optionsBoxStat_1 + '</option>\
													<option value="2" ' + ((Pref.optionsBoxInitStat==2) ? 'selected="selected"':'') + '>' + Lng.gui_options_optionsBoxStat_2 + '</option>\
													<option value="3" ' + ((Pref.optionsBoxInitStat==3) ? 'selected="selected"':'') + '>' + Lng.gui_options_optionsBoxStat_3 + '</option>\
												</select>\
						                    </label>\
						                    <label style="margin-left: 1em;">\
						                        <input name="floatOptionsBox" id="floatOptionsBox" type="checkbox" ' + (Pref.floatOptionsBox ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_floatOptionsBox + '\
						                    </label>\
						                    <label style="margin-left: 1em; font-size: 0.85em; color: red; font-style: italic;">\
												NEW~\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="removeAd" id="removeAd" type="checkbox" ' + (Pref.removeAd ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_removeAd + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="SearchWithOtherEngines" id="SearchWithOtherEngines" type="checkbox" ' + (Pref.EnableSearchWithOtherEngines ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_EnableSearchWithOtherEngines + '\
						                    </label>\
										    <label style=" margin-left: 0.5em;">\
												<select name="OtherEnginesTarget" id="OtherEnginesTarget">\
													<option value="_blank" ' + ((Pref.OtherEnginesTarget=='_blank') ? 'selected="selected"':'') + '>' + Lng.gui_options_OtherEnginesTarget_1 + '</option>\
													<option value="_self" ' + ((Pref.OtherEnginesTarget=='_self') ? 'selected="selected"':'') + '>' + Lng.gui_options_OtherEnginesTarget_2 + '</option>\
												</select>\
						                    </label>\
						                    <label style="margin-left: 1em;">\
						                        <input name="OtherEnginsFloat" id="OtherEnginsFloat" type="checkbox" ' + (Pref.OtherEnginsFloat ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_OtherEnginsFloat + '\
						                    </label><br>\
						                    <label style="margin-left: 1.8em;">（' + Lng.gui_options_OtherEngines_tip + '）\
						                    </label><br>\
						                    <label>\
						                        <textarea rows="4" id="OtherEngines" style="margin: 0 0 0 1.5em; width: 90%;" wrap="off">' + Pref.OtherEngines + '</textarea>\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="SearchTipTop" id="SearchTipTop" class="gkk_pref_onchange" type="checkbox" ' + (Pref.SearchTipTop ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_SearchTipTop + '\
						                    </label>\
										</div>\
										<div style="display: '+ (isChrome?'none':'block') + '">\
						                    <label>\
						                        <input name="SearchTip" id="SearchTip" type="checkbox" ' + (Pref.EnableSearchTip ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_searchTip + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="AutoNextPage" id="AutoNextPage" type="checkbox" ' + (Pref.AutoNextPage ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_AutoNextPage + '\
						                    </label>\
						                    <label style=" margin-left: 1em;">\
						                        <input name="HideAutoNextPage" id="HideAutoNextPage" type="checkbox" ' + (Pref.HideAutoNextPage ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_HideAutoNextPage + '\
						                    </label>\
										</div>\
										<div>\
						                    <label style=" margin-left: 1.8em;">' + Lng.gui_options_Focus2NextPageKeys + '\
												<div style="display:inline-block;">\
						                        	<input name="Focus2NextPageKeys" id="Focus2NextPageKeys" size="15" value="' + parse2keys(Pref.Focus2NextPageKeys) + '" >\
												</div>\
						                    </label>\
						                    <label style=" margin-left: 1em;">\
												<div style="display:inline-block;">\
							                        ' + Lng.gui_options_Focus2PrevPageKeys + '&nbsp;<input name="Focus2PrevPageKeys" id="Focus2PrevPageKeys" size="15" value="' + parse2keys(Pref.Focus2PrevPageKeys) + '" >\
												</div>\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="DisableTracking" id="DisableTracking" type="checkbox" ' + (Pref.DisableTracking ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_DisableTracking + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="Focus2Keyword" id="Focus2Keyword" type="checkbox" ' + (Pref.Focus2Keyword ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_Focus2Keyword + '\
						                    </label>\
						                    <label>\
												<select name="Focus2KeywordAction" id="Focus2KeywordAction">\
													<option value="1" ' + ((Pref.Focus2KeywordAction==1) ? 'selected="selected"':'') + '>' + Lng.gui_options_Focus2KeywordAction_1 + '</option>\
													<option value="2" ' + ((Pref.Focus2KeywordAction==2) ? 'selected="selected"':'') + '>' + Lng.gui_options_Focus2KeywordAction_2 + '</option>\
													<option value="3" ' + ((Pref.Focus2KeywordAction==3) ? 'selected="selected"':'') + '>' + Lng.gui_options_Focus2KeywordAction_3 + '</option>\
												</select>\
						                    </label>\
						                    <label style=" margin-left: 1.1em;">\
												<div style="display:inline-block;">\
							                        ' + Lng.gui_options_Focus2KeywordKeys + '&nbsp;<input name="Focus2KeywordKeys" id="Focus2KeywordKeys" size="15" value="' + parse2keys(Pref.Focus2KeywordKeys) + '"\
												</div>\
						                    </label>\
										</div>\
									</fieldset>\
                                    <fieldset>\
										<legend>' + Lng.gui_options_title_2 + '</legend>\
										<div>\
						                    <label>\
						                        <input name="addAbout" id="addAbout" class="gkk_pref_onchange" type="checkbox" ' + (Pref.addAbout ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_addAbout + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="addPreviews" id="addPreviews" class="gkk_pref_onchange" type="checkbox" ' + (Pref.addPreview ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_addPreview + '\
						                    </label>\
						                    <label style=" margin-left: 1em;">' + Lng.gui_options_PreviewSize + '：\
						                        <input id="PreviewSize" class="gkk_pref_onchange" size="3" value="' + Pref.PreviewSize + '">%\
						                    </label>\
						                    <label style=" margin-left: 1em;">\
						                        <input name="PreviewEnhance" id="PreviewEnhance" type="checkbox" ' + (Pref.PreviewEnhance ? 'checked="true"':'') + '>' + Lng.gui_options_PreviewEnhance + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="addFavicons" id="addFavicons" class="gkk_pref_onchange" type="checkbox" ' + (Pref.addFavicon ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_addFavicon + '\
						                    </label>\
						                    <label style=" margin-left: 1em;">\
						                        <input name="addFavicons_h" id="addFavicons_h" class="gkk_pref_onchange" type="checkbox" ' + (Pref.addFavicon_h ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_addFavicon_h + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="addResultNums" id="addResultNums" class="gkk_pref_onchange" type="checkbox" ' + (Pref.addResultNum ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_addResultNum + ' ( 1, 2, 3... )\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="searchSite" id="searchSite" class="gkk_pref_onchange" type="checkbox" ' + (Pref.searchSite ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_searchSite + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                        <input name="OpenInNewTab" id="OpenInNewTab" type="checkbox" ' + (Pref.OpenInNewTab ? 'checked="true"':'') + '>&nbsp;' + Lng.gui_options_OpenInNewTab + '\
						                    </label>\
										</div>\
										<div>\
						                    <label>\
						                       &nbsp;' + Lng.gui_options_bgcolor + '\
						                    </label>\
										</div>\
									</fieldset>\
									<div id="gkk_pref_buttons" style="float: right;padding: 1em 1em 0 0;">\
                                    	<input value="' + Lng.gui_options_save + '" name="save_button" id="save_button" class="btn" type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                    	<input value="' + Lng.gui_options_cancel + '" name="cancel_button" id="cancel_button" class="btn" type="button">\
									</div>\
                                </td>\
                                <td width="50%" valign="top">\
                                    <fieldset>\
										<legend>' + Lng.gui_options_title_3 + '</legend>\
										<div>\
						                    <label>\
												<select name="gkk_pref_css_list" id="gkk_pref_css_list">\
													<option value="holder" selected="selected">' + Lng.gui_options_css_holder + '</option>\
													<option value="counter">' + Lng.gui_options_css_counter + '</option>\
													<option value="title">' + Lng.gui_options_css_title + '</option>\
													<option value="desc">' + Lng.gui_options_css_desc + '</option>\
													<option value="keyword">' + Lng.gui_options_css_keyword + '</option>\
													<option value="url">' + Lng.gui_options_css_url + '</option>\
													<option value="reflinks">' + Lng.gui_options_css_reflinks + '</option>\
													<option value="related">' + Lng.gui_options_css_related + '</option>\
												</select>\
						                    </label>\
						                    <label style=" margin-left: 1em;">\
						                        <input value="' + Lng.gui_options_css_default + '" name="default_button" id="default_button" class="btn" type="button">\
						                    </label>\
										</div>\
										<div>\
' + addCssTable('holder','border: 1px solid rgb(170, 170, 170);', Pref.CSS.match(/\.g\s\{[^\}]*\}/i))
  + addCssTable('counter','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\.gkk_num\s\{[^\}]*\}/i))
  + addCssTable('title','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\.l\s\{[^\}]*\}/i))
  + addCssTable('desc','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\.s\s\{[^\}]*\}/i))
  + addCssTable('keyword','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\em\s\{[^\}]*\}/i))
  + addCssTable('url','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\cite\s\{[^\}]*\}/i))
  + addCssTable('reflinks','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\.gl\s\{[^\}]*\}/i))
  + addCssTable('related','border: 1px solid rgb(170, 170, 170); display: none;', Pref.CSS.match(/\#brs\s\{[^\}]*\}/i))
  + '									</div>\
										<div>\
											<table style="margin-top: 0.4em; padding: 0.5em 0.5em;">\
												<tr>\
													<td>\
						                    			<label>\
						                        			' + Lng.gui_options_css_customize + ' ：\
						                    			</label><br>\
						                    			<label>\
						                    			    <textarea rows="8" cols="61" id="customizeCSS" wrap="off" style="font-size: small;">' + Pref.customizeCSS + '</textarea>\
						                    			</label>\
													</td>\
												</tr>\
											</table>\
										</div>\
									</fieldset>\
                                </td>\
                            </tr>\
                        </table>\
                    </center>\
                </div>\
            </div>\
';
	}

	document.body.insertBefore(bgDiv,document.body.firstChild);

	// 设置好预览效果
	prefOnChange();
    
	// 添加 CSS 列表事件，切换不同的设置
	document.getElementById('gkk_pref_css_list').addEventListener('change', function(event){
			var list = event.target;
            var curCssTable = matchNode('//table[@class="gkk_pref_css" and not(contains(@style,"none"))]').snapshotItem(0);
			curCssTable.setAttribute('style','border: 1px solid rgb(170, 170, 170); display: none;');
			var newCssTable = document.getElementById('gkk_pref_css_' + list.options[list.selectedIndex].value);
			newCssTable.setAttribute('style','border: 1px solid rgb(170, 170, 170);');
			
			switch(list.options[list.selectedIndex].value){
				case 'holder':
					blink('.g',1);
					break;
				case 'counter':
					blink('.gkk_num',1);
					break;
				case 'title':
					blink('.l',1);
					break;
				case 'desc':
					blink('.s',1);
					break;
				case 'keyword':
					blink('.gkk_kw',1);
					break;
				case 'url':
					blink('.gkk_ct',1);
					break;
				case 'reflinks':
					blink('.gl',1);
					break;
				case 'related':
					blink('#brs',1);
					break;
			}
        }, false);
	
	// 添加相关选项 onchange 时的事件
	var onChanges = matchNode('//*[@class="gkk_pref_onchange"]');
	len = onChanges.snapshotLength;
    for (i = 0; i < len; i++) {
        onChanges.snapshotItem(i).addEventListener('change', function(){
            prefOnChange();
        }, false);
    }
	
	// 添加 CSS 参数变化时，更新预览效果
	var cssInputs = matchNode('//input[ancestor::table[@class="gkk_pref_css"]]');
	len = cssInputs.snapshotLength;
	for (i=0;i<len;i++){
		cssInputs.snapshotItem(i).addEventListener('change', function(event){
            cssOnChange(event.target);
        }, false);
	}
	
	// 自定义 CSS 文本框失去焦点时，更新预览效果
	document.getElementById('customizeCSS').addEventListener('blur', function(event){
            prefOnChange();
        }, false);
		
	// 添加 CSS选项中的候选项
	var optionSpans = matchNode('//span[@class="gkk_pref_css_span"]');
	len = optionSpans.snapshotLength;
    for (i = 0; i < len; i++) {
        optionSpans.snapshotItem(i).addEventListener('click', function(event){
			var input = event.target.previousSibling;
			switch(input.name){
				case 'font-size':
					addList(this,'6pt,7pt,8pt,9pt,10pt,11pt,12pt,13pt,14pt,15pt,16pt,17pt,18pt,19pt,20pt,21pt,22pt,23pt,24pt,25pt,26pt,27pt,28pt');
					break;
				case 'color':
					addColorPicker(this);
					break;
				case 'font-weight':
					addList(this,'bold,normal,100,200,300,400,500,600,700,800,900');
					break;
				case 'text-decoration':
					addList(this,'none,underline,overline,line-through,blink');
					break;
				case 'text-align':
					addList(this,'left,center,right,justify');
					break;
				case 'white-space':
					addList(this,'normal,pre,nowrap');
					break;
				case 'background-color':
					addColorPicker(this);
					break;
				case 'border-color':
					addColorPicker(this);
					break;
				case 'border-style':
					addList(this,'none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset');
					break;
				case 'border-width':
					addList(this,'thin,medium,thick,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px');
					break;
				case 'margin-left':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-left':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'margin-right':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-right':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'margin-top':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-top':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'margin-bottom':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'padding-bottom':
					addList(this,'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px');
					break;
				case 'float':
					addList(this,'none,left,right');
					break;
				case 'clear':
					addList(this,'none,left,right,both');
					break;
			}
        }, false);
    }

    // 检查是否有新版本
		getNewVersion(function(version){
            if (Number(scriptVersion) < Number(version)) {
                document.getElementById('check_update').innerHTML = '<font color="red">&nbsp;&nbsp;&nbsp;' + Lng.gui_CheckUpdate_1 + '\
                :v' + version + '&nbsp;<a href="' + scriptUrl + '" target="_blank">' + Lng.gui_CheckUpdate_2 + '</a>&nbsp;' + Lng.gui_CheckUpdate_3 + '\
                &nbsp;<a href="' + installUrl + '">' + Lng.gui_CheckUpdate_4 + '</a>&nbsp;</font>';
            }
		})
    
	// 将 CSS 全部恢复至默认
	document.getElementById('default_button').addEventListener('click',function(){
		if(confirm(Lng.gui_options_css_default_tip_1))
 			{
				setValue('CSS', defaultCSS);
				alert(Lng.gui_options_css_default_tip_2);
			}
	}, false);
	
    // 保存设置
    document.getElementById('save_button').addEventListener('click',function(){
		var tmp;
        
        // 保存分栏数量
		tmp = document.getElementById('numcol');
		setValue('numcol', Number(tmp.options[tmp.selectedIndex].value));

        // 保存搜索结果的排列方向
		tmp = document.getElementById('direction');
		setValue('direction', Number(tmp.options[tmp.selectedIndex].value));
                
        // 保存排版模式
		tmp = document.getElementById('mode');
		setValue('mode', Number(tmp.options[tmp.selectedIndex].value));
        
        // 让搜索结果适合屏幕宽度
        setValue('fitwidth', document.getElementById('fitwidth').checked);
		
		// 搜索框浮动
		setValue('floatInput', document.getElementById('floatInput').checked);
		tmp = document.getElementById('floatInputPos');
		setValue('floatInputPos', Number(tmp.options[tmp.selectedIndex].value));
		
		// 缩短账户名称
		setValue('shortenUserName', document.getElementById('shortenUserName').checked);
		
		// 左侧百宝箱初始状态
		tmp = document.getElementById('optionsBoxInitStat');
		setValue('optionsBoxInitStat', Number(tmp.options[tmp.selectedIndex].value));

		// 百宝箱浮动
		setValue('floatOptionsBox', document.getElementById('floatOptionsBox').checked);
		      
        // 移除右侧的广告
        setValue('removeAd', document.getElementById('removeAd').checked);
        
        // 添加缩略图预览
        setValue('addPreviews', document.getElementById('addPreviews').checked);
        
		// 缩略图大小。如果包含非数字，则替换成默认值 100
        setValue('PreviewSize', isNaN(document.getElementById('PreviewSize').value)?'100':document.getElementById('PreviewSize').value);
        
        // 增强获取缩略图的能力 PreviewEnhance
        setValue('PreviewEnhance', document.getElementById('PreviewEnhance').checked);
        
        // 添加站点的 Favicon
        setValue('addFavicons', document.getElementById('addFavicons').checked);
        
        // 若没有 Favicon 则显示空白
        setValue('addFavicons_h', document.getElementById('addFavicons_h').checked);
		
        // 给搜索结果标序号
        setValue('addResultNums', document.getElementById('addResultNums').checked);
        
        // 在页面上部添加其他搜索引擎，默认【在百度中搜索xx】
        setValue('SearchWithOtherEngines', document.getElementById('SearchWithOtherEngines').checked);
        setValue('OtherEnginsFloat', document.getElementById('OtherEnginsFloat').checked);
        setValue('OtherEngines', document.getElementById('OtherEngines').value.replace(/\'/ig,'"').replace(/^\s*|\s*$/ig,'').replace(/\s*[\n\r]+\s*/ig,'\n').replace(/\s*\|\s*http/ig,'|http'));
		tmp = document.getElementById('OtherEnginesTarget');
		setValue('OtherEnginesTarget', tmp.options[tmp.selectedIndex].value);
        
        // 将相关搜索提示移到页面上部
        setValue('SearchTipTop', document.getElementById('SearchTipTop').checked);
        
        // 如果英文Google没有相关搜索，则添加中文谷歌的相关搜索提示
        setValue('SearchTip', document.getElementById('SearchTip').checked);
        
        // 自动加载下一页
        setValue('AutoNextPage', document.getElementById('AutoNextPage').checked);
        setValue('HideAutoNextPage', document.getElementById('HideAutoNextPage').checked);
        
        // 快捷键定位到搜索框
        setValue('Focus2Keyword', document.getElementById('Focus2Keyword').checked);
		tmp = document.getElementById('Focus2KeywordAction');
		setValue('Focus2KeywordAction', Number(tmp.options[tmp.selectedIndex].value));
        
        // 将新闻、焦点、视频、图片、博客等内容移至页面上方
        setValue('addAbout', document.getElementById('addAbout').checked);
        
        // 强制在新页面打开链接
        setValue('OpenInNewTab', document.getElementById('OpenInNewTab').checked);
        
        // 禁止Google记录我的点击情况
        setValue('DisableTracking', document.getElementById('DisableTracking').checked);

		// 添加“在此站点中搜索”
        setValue('searchSite', document.getElementById('searchSite').checked);

		var css = '';
		// 保存 CSS 设置
		var cssTextareas = matchNode('//textarea[string-length(text())>0 and ancestor::table[@class="gkk_pref_css"]]');
		len = cssTextareas.snapshotLength;
		for(i=0;i<len;i++){
			switch(cssTextareas.snapshotItem(i).getAttribute('id')){
				case 'css_holder_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_counter_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_title_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_desc_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_keyword_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_url_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_reflinks_gen':
					css += '.gkk_MultiCol ' + cssTextareas.snapshotItem(i).value + '\n'
					break;
				case 'css_related_gen':
					css += cssTextareas.snapshotItem(i).value + '\n'
					break;
			}
		}
		setValue('CSS', css);

		// 保存自定义的 CSS
		setValue('customizeCSS', document.getElementById('customizeCSS').value);
		
        // 滚动到页面顶部，刷新一下页面
		location.reload();
		window.scrollTo(0, 0);
    },false);
    
    // 取消
    document.getElementById('cancel_button').addEventListener('click',function(){

        var bgDiv = document.getElementById('preferences');
        bgDiv.parentNode.removeChild(bgDiv);

		len = bodyElements.length;
		for(i=0;i<len;i++){
			bodyElements[i].style.display = bodyElementsDisplay[i];
		}

		window.scrollTo(0, 0);
		if(Pref.AutoNextPage) loadNextPage();
	
    },false);

	// “快捷键定位到搜索框” 的快捷键设定
	document.getElementById('Focus2KeywordKeys').addEventListener('keydown',function(event){
            var keycode = event.keyCode;
			var shift = event.shiftKey;
			var ctrl = event.ctrlKey;
			var alt = event.altKey;

            var Keys = '';
            if (shift) {
                Keys += 'shift+';
            }
            if (ctrl) {
                Keys += 'ctrl+';
            }
            if (alt) {
                Keys += 'alt+';
            }

			this.value = Keys + (code2keyTable[keycode] || '');
			Keys += String(event.keyCode);
			setValue('Focus2KeywordKeys', Keys); // 立即保存快捷键
			event.preventDefault();
			event.stopPropagation();
	},false);

	// “快捷键定位到下一页”的快捷键设定
	document.getElementById('Focus2NextPageKeys').addEventListener('keydown',function(event){
            var keycode = event.keyCode;
			var shift = event.shiftKey;
			var ctrl = event.ctrlKey;
			var alt = event.altKey;

            var Keys = '';
            if (shift) {
                Keys += 'shift+';
            }
            if (ctrl) {
                Keys += 'ctrl+';
            }
            if (alt) {
                Keys += 'alt+';
            }

			this.value = Keys + (code2keyTable[keycode] || '');
			Keys += String(event.keyCode);
			setValue('Focus2NextPageKeys', Keys); // 立即保存快捷键
			event.preventDefault();
			event.stopPropagation();
	},false);

	// “快捷键定位到上一页”的快捷键设定
	document.getElementById('Focus2PrevPageKeys').addEventListener('keydown',function(event){
            var keycode = event.keyCode;
			var shift = event.shiftKey;
			var ctrl = event.ctrlKey;
			var alt = event.altKey;

            var Keys = '';
            if (shift) {
                Keys += 'shift+';
            }
            if (ctrl) {
                Keys += 'ctrl+';
            }
            if (alt) {
                Keys += 'alt+';
            }

			this.value = Keys + (code2keyTable[keycode] || '');
			Keys += String(event.keyCode);
			setValue('Focus2PrevPageKeys', Keys); // 立即保存快捷键
			event.preventDefault();
			event.stopPropagation();
	},false);
}

// 加载下一页
function loadNextPage(){

    // 如果剩余页面高度小于两倍窗口高度，而且存在下一页、没有在加载下一页、没有打开设置界面
    if (!IsLoadingNext && NextPageLink && document.body.scrollHeight - window.scrollY < window.innerHeight * 3 && !document.getElementById('preferences')) {
    
		IsLoadingNext = true;
        var splitDiv = document.createElement('div');
		with(splitDiv){
        	setAttribute('style', 'background: rgb(230, 230, 230) none repeat scroll 0% 0%; clear: both; line-height: 20px; text-align: center; margin-top: 15px; margin-bottom: 10px;');
			setAttribute('id','isLoading');
			setAttribute('class','gkk_nav');
			innerHTML = '<img style="vertical-align: middle;" src="data:image/gif;base64,R0lGODlhEAAQAPMAAP///wAA/wAA/4KC/nJy/qio/ry8/s7O/t7e/pSU/ujo/mho/gAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=">\
						GoogleKingKong ' + Lng.gui_isLoading + ' ...';
		}
		var resDivs = matchNode('//div[@id="res"]');
		//将第一页的相关搜索结果div上移至resdiv内以避免自动翻页时相关结果沉入页底无法看到
		var relatedivs = matchNode('//div[@id="extrares"]');
		if (relatedivs.snapshotLength > 0){
		var relatediv = relatedivs.snapshotItem(0);
		var firstResDiv = resDivs.snapshotItem(0);
		firstResDiv.appendChild(relatediv);
		}
		//***************************//	
		var lastResDiv = resDivs.snapshotItem(resDivs.snapshotLength-1);
		lastResDiv.parentNode.insertBefore(splitDiv, lastResDiv.nextSibling);
        GM_xmlhttpRequest({
            method: 'GET',
            url: String(NextPageLink.href),
            overrideMimeType: 'text/html; charset=' + document.characterSet,
            onload: function(d){
				// 如果已打开设置界面，那么不加载下一页
				if(document.getElementById('preferences')){
					IsLoadingNext = false;
					document.getElementById('isLoading').parentNode.removeChild(document.getElementById('isLoading'));
					return;
				}				
				var len;
				pageCount++;
				var lastNextPageLink = NextPageLink;
                var ContainerDiv = document.createElement('div');
                ContainerDiv.innerHTML = d.responseText;              
                var resDiv = matchNode('//div[@id="res"]', ContainerDiv).snapshotItem(0);
                resDiv.setAttribute('class',resDiv.getAttribute('class')+' gkk_nextpage');
                var ResultCellsDiv = document.createElement('div');
                ResultCellsDiv.setAttribute('id','cnt');
                ResultCellsDiv.appendChild(resDiv);
                
                // 给搜索结果条目添加序号
                if (Pref.addResultNum) {
                    addResultNums(ResultCellsDiv, Pref);
                }
                // 设置分栏格式
                MultiCol(ResultCellsDiv, pageCount, Pref);

            	// 禁止Google记录我的点击情况
            	if (Pref.DisableTracking) {
                	removeTracking(ResultCellsDiv);
            	}
                // 添加缩略图预览
                if (Pref.addPreview) {
                    addPreviews(ResultCellsDiv);
                }
                // 添加站点 Favicon
                if (Pref.addFavicon) {
                    addFavicons(ResultCellsDiv);
                }
				// 强制在新页面打开链接
				if(Pref.OpenInNewTab){
					OpenInNewTabs(ResultCellsDiv);
				}
				// 添加“在此站点中搜索”
				if(Pref.searchSite){
					addseatchSite(ResultCellsDiv);
				}

                NextPageLink = matchNode('//td[@class="cur"]/following-sibling::td/a', ContainerDiv).snapshotItem(0);
                if(!NextPageLink){
					// 如果没有下一页了则移除滚动监视
					window.removeEventListener('scroll', watch_scroll, true);
				}
				
				// 取得页面导航条
				var navTable = matchNode('//table[@id="nav"]', ContainerDiv).snapshotItem(0);

				// 向页面导航条中插入翻页提示
				var td1 = document.createElement('td');
				td1.innerHTML = 'GoogleKingKong ' + Lng.gui_autonextpage_1 + '(<a href="' + lastNextPageLink.href + '">' + Lng.gui_autonextpage_2 + ' ' + (pageCount) + ' ' + Lng.gui_autonextpage_3 + '</a>)。【';
				var td2 = document.createElement('td');
				td2.innerHTML = '】';
				navTable.lastChild.firstChild.insertBefore(td1,navTable.lastChild.firstChild.firstChild);
				navTable.lastChild.firstChild.appendChild(td2);
                // 在当前页插入自动翻页分隔符
                var splitDiv = document.createElement('div');
				with(splitDiv){
					setAttribute('class','gkk_nav');
                	setAttribute('style', 'background: rgb(230, 230, 230) none repeat scroll 0% 0%; clear: both; line-height: 20px; text-align: center; margin-top: 15px; margin-bottom: 10px;');
					appendChild(navTable);
				}
				document.getElementById('isLoading').parentNode.replaceChild(splitDiv, document.getElementById('isLoading'));
				//***************************//
                //移除页面已有的img的id, 避免之后id冲突
                var i, img;
                var imgs = document.getElementsByXPath(".//img[contains(@id,'vidthumb')]|.//img[contains(@id,'apthumb')]");
                for (i = 0; (img = imgs[i++]);)
                {
                	img.removeAttribute('id')
                }
                //***************************//	
				// 插入下一页
				var RCDivs = matchNode('//div[@id="res" or @id="resAbout"]', ResultCellsDiv);
				len = RCDivs.snapshotLength;
				for(var i=len-1;i>=0;i--){
					splitDiv.parentNode.insertBefore(RCDivs.snapshotItem(i),splitDiv.nextSibling);
				}
				
				// 统一格式，美化版面
				// 只有一列或者“紧凑”模式时不需要统一格式
    			if (Pref.columns > 1 && Pref.displayMode > 1) {
					// 加载第二页后，可能出现纵向滚动条，导致第一页宽度发生变化，所以要重新排版第一页的对齐格式
                	if (pageCount == 2) {
						format('gkk_page_1', Pref);
					}
					
        			format('gkk_page_' + pageCount, Pref);
    			}
                
			    var ev = document.createEvent('Event');
			    ev.initEvent('GKK_NextPageLoaded', true, false);
			    document.dispatchEvent(ev);
			    //***************************//
			    //修复自动翻页后图片视频缩略图不能显示
			    var xfoot = document.getElementByXPath(".//div[@id='xfoot']", ContainerDiv);
		        var scrxpath = (xfoot) ? ".//div[@id='xfoot']/script" : "./script"; 
		        var imgscrs = document.getElementsByXPath(scrxpath, ContainerDiv);
		        //console.log(scrxpath +', '+imgscrs.length)
		        if (imgscrs && imgscrs.length>1)
		        {
		        	for (i = 0; i<(imgscrs.length); i++)
		        	{
		        		var scr = imgscrs[i] && imgscrs[i].innerHTML;
		        		if(scr.indexOf('thumb')!=-1)
		        	    eval(scr);
	        	        //console.log(scr);
		        	}
		        }
		       //***************************//
		       delete ContainerDiv; 		        
               IsLoadingNext = false;
			   loadNextPage();
            }
        });
    }
}

// 滚动停止 300ms 后，开始判断并加载下一页
var t = setTimeout(function(){},10);
function watch_scroll(){
	clearTimeout(t);
	var last = window.scrollY;
    t = setTimeout(function(){
        if (last == window.scrollY){
			loadNextPage();
		}
    }, 300);
}

// 检查新版本
function checkUpdate() {
	if (document.getElementById('gkk_UpdateMsg')) return;
	var now = Math.round(new Date().getTime() / 1000);
	
	if (Number(Pref.newVersion)) { // 如果已经检查到新版本
		showUpdateMessage(Pref.newVersion);
	}
	else if (now - Pref.lastCheck > 86400) {	// 如果上一次没有检查到新版本，并且上一次检查距今超过24小时，那么现在检查新版本
		setValue('lastCheck',now);
		getNewVersion(function(version){
			if(Number(version)>Number(scriptVersion) && version != Pref.skipVersion){ // 如果最新版大于现有版本，并且不等于跳过的版本
				setValue('newVersion',version);
				showUpdateMessage(version);
			}
			else {
				setValue('newVersion',0);
			}
		})
	}
}

// 显示新版本提示
function showUpdateMessage(newVersion){
	var seperate = document.createElement('span');
	seperate.innerHTML = '&nbsp;&nbsp;-&nbsp;&nbsp;';

	var ignore = document.createElement('a');
	ignore.innerHTML = Lng.update_ignore;
	ignore.href='javascript:void(0)';
	ignore.addEventListener("click", ignoreUpdate, false);

	var skip = document.createElement('a');
	skip.innerHTML = Lng.update_skip;
	skip.href='javascript:void(0)';
	skip.addEventListener("click", function(){
		skipUpdate(newVersion)
	}, false);

	var view = document.createElement('a');
	view.innerHTML = Lng.update_view;
	view.href = scriptUrl;
	view.target = '_blank';
	
	var update = document.createElement('a');
	update.innerHTML = Lng.update_imme;
	update.href='javascript:void(0)';
	update.addEventListener("click", updateScript, false);

	var msg = document.createElement('div');
	with (msg) {
		setAttribute('id', 'gkk_UpdateMsg');
		innerHTML = '<strong>GoogleKingKong</strong>&nbsp;' + Lng.update_available + ' v' + newVersion + '&nbsp;(' + Lng.update_currentVersion + ' v' + scriptVersion + ')&nbsp;&nbsp;&nbsp;&nbsp;';
		appendChild(ignore);
		appendChild(seperate.cloneNode(true));
		appendChild(skip);
		appendChild(seperate.cloneNode(true));
		appendChild(view);
		appendChild(seperate.cloneNode(true));
		appendChild(update);
	}
	document.body.insertBefore(msg,document.body.firstChild);
	
	var css;
	if(Pref.floatInput && Pref.floatInputPos == 1){
		css = '.gbh {display: none;} \
			   #gkk_UpdateMsg {background-color: rgb(240, 247, 249); margin: 1em; padding: 3px; text-align: center; -moz-border-radius: 5px; -webkit-border-radius: 5px;} \
			   #gkk_header {top: 48px;}\
			  ';
	}
	else {
		css = '.gbh {display: none;} \
			   #gkk_UpdateMsg {background-color: rgb(240, 247, 249); margin: 1em; padding: 3px; text-align: center; -moz-border-radius: 5px; -webkit-border-radius: 5px;} \
			  ';
	}
	GM_addStyle(css);
}

function hideUpdateMessage(){
	document.body.removeChild(document.getElementById('gkk_UpdateMsg'));
}

// 暂时忽略
function ignoreUpdate(){
	hideUpdateMessage();
	setValue('lastCheck',Math.round(new Date().getTime() / 1000));
	setValue('newVersion',0);
	Pref.lastCheck = Math.round(new Date().getTime() / 1000);
}

// 跳过此版
function skipUpdate(newVersion){
	hideUpdateMessage();
	setValue('skipVersion',newVersion);
	setValue('newVersion',0);
}

// 立即升级
function updateScript(){
	if(isChrome){
		alert(Lng.update_chrome);
		setValue('newVersion',0);
	}else{
		hideUpdateMessage();
		setValue('newVersion',0);
		window.location.replace(installUrl);
	}
}

// 查询最新版本号
function getNewVersion(funcbind){
	if(isChrome){
	    GM_xmlhttpRequest({
	        method: 'GET',
	        url: 'http://' + location.host+ '/search?q=Source+for+"GoogleKingKong"+"version"+site:userscripts.org/scripts/review/39159',
            overrideMimeType: 'text/html; charset=' + document.characterSet,
	        onload: function(d){
	            var versionCode = d.responseText.match(/\/\/[^\/]*@<em>version<\/em>[^\/]*\/\//i);
	            if (versionCode) { // 如果找到 Version
	                funcbind(String(versionCode).replace(/[^\d\.]/ig, ''));
	            }
	        }
	    });
	}
	else{
	    GM_xmlhttpRequest({
	        method: 'GET',
	        url: scriptUrl,
	        overrideMimeType: 'text/html; charset=utf-8',
	        onload: function(d){
	            var divContainer = document.createElement('div');
	            divContainer.innerHTML = d.responseText;
	            var versionCode = matchNode('//h3[contains(text(),"当前版本")]', divContainer).snapshotItem(0).nextSibling;
	            delete divContainer;
	            if (versionCode) { // 如果找到 Version 标签
	                funcbind(versionCode.textContent.replace(/[^\d\.]/ig, ''));
	            }
	        }
	    });
	}
}

// 提取出搜索关键字
function getKeyword(){
	return document.title.toString().split(' - ')[0];
}

// 将字符串重复n次
String.prototype.repeat = function(n){
	return new Array(n+1).join(this);
}

// 转换为 Boolean 类型
function toBoolean(s){
	return typeof(s)=='boolean'?s:(s=='true'?true:false);
}

//输出错误信息（提取自“校内网改造器”http://userscripts.org/scripts/review/45836，一点小修改。除错方便多了，感谢原作者）
function printErrorLog(func, err, data) {
	if(func && err && err.name && err.message) {
		GM_log('\n在 '+func+' 中发生了一个错误。\n错误名称： '+err.name+'\n错误信息： '+err.message+'\n附加信息： '+(data?data:''));
	}
}

/*********************************************************************************************
 * 各功能函数 结束
 *********************************************************************************************/

if (location.href.indexOf('#') > 0){
	document.addEventListener('DOMAttrModified', function(event){
		// 当 id 为 nav 的 node 加载完毕时，整个页面也基本加载完成，可以处理了
    	if (event.target.id == 'nav') {
    		ResultNum = 1; // 编号计数重置为1
    		pageCount = 1; // 翻页计数重置为1
    		// 把 ghead 和 gbar 放入 header 中，以便浮动搜索框
    		var header = document.getElementById('header');
    		header.insertBefore(document.getElementById('ghead'), header.firstChild);
    		header.insertBefore(document.getElementById('gbar'), header.firstChild);
    		doit();
    	}
	}, false);
}
else {
	doit();
}

})();