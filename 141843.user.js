// ==UserScript==
// @name        Hightlight_jing
// @namespace   Hightlight_jing
// @description a
// @include     http://*.19lou-inc.com/*
// @version     1
// ==/UserScript==

var pos_index = 0;
(function($){
  "use strict";

  // **Utilities functions**
  //
  // Generate an unique number identifier
  var _uuid = 0;
  var uuid = function(){ return ++_uuid; };

  // Template for creating a nav element with links.
  //
  // * `links` : an Array of *{ href, text }*
  var tmplNav = function(links) {
    var nav = $('<nav class="flexible-nav"><ul></ul></nav>');
    var lis = $.map(links, function(link){
      return $('<li><a href="'+link.href+'">'+link.text+'</a></li>')[0];
    });
    nav.find('ul').append(lis);
    return nav;
  }
  

  // Retrieve a node pointed by an a element `aEl` hash href.
  var targetForLink = function(aEl) {
    var href = $(aEl).attr('href');
    if(href.substring(0,1) == '#') {
      var target = $(href);
      return target.size() ? target : null;
    }
    return null;
  }


  // FlexibleNavMaker
  // ------------------------
  // Dynamically create a nav.
  //
  // * `selector` (optional) : selector for all nodes to add in nav.
  // using `h1, h2, h3` if not setted.
  window.FlexibleNavMaker = function(selector) {
    var self = this;
    self.nodes = $(selector || '.my_hightlight');
    
    // ### .make() ###
    // An instance of FlexibleNavMaker contains only a `make` method
    // which create the nav element with nodes matching `selector`.
    self.make = function() {
      var links = self.nodes.map(function(){
        var node = $(this);
	// Find the id or create a unique one
        var id = node.attr('id');
        if(!id) {
          while(!id) {
            id = 'n'+( uuid() );
            if($('#'+id).size()>0) id = null;
          }
          node.attr('id', id);
        }
	// The text link is the `data-navtext` attribute or the node text.
        var text = node.attr('data-navtext') || node.text();
	return { href: '#'+id, text: text };
      });
      return tmplNav(links);
    }
  }

  // FlexibleNav
  // -----------
  // Make a nav element "flexible".
  //
  // * `nav` : a nav DOM element
  window.FlexibleNav = function(nav) {
    var self = this;
    self.nav = $(nav);

    // Init links adding some classes.
    //
    // Set the target node name class.
    // Example: class `tnn-h1`
    self.updateClasses = function() {
      self.nav.find('a').each(function(){
        var node = $(this);
        var target = targetForLink(node);
        if(target) {
           node.addClass('tnn-'+target[0].nodeName.toLowerCase());
        }
      });
    }

    // ### .update() ###
    self.update = function() {
      var documentHeight = $(document).height();
      var windowHeight = $(window).height();
	  //alert(documentHeight.toString()+"::"+right_height.toString()+"::"+$("body").height().toString());
      // Transform links into array of visible target `top` position and link `node`.
      var links = self.nav.find('a').map(function(){
        var node = $(this);
        var target = targetForLink(node);
        if(target==null || !target.is(':visible')) return null;
		//alert(target.offset().top);
        return {
          top: target.offset().top,
          node: node
        };
      });

      // Update nav link positions.
      $.each(links, function(i, link) {
		  //alert(link.top/documentHeight);
		 /*if((link.top/documentHeight) < 1)
		  {//alert(link.top/documentHeight);
			 link.node.css('top', (100*link.top/documentHeight)+'%');
		  }
		 else link.node.css('top', (100*link.top/right_height)+'%');*/
		 //alert(pos[pos_index]);
			link.node.css('top', (100*pos_index/show_count)+'%');
			pos_index++;
      });

      // Update current section.
      var scrollTop = $(document).scrollTop();
      var closest = null;
      $.each(links, function(i, link){
        link.node.removeClass('current');
        if(closest==null || (link.top <= scrollTop+10 && link.top > closest.top))
          closest = link;
      });
      closest && closest.node.addClass('current');
    }

    // ### Init ###
    // Bind scroll event and init nav.
	pos_index = 0;
    $(window).scroll(function(){
		pos_index = 0;
    	self.update();
    });
    self.updateClasses();
    self.update();
  }
}(jQuery));

