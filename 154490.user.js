// ==UserScript==
// @name        temp
// @namespace   temp
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
var key_date="2012/12/19 09:50";
var key_all="纯属挑逗|摹拟爱情|礼物情妇|风流成性|听话娃娃|重尘闻香之慈航静斋|淫贼网游行|爱上花心公子|风流魔剑|烈女斗夫|风流雍正、|王者之佣兵天下|色诱俏女佣|风流飘香|千年玄冰|艳飘|黑色柔情|妩媚情殇|都市逍遥侠|娇娇师娘|春意凛然|相公好无理|浪迹神雕|满世妖娆|重生之升官发财|家教情人|独眼恶魔的床伴|恶女夺爱|微热少年|被缚的千面女王|幸福蜜月30天|倾城护爱|花都迷情|艳修之天地不容|坏坏的色狼医生|乡村如此多娇|都市花盗|色诱狼心|中心行的少妇们|艳香迷醉|玄媚剑|小妾丫鬟|大宅底下的奸情|疯狂求欢|陪睡的女人|霸占芙蓉|狼后传奇|醉红情|色女缠郎|烟花系列|寡妇飘香与丫头梅香|仙界流氓老大|超华丽恶男|警花吾妾|霸主的女奴|娇妻物语|母子销魂|情舞孔雀妃|炼狱天使|意恋征服系列|暴虐的肉玩具|暴虐玩具|三宝局长|登堂入室缠上你|荆棘花园|禁忌的爱|天使不眠的都市|无言的哀愁|见一次LOVE一会|甜蜜的罂粟|少妇白洁|花香飘满衣|地狱召唤|文森特和莱纳|都市邪修|扭曲的人生|无上风流|都市百美录|欲望之血|欲望强神|覆雨翻云之逐艳曲|幸福家庭俱乐部|撒旦的专宠|偷欢迷情|天赐人生|公主当盗|江山绝色榜|一身多用|错红颜|风流教师|带刺玫瑰|邪佛|弄儿的后宫|尘诱|春闺秘史|骑士的血脉|贞情小娘子|魔女的诱惑|玩咖秘书的情人|一个太监闯后宫|寻攻记|明日又天涯|暗影邪爱|妖孽主唱|吃软饭的超能者|天龙风流之替身段誉|少年大宝|驱妖娘娘冒险奇谭|帝王的魅惑|和老师同居的学生|天生我材必有用|养个女儿做老婆|天龙八部之逍遥天下|校园艳事|天下之路|鸿图记|亲卿爱奴|蓝调华尔兹|圣女修道院|何处寻潇猗|我在空房诱奸林阿姨|爱恋筱莉儿|桃偶艳欲|血蟒传说|调教爱奴|跨越古今的风流商人|火影之僵尸王|独宠嫂嫂|色遍天下|无影幽灵|小小淫男|夺取男体育老师的第一次|白素浪荡史|打造笑傲后宫|金缕鞋|一枪春水|半步多欲望传说|萝莉今晚留下来|讲好了不说爱|遭同学轮暴的小公主|性不性有你|偷身游戏|乡村春潮|成人法则|偷贼太放肆|穿越之我是还珠格格|风流英雄|龙翔都市|异唐新月|情海狂龙|冷夏|我与四川妹的性爱故事|一个高二女生讲述她的第一次性体验|冷玫瑰|秘戏娇人儿|落难俏王爷|口交|乱伦|肛交|美女视频|激情视频|成人电影|成人激情|激情自拍|激情电影|激情小电影|乳交|催情药|迷奸|强暴|强奸|胸推|臀推|毒龙|视频聊天室|狼友|炮友|舔阴|灌肠|阳具|阴茎|小穴|女优炮图|偷拍做爱|偷拍性爱|最新日本AV|视频性爱|快播AV|欧美成人电影|无码av|成人无码电影|免费成人A片电影|色情成人社区|乱伦性交图片|成人午夜片|免费毛片|日本激情爽片|色情在线影院|成人动漫系列|真人裸体聊天|A片种子|毛片网站|专卖电警棍|毛片种子|A片网址|黄片种子|A片网站|黄se图片|黄se电影|黄se网址|欧洲色情图片|欧洲无码片|亚洲色情图片|亚洲无码片|日韩AV片下载|高清A片|激情床戏下载|高清床戏下载|成人电影快播|黄se小说|黄se网站|裸女视频聊天|乳交|视频裸聊|中出颜射|颜射|成人乱伦|性爱A片下载|黄色电影下载|处女导航|少妇色情导航|美女激情聊天|色虫影院|色酷色影院|色虎影院|成人在线裸聊|口交性交自拍|换妻快播|乱伦快播|淫妻电影|换妻电影|淫母乱伦|国产乱伦|欧美乱伦|日韩乱伦|2奶大赛|AAAA级电影|AV出演|AV狼|AV女|av资源|xing伴侣|阿兵哥言语录|百性阁|包养情妇|乳交器具|成人黄站|成人图片|成人网站|成人性爱|充气娃娃|出轨的女人|催情药|大陆美女学生妹|帝国夜色|東京熱|二奶大赛|仿真抽插|风流英雄猎艳记|肛交|红灯区|后庭专区|缓交|黄色图片|激情自拍|娇艳人生|九城情色|开苞|口交妹|口交器具|浪情娱乐会所|乱伦故事|伦理片|裸聊|裸照图片|妈妈色|买春堂|美女外送|美女外约|美乳白书|美臀夹阴|迷幻药|迷魂药|迷奸香水|迷情水明星裸体照|男人最爱上的成人网站|男子按摩|女校生遭监禁凌辱|女性自慰|欧美放荡女娃娃|欧美色图|拍肩迷药|嫖鸡|品色堂|强奸丸|全国二奶|日本成人漫画|日本学生妹|肉欲|三级片|色大嫂色空寺|色狼谷|色情电影|色人阁成人影院|色之戒四合院|色中色|涩爱|上门按摩|少女午夜私欲失身粉|丝袜家|外送服务|我爱幼幼论|午夜激情|小姐出台包夜|新不夜城|新红楼梦艳情版|新金瓶梅|性爱教育|性爱娃娃|性爱文学|性爱淫图|性福源|性感沙滩|性器具|性息|押妓游街|亚热合集|艳照|养个儿子做丈夫|夜色王朝|一起看A片|一夜未了情|淫妇娇妻|淫网|御花王|援交|云雨欲魔欲魔艳史|在线激情电影|找性爱|找一夜晴网|制幻剂|钟点情人|自慰器|最强日本淫水少女组"
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

