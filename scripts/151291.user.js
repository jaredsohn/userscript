// ==UserScript==
// @name        19_eq
// @namespace   19_eq
// @description a
// @include     http://*.19lou-inc.com/*
// @version     1
// ==/UserScript==

var pos_index = 0;



var key_date="2014/04/17 12:12";
var key_all="温加饱|温+饱|温宝宝|"
+"影帝|涛哥|温总理|胡主席|wbb|胡紧涛|hjt|温加宝|胡海峰|温如春|温云松|徐明|领导人子女|"
+"现任领导人|张培莉|温哥|胡哥|胡总|一把手|二把手|大当家|二当家|老胡|老温|总书记|什锦八宝|什锦饭|八宝饭|军委主席|溫家寶|胡海清|胡錦濤|胡锦蓉|"
+"胡锦莱|名门之后|国家领导|茅道临|天线宝宝|吴邦国|贾庆林|李长春|习近平家族|李克强|贺国强|周永康|郭伯雄|徐才厚|回良玉|张德江|王岐山|"
+"刘延东|梁光烈|马凯|孟建柱|戴秉国|王胜俊|曹建明|hujintao|wubangguo|wenjiabao|jiaqinglin|lichangchun|xijinping|likeqiang|heguoqiang|zhouyongkang|"
+"guoboxiong|xucaihou|huiliangyu|zhangdejiang|wangqishan|liuyandong|liangguanglie|makai|mengjianzhu|daibingguo|wangshengjun|caojianming|政法委书记|"
+"胡BOSS|BXL|B厚|WLJ|半夜枪声|北戴河|薄公|薄瓜瓜|薄熙|薄一波|不厚|贺年卡|胡锦涛|护士长|黄奇帆|贾宝玉|江系|解放碑|锦湖轮胎|康师傅|腊肉|李克强|木子论坛|储君|王储|血债帮|血债派|胡派|中共高层"
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
+"赵洪祝|李强|任泽民|王辉忠|蔡奇|刘力伟|龚正|陈德荣|王新海|赵一德|夏宝龙|陈加元|毛光烈|葛慧君|王建满|郑继伟|朱从玖|梁黎明|张鸿铭|黄坤明|邵占维|王金财|"
+"张仲灿|杨戌标|许勤华|俞志宏|徐立毅|翁卫军|沈坚|柯良栋|陈必凯|罗悦明|陈必凯|马发祥|柴绍良|戴肃军|王长河|邢书成|吴长海|吴刚|秦卫江|彭勇|苗华|崔昌军|王宁|"
+"程童一|侯贺华|王晓军|郑群良|乙晓光|张建平|蒋伟烈|刘毅|吴国华|陆福恩|许耀元|王建平|田修思|杜恒岩|刘亚洲|杜金才|王安顺|郭金龙|王国平|王苹果|apple王|王apple|"
+"王雪梅|李丹宇|薄熙永|薄熙成|薄熙莹|鲍洪俊|鲍鱼哥|签单哥|鲍洪峻|记者站长|浙江省委宣传部副部长"
+"西藏独立|西藏自由|拘捕藏人|屠杀藏人|镇压藏人|藏族人民遇到苦难|民族的自由|西藏学生运动|西藏青年会|西藏妇女会|藏人行政中央|流亡藏人|西藏青年运动会|军警进藏|"
+"传召大法会|拐卖藏族妇女|藏族妓女|汉族妓女|拉嘎|东突同胞解放|自由亚洲电台|新疆艾滋病|针管扎人|猪羊杂交肉进入新疆|灭了新疆人|弄死新疆小偷|清除新疆人|新疆人结伙抢手机|"
+"维吾尔人失踪|南蒙古民主|南蒙古人权|蒙古自由联盟党|南蒙古自由|自由南蒙古|南蒙古自由|南蒙古独立|内蒙古独立|蒙古异见人士|内蒙古人权|民族英雄哈达|异见人士哈达|自由蒙古|"
+"台湾独立|藏独|疆独|新疆独立|北京当局|北美自由论坛|春夏自由论坛|大纪元新闻网|大纪园|大家论坛|大中国论坛|大中华论坛|东北独立|东方红时空|东南西北论谈|独立台湾会|独立中文笔会|"
+"风雨神州论坛|华通时事论坛|华语世界论坛|华岳时事论坛|回民暴动|鸡毛信文汇|廉政大论坛|南大自由论坛|你说我说论坛|人民内情真相|人民真实|人民之声论坛|台湾建国运动组织|台湾青年独立联盟|"
+"台湾政论区|台湾自由联盟|无界浏览器|新闻封锁|异见人士|异议人士|舆论反制|新闻管制|舆论自由|舆论管制|新闻自由"
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
key_all = key_all.toLowerCase();
var splited_key = key_all.split("|");
var key_index = 0;
var key_count = 0;
var tmp_i = 0;
function hightlight_19lou()
{
	var get_count = 0;
	$(".content-scoll").each(function()
	{tmp_i++;
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
			for(var j = 0 ; j < each_split.length ; j++)
			{
				if(j !=  each_split.length-1)
				{
					final_html = final_html+each_split[j]+"<font class=\"my_hightlight\">"+splited_key[i]+"</font>";
					key_index++;
				}
				else final_html = final_html+each_split[j];
			}
			each_html = final_html;
		}
		$(this).html(each_html);
	});
	$("body").append("<style type=\"text/css\">"+"#changecount{ background:#666;color:#eee;position:fixed; top:94%; right:5%; z-index:9999; _position:absolute;}"
	+"font.my_hightlight{background-color:yellow;color:red}"
	+"nav.flexible-nav{text-align:right;position:fixed;right:0px;height:100%;width:20px;top:0;right:0;border-left:4px dashed rgba(150, 150, 150, 0.2);background:white;z-index:9999;}nav.flexible-nav ul{padding:0;margin:0;list-style:none;}nav.flexible-nav ul li{margin:0;padding:0;}nav.flexible-nav ul li a{border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;z-index:10001;text-decoration:none;position:fixed;right:10px;background:#666;color:#eee;opacity:0.7;padding:2px 6px;transition-duration:0.2s;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;-o-transition-duration:0.2s;transition-property:padding background color;-moz-transition-property:padding background color;-webkit-transition-property:padding background color;-o-transition-property:padding background color;}nav.flexible-nav ul li a:hover{z-index:11111;opacity:1;padding-right:12px;}nav.flexible-nav ul li a.current{background:#000;}nav.flexible-nav ul li a.tnn-h1{border-right:15px solid #A00;}nav.flexible-nav ul li a.tnn-h2{border-right:15px solid #406;}nav.flexible-nav ul li a.tnn-h3{border-right:15px solid #690;}"
	+"#get_right_height{}"
	+"</style>"+"<div id=\"changecount\">  领取条数:"+get_count.toString()+"    关键词总数(<=):"+key_count.toString()+
		"<br>关键字更新时间:"+key_date+"</br>  </div>"
		);
	//new FlexibleNav(new FlexibleNavMaker().make().prependTo('body'));
}
if((ref_str.match("history"))&&self!=top&&parent.document.body.tagName=="BODY")hightlight_19lou();
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