var top_num = 3;
var key_date="2012/09/08 09:50";
var key_all="洗脑|国民教育|香港|考 試答案|考試答案|★高价★|卡买卖|求购 银泰|卡券|票务|爆炸物|子弹|弹药|枪支|火箭弹|taobao|烟酒|高价回收|alibaba|酒水|名烟|名酒|qq群|群号|定存|驾照分|公关|日本|游行|钓鱼岛|考试答案|小妹出台|玩塞子|三陪|炸弹"
+
"|温加饱|温+饱|温宝宝|影帝|涛哥|温总理|胡主席|wbb|胡紧涛|hjt|温加宝|胡海峰|温如春|温云松|徐明|领导人子女|"
+"现任领导人|张培莉|温哥|胡哥|胡总|一把手|二把手|大当家|二当家|老胡|老温|总书记|什锦八宝|什锦饭|八宝饭|军委主席|溫家寶|胡海清|胡錦濤|胡锦蓉|"
+"胡锦莱|名门之后|国家领导|茅道临|天线宝宝|吴邦国|贾庆林|李长春|习近平家族|李克强|贺国强|周永康|郭伯雄|徐才厚|回良玉|张德江|王岐山|"
+"刘延东|梁光烈|马凯|孟建柱|戴秉国|王胜俊|曹建明|hujintao|wubangguo|wenjiabao|jiaqinglin|lichangchun|xijinping|likeqiang|heguoqiang|zhouyongkang|"
+"guoboxiong|xucaihou|huiliangyu|zhangdejiang|wangqishan|liuyandong|liangguanglie|makai|mengjianzhu|daibingguo|wangshengjun|caojianming|政法委书记|"
+"胡BOSS|BXL|B厚|WLJ|半夜枪声|北戴河|薄公|薄瓜瓜|薄熙|薄一波|不厚|贺年卡|胡锦涛|护士长|黄奇帆|贾宝玉|江系|解放碑|锦湖轮胎|康师傅|腊肉|李克强|木子论坛|"
+"平西王|三少|山大王|十八大|水工|天线宝宝|温家宝|文革|文化大革命|吴三桂|西红柿|学习机|衙党|岳不群|曾红|张德江|张江|中南海|重庆火锅|紫禁城|"
+"左冷禅|boxi|xilai|和田玉|胡搞|江小鱼|江泽民|三峡水|左冷禅|周郎|益民食品|习以为常|土共|陈光诚|自由光诚|团派江派|胡海峰|温云松|习近平|"
+"红色贵族|红色家族|天线宝宝|康师傅|轮胎 方便面|共铲党|共残党|共惨党|共匪|赤匪|真理部|十八大|18大|上海帮|团派|北京当局|裆中央|九常委|九长老|"
+"锦涛|家宝|影帝|近平|回良玉|汪洋|张高丽|俞正声|徐才厚|郭伯雄|熙来|梁光烈|孟建柱|戴秉国|马凯|令计划|韩正|章沁生|陈世炬|泽民|贼民|邓小平|庆红|"
+"罗干|假庆淋|hujin|wenjiabao|xijinping|likeqiang|zhouyongkang|lichangchun|wubangguo|heguoqiang|jiaqinglin|jiangzemin|xjp|jzm|维权人士|维权律师|"
+"异见人士|异议人士|地下刊物|内斗|党魁|文字狱|一党专政|一党独裁|新闻封锁|老人政治|改革年代的政治斗争|改革年代政治斗争|关键时刻|超越红墙|"
+"梦萦未名湖|一寸山河一寸血|政治局常委内幕|北国之春|北京之春|中国之春|东方红时空|历史的伤口|国家的囚徒|黄祸|08县长|淋巴县长|八宪章|8宪章|"
+"独立中文笔会|华夏文摘|开放杂志|大家论坛|华夏论坛|中国论坛|木子|争鸣论坛|大中华论坛|反腐败论坛|新观察论坛|新华通论坛|正义党论坛|热站政论网|"
+"华通时事论坛|华语世界论坛|华岳时事论坛|两岸三地论坛|南大自由论坛|人民之声论坛|万维读者论坛|你说我说论坛|东西南北论坛|东南西北论谈|红太阳的陨落|"
+"和谐拯救危机|阿波罗网|阿波罗新闻|世维会|迪里夏提|美国之音|自由亚洲电台|记者无疆界|维基解密|讲真相|马三家|善恶有报|活摘器官|群体灭绝|中功|"
+"张宏堡|地下教会|冤民大同盟|达赖|藏独|freetibet|雪山狮子|西藏流亡政府|青天白日旗|民进党|洪哲胜|独立台湾会|台湾政论区|台湾自由联盟|"
+"台湾建国运动组织|真善忍|新唐人|dajiyuan|epochtimes|动态网|花园网|阅后即焚|法轮|falun|明慧|minghui|退党|三退|九评|nine commentaries|洪吟|"
+"神韵艺术|神韵晚会|耀邦|紫阳|方励之|丁子霖|柴玲|乌尔凯西|吾尔开希|蟹农场|艾末末|中国民主党|中国民主正义党|中国民主运动|世纪中国基金会|坦克人|挡坦克|"
+"纯属挑逗|摹拟爱情|礼物情妇|风流成性|听话娃娃|重尘闻香之慈航静斋|淫贼网|爱上花心公子|风流魔剑|烈女斗夫|风流雍正|王者之佣兵天下|色诱俏女佣|风流飘香|千年玄冰|"
+"艳飘|黑色柔情|妩媚情殇|都市逍遥侠|娇娇师娘|春意凛然|相公好无理|浪迹神雕|满世妖娆|重生之升官发财|家教情人|独眼恶魔的床伴|恶女夺爱|微热少年|被缚的千面女王|幸福蜜月30天|"
+"倾城护爱|花都迷情|艳修之天地不容|坏坏的色狼医生|乡村如此多娇|都市花盗|色诱狼心|中心行的少妇们|艳香迷醉|玄媚剑|小妾丫鬟|大宅底下的奸情|疯狂求欢|陪睡的女人|霸占芙蓉|狼后传奇|醉红情|"
+"色女缠郎|烟花系列|寡妇飘香与丫头梅香|仙界流氓老大|超华丽恶男|警花吾妾|霸主的女奴|娇妻物语|母子销魂|情舞孔雀妃|炼狱天使|意恋征服系列|暴虐的肉玩具|暴虐玩具|三宝局长|登堂入室缠上你|荆棘花园|锁链——禁忌的爱|"
+"天使不眠的都市|无言的哀愁|见一次LOVE一会|甜蜜的罂粟|少妇白洁|花香飘满衣|地狱召唤|文森特和莱纳|都市邪修|扭曲的人生|无上风流|都市百美录|欲望之血|欲望强神|覆雨翻云之逐艳曲|幸福家庭俱乐部|撒旦的专宠|"
+"偷欢迷情|天赐人生|公主当盗|江山绝色榜|一身多用|错红颜|风流教师|带刺玫瑰|邪佛|弄儿的后宫|尘诱|春闺秘史|骑士的血脉|贞情小娘子|魔女的诱惑|玩咖秘书的情人|一个太监闯后宫|寻攻记|明日又天涯|暗影邪爱|妖孽主唱|"
+"吃软饭的超能者|天龙风流之替身段誉|少年大宝|驱妖娘娘冒险奇谭|帝王的魅惑|和老师同居的学生|天生我材必有用|养个女儿做老婆|天龙八部之逍遥天下|校园艳事|天下之路|鸿图记|亲卿爱奴|蓝调华尔兹|圣女修道院|何处寻潇猗|"
+"我在空房诱奸林阿姨|爱恋筱莉儿|桃偶艳欲|血蟒传说|调教爱奴|跨越古今的风流商人|火影之僵尸王|独宠嫂嫂|色遍天下|无影幽灵|小小淫男|夺取男体育老师的第一次|白素浪荡史|打造笑傲后宫|金缕鞋|一枪春水|"
+"半步多欲望传说|萝莉今晚留下来|讲好了不说爱|遭同学轮暴的小公主|性不性有你|偷身游戏|乡村春潮|成人法则|偷贼太放肆|穿越之我是还珠格格|风流英雄|龙翔都市|异唐新月|情海狂龙|冷夏|我与四川妹的性爱故事|一个高二女生讲述她的第一次性体验|冷玫瑰|秘戏娇人儿|落难俏王爷|"
+"口交|乱伦|肛交|美女视频|激情视频|成人电影|成人激情|激情自拍|激情电影|激情小电影|乳交|催情药|迷奸|强暴|强奸|胸推|臀推|毒龙|视频聊天室|狼友|炮友|舔阴|灌肠|阳具|阴茎|小穴|女优炮图|"
+"偷拍做爱|偷拍性爱|最新日本AV|视频性爱|快播AV|欧美成人电影|无码av|成人无码电影|免费成人A片电影|色情成人社区|乱伦性交图片|成人午夜片|免费毛片|日本激情爽片|色情在线影院|成人动漫系列|真人裸体聊天|"
+"A片种子|毛片网站|专卖电警棍|毛片种子|A片网址|黄片种子|A片网站|黄se图片|黄se电影|黄se网址|欧洲色情图片|欧洲无码片|亚洲色情图片|亚洲无码片|日韩AV片下载|高清A片|激情床戏下载|高清床戏下载|成人电影快播|"
+"黄se小说|黄se网站|裸女视频聊天|乳交|视频裸聊|中出颜射|颜射|成人乱伦|性爱A片下载|黄色电影下载|处女导航|少妇色情导航|美女激情聊天|色虫影院|色酷色影院|色虎影院|成人在线裸聊|口交性交自拍|换妻快播|乱伦快播|淫妻电影|换妻电影|淫母乱伦|国产乱伦|欧美乱伦|日韩乱伦|"
+"2奶大赛|AAAA级电影|AV出演|AV狼|AV女|av资源|xing伴侣|阿兵哥言语录|百性阁|包养情|波霸乳交器具|成人黄站|成人图片|成人网站|成人性爱|充气娃娃|出轨的女人|催情药|大陆美女学生妹|帝国夜色|東京熱|二奶大赛|仿真抽插|"
+"风流英雄猎艳记|肛交|红灯区|后庭专区|缓交|黄色图片|激情自拍|娇艳人生|九城情色|开苞|口交|浪情娱乐会所|乱伦故事|伦理片|裸聊|裸照图片|妈妈色|买春堂|美女外送|美女外约|美乳白书|美臀夹阴|迷幻药|迷魂药|"
+"迷奸香水|迷情水|明星裸体照|男人最爱上的成人网站|男子按摩|女校生遭监禁凌辱|女性自慰|欧美放荡女娃娃|欧美色图|拍肩迷药|嫖鸡|品色堂|强奸丸|全国二奶|日本成人漫画|日本学生妹|肉欲|三级片|色大嫂|色空寺|色狼谷|色情电影|色人阁成人影院|"
+"色之戒四合院|色中色|涩爱|上门按摩|少女午夜私欲|失身粉|丝袜家|外送服务|我爱幼幼论|午夜激情|小姐出台包夜|新不夜城|新红楼梦艳情版|新金瓶梅|性爱教育|性爱娃娃|性爱文学|性爱淫图|性福源|性感沙滩|性器具|性息|性息中国|"
+"押妓游街|亚热合集|艳照|养个儿子做丈夫|夜色王朝|一起看A片|一夜未了情|淫妇娇妻|淫网|御花王|援交|云雨欲魔欲魔艳史|在线激情电影|找性爱|找性爱|找一夜晴网|制幻剂|钟点情人|自慰器|最强日本淫水少女组"
+"鸦片|阿片|吗啡|海洛因|二乙酰吗啡|白粉|大麻|杜冷丁|盐酸哌替啶|古柯|可卡因|可待因|那可汀|盐酸二氢埃托啡|冰毒|甲基苯丙胺|摇头丸|K粉|氯胺酮|咖啡因|麦角乙二胺|安眠酮|丁丙诺啡|地西泮|LSD|三唑仑|海乐神|酣乐欣|安纳咖|氟硝安定|碘甲烷|氰化钾|盐酸羟亚胺|曲马多|三唑仑|盐酸曲马多|氯胺酮|K粉|king粉|致幻剂|脱氧麻黄素|罂粟|"
+"摇头丸|白龙珠|棕色糖|香港石|麻果|罗氏蓝精灵|火麻|快乐丸|劲乐丸|疯药|白天使|强奸药片|嗨粉|黄皮|黄砒|地美露|可可精|皮约特|Peyote|麻古|马赌|卡苦|火烟|麻果|自由垒|快乐客|强力胶|喵喵|十字仔|k他命|K仔|溜冰|打k|阿片|开心水|红五|搖霸|high客|菠菜|吃肉|地狱尘|雷鸣|大H|神仙水|污酸|窗玻璃|滴鼻剂|爱他死|亲密药|迪饼|玛丽简|"
+"水疗|黄皮|哌替啶|二氢埃托啡|安菲他命|大力丸|苯二氮草类|绿豆仔|罗氏五号|罗氏十号|睡觉帮|速可眠|莉莉四十|嗨药|忽得|安眠酮|可乐|可卡因|溜冰|打沙|溜果子|溜谷子|HIGH药|强奸粉|吹麻|打盐|嗨K|素嗨|荤嗨|K刷|麻果|唠嗑药|抢劫药|打KING|画面KING|蒙汗药|强奸丸|迷奸药|迷情药|迷药|迷魂药|西班牙苍蝇水|"
+"手拉|长枪|短枪|狗簧|金弓|欧狗|国狙|沙鹰|M1911|麻醉钢枪|M14|日本89式|"
+"火帽|KAR98k|MP40|实木金身|金身实木|AK74-U|qiang支|BOYI刻字版SPR|马老二枪油|电动大弹鼓|马路易|M4CQB|枪zhi|装弹器|加弹器|多功能皮卡汀尼导轨|美狗|日狗|火狗|54式|64式|77式|92式|冲锋枪弹|虎头鹰牌|双管平式|双管立式|97式防暴枪|自制枪|秃鹰|广州三箭|M4A1|电狗|气狙|麻醉狗|狙击步槍|74式|85式|88式|铅弹|4.5mm|"
+"5.5mm|BB枪|仿真狗|654k|虎头双管|防身武器|热武器|温切斯特|CP99|木仓|走私狗|qigou|qi狗|国狗|G36C黄河|M290|G36K-M9|P226|CO2回膛|CO2 1911|R77 2.5寸左轮|GAMO COMPACT 康派|GAMO CFX 胶版|MARUREN APS2 SV|MARUSHIN KRA 98K|长狗|工字LQB|国产MB01C|美秃|台秃|WALTHER CP99|PCZ-山猪|巴雷特M82A1|QBU88式|KS USP.45|"
+"金属划架|进口狗|AA-0012|猛将气|史密斯威森|国产BB|M249|762mm枪|38式左轮|海豹M9|德国A1000|FX气皇|伯莱塔|雷明顿|PCP新贵|东京丸井|雷鸣登|叛逆者枪|斗角式枪|风城枪|鷹牌獵槍|锡锋枪|海豹M9|美洲豹M84|54枪|MARUI沙漠之鹰|仿CZ75BD|工字皮碗|黑狗|钢珠枪|仿真来复枪|娥眉皮碗|射钉枪|射钉弹|锡锋B51|高仿枪|"
+"英国骚本PCP|762mm军用|麻狗|警用枪械|手qiang|54式qiang|野战狗|土仿狗|组装枪支|枪械模型|进口PCP|折叠狗|钢珠左轮狗|钢珠狗|防身武器|单管猎|仿真枪|阻击枪|手狗|售枪|高压狗|高压枪|军用77|军用54|麻醉枪|汽狗|军狗|64狗|54狗|防身武器|猎枪|气枪|手枪|汽枪|步枪|狙击枪|气狗|猎狗|C02款式枪|立式双管枪|折叠款式枪|下压款式枪|麻醉qiang|步qiang|猎qiang|獵qiang|捷克左轮|"
+"加入2228毫升的浓硫酸|手雷|叶雨茗的配方|NG与乙醇配成1的溶液|C4制作|起爆药|爆炸装置|乙炔喷灯足以熔化铀235|硝酸甘油滴到碳酸钠溶液|橡胶溶解汽油中添加碱液|一平勺碳酸钠|注入13mL浓硝酸|36磅纯度|黑索金|轻型巡航导弹|自爆材料|燃烧剂|可塑炸弹|黑火药和硝酸钾农药混合|汽油三分之一白糖混合|燃烧瓶|燃烧弹|ATOM弹|燃烧剂|制硝化甘油|水浴法制TNT|炸弹制作|恐怖分子傻瓜手册|起爆器|炸弹配方|硝酸甘油制作|"
+"硝酸甘油炸弹|雷管|燃烧弹|燃烧弹制作|原子弹配方|原子弹DIY教程|DIY核弹|原子弹教程|土办法做武器|莫洛托夫鸡尾酒|硝酸铵的简便制取方法|用火药混合塑料|高性能爆炸物质混合|原子弹制作|铀235|petn|季戊四醇四硝酸酯|太恩|六甲氧胺|RDX|黑索今|海扫更|Hexogeon|三亚甲基三硝胺|苦味酸|特屈儿|三硝基苯甲硝胺|Tetryl|二硝基苯胺|"
+"killleer|太安|季戊四醇四硝酸酯|混合浓硫酸和稀硝酸|季戊四醇|氧化铅|硝化甘油|硝酸铵|环六亚甲基四胺|乌洛托品|火药|烟雾弹|pvp管|炸药|雷管|黑火药|燃烧瓶|TNT|硝化甘油|梯恩梯|DIY核弹|燃烧弹|单基药|双基药|多基药|霹雳炮|震天雷|起爆药|硝铵|氢弹|莫洛托夫鸡尾酒|硝酸钾农药|引爆器|NG与乙醇配成1%的溶液|叶雨茗|烟火剂|导爆索|爆炸装置|爆破剂|塑胶炸药|聚异丁烯|炸弹|"
+"匕首|三棱刀|弹簧刀|跳刀|单刃|双刃|尖刀|藏刀|腰刀|靴刀|刀具|刮刀|侵刀|扒皮刀|羊骨刀|军刀|军刺|甩棍|军刺|蝴蝶刀|戈博|杀破狼|军刃|棍跳刀|跳刀|砍刀|开山刀|虎牙|军品|甩棍|战刀|刀收藏|刀批发|淘刀|剑批发|"
+"小飞狼|小黑豹|远狙|三利达|猎豹M18|猎豹M19|黑蟒系列|大黑鹰|森林之狼|追风150|小飞虎|森林之豹|森林之鹰|狩猎用弩|弩弦|力斯曼黑熊配件|力斯曼改装|卡巴弩用808猎箭|供应小黑豹2005A|手柄弩|野战特种兵003|雪狼T9-1|森林之虎|森林之狐|追月225A弩|进口弩|猎箭|两用中弩|射鱼弩|狩猎弩|大黑鹰LSG|巴力WILD CAT C5|大型弩|制作弩|钢珠弩|狙击弩|手弩|药箭|三用弩|麻醉镖|三步倒|捕狗箭|麻醉箭|弓弩|专供|特供|指定接待|国宴专用|国宾专用|中南海专用|国务院专用|商务庆典酒|建军酒|省宴专用|军工酿酒|直属机关专用|国家机关专用|接待酒|指定酒|专用酒"
;
/*
function change(st)
{
	var select_a=":contains('"+st+"')";
	var html_b=$(select_a).find("body").html();
	var b_array = html_b.split(st);
	var html_c="";
	for(var j = 0 ; j < b_array.length; j++)
	{
		if(j != b_array.length-1)html_c=html_c+b_array[j]+"<font color=\"red\">"+st+"</font>";
		else html_c=html_c+b_array[j];
	};
	$(select_a).find("body").replaceWith(html_c);
}
function light()
{
	var all_array = key_all.split("|");
	var i = 0;
	while(i < all_array.length)
	{
		change(all_array[i]);
		i++;
	};
	alert("ok");
}
light();
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//based on body 

var ref_str = location.href;
function changeall()
{
	var count = 0;
	var no_count = 0;
	var all_array = key_all.split("|");
	var html_b = $("body").html();
	var html_c="";
	for(var i = 0 ; i < all_array.length ; i++)
	{
		var b_array = html_b.split(all_array[i]);
		html_c="";
		count = count+b_array.length-1;
		for(var j = 0 ; j < b_array.length; j++)
		{
			if(j != b_array.length-1)
			{
				for(var k = 1 ; k + j < b_array.length ; k++)
				{
					var jstart = b_array[j+k].search(">");
					var jend = b_array[j+k].search("<");
					if(jstart == -1 && jend == -1)continue;
					else break;
				}
				if((jstart>jend && jend != -1) || jstart == -1)
				{
					html_c=html_c+b_array[j]+"<font class=\"my_hightlight\">"+all_array[i]+"</font>";
				}
				else
				{
					html_c=html_c+b_array[j]+all_array[i];
					no_count++;
				}
			}
			else html_c=html_c+b_array[j];
		}
		html_b=html_c;
	}
	no_count = count - no_count;
	html_b = 
	"<style type=\"text/css\">"+"#changecount{ position:fixed; top:95%; right:5%; z-index:1; _position:absolute;}"
	+"font.my_hightlight{background-color:yellow;color:red}"
	+"</style>"
	+ html_b+"<div id=\"changecount\">关键词总数(<=):"+no_count.toString()+"/"+count.toString()+"</div>";
	$("body").html(html_b);
}
//$(document).ready(changeall());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for 19lou   based on div tag
var splited_key = key_all.toLowerCase().split("|");
var key_index = 0;
var key_count = 0;
var show_count = 0;
function hightlight_19lou()
{
	var get_count = 0;
	$(".content-scoll").each(function()
	{
		var each_split;
		var each_html = $(this).html();
		each_html = each_html.toLowerCase();
		var final_html = "";
		get_count++;
		for(var i = 0 ; i < splited_key.length ; i++)
		{
			each_split = each_html.split(splited_key[i]);
			if(each_split.length == 1)continue;
			final_html = "";
			key_count = key_count + each_split.length -1;
			if(each_split.length <= top_num)show_count = each_split.length + show_count;
			else show_count = show_count + top_num;
			for(var j = 0 ; j < each_split.length ; j++)
			{
				if(j !=  each_split.length-1)
				{
					if(j < top_num)final_html = final_html+each_split[j]+"<font class=\"my_hightlight\">"+splited_key[i]+"</font>";
					else final_html = final_html+each_split[j]+"<font class=\"my_hightlight_hide\">"+splited_key[i]+"</font>";
					key_index++;
				}
				else final_html = final_html+each_split[j];
			}
			each_html = final_html;
		}
		$(this).html(each_html);
	});
	$("body").append("<style type=\"text/css\">"+"#changecount{ background:#666;color:#eee;position:fixed; top:94%; right:5%; z-index:9999; _position:absolute;}"
	+"font.my_hightlight{background-color:yellow;color:red}font.my_hightlight_hide{background-color:yellow;color:red}"
	+"font.my_hightlight_ip{background-color:green;color:yellow}"
	+"nav.flexible-nav{text-align:right;position:fixed;right:0px;height:100%;width:20px;top:0;right:0;border-left:4px dashed rgba(150, 150, 150, 0.2);background:white;z-index:9999;}nav.flexible-nav ul{padding:0;margin:0;list-style:none;}nav.flexible-nav ul li{margin:0;padding:0;}nav.flexible-nav ul li a{border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;z-index:10001;text-decoration:none;position:fixed;right:10px;background:#666;color:#eee;opacity:0.7;padding:2px 6px;transition-duration:0.2s;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;-o-transition-duration:0.2s;transition-property:padding background color;-moz-transition-property:padding background color;-webkit-transition-property:padding background color;-o-transition-property:padding background color;}nav.flexible-nav ul li a:hover{z-index:11111;opacity:1;padding-right:12px;}nav.flexible-nav ul li a.current{background:#000;}nav.flexible-nav ul li a.tnn-h1{border-right:15px solid #A00;}nav.flexible-nav ul li a.tnn-h2{border-right:15px solid #406;}nav.flexible-nav ul li a.tnn-h3{border-right:15px solid #690;}"
	+"#get_right_height{}"
	+"</style>"+"<div id=\"changecount\">  领取条数:"+get_count.toString()+"    关键词出现:"+key_count.toString()+
		"<br>splited_key[0]:"+splited_key[0]+" 字典词数:"+splited_key.length.toString()+"</br>  </div>"
		);

	hightlight_ip();
	//new FlexibleNav(new FlexibleNavMaker().make().prependTo('body'));
}
if((ref_str.match("history")||parent.document.getElementsByTagName("div")[0].innerHTML.match("赵俊"))&&self!=top&&parent.document.body.tagName=="BODY")hightlight_19lou();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var jstart = b_array[j+1].search(">");
				var jend = b_array[j+1].search("<");
				if((jstart>jend && jend != -1) || jstart == -1)
				{
					html_c=html_c+b_array[j]+"<font color=\"red\">"+all_array[i]+"</font>";
				}
				else
				{
					html_c=html_c+b_array[j]+all_array[i];
					no_count++;
				}
*/

function hightlight_ip()
{
	$("tr[name='submit_monitor']").each(function ()
	{
		var ip = $("td:eq(5) span",this).text();
		if(ip == "122.224.129.50")
		{
			$("td:eq(5) span",this).html("<font class=\"my_hightlight_ip\">122.224.129.50->19楼</font>");
		}
	});
}

