// ==UserScript==
// @name        19_eq
// @namespace   19_eq
// @description a
// @include     http://*.19lou-inc.com/*
// @version     1
// ==/UserScript==

var pos_index = 0;



var key_date="2014/04/17 10:35";
var key_all="taobao|烟酒|高价回收|alibaba"
+
"六四|64事件|天安门事件|天安门风波|天安门抗议|天安门屠杀|和平请愿|政治风波|学生运动|春夏之交|tiananmen|历史的伤口|民运|学运|学潮|八平方|8平方|八的平方|8的平方|五月三十五|5月35|民主女神|民主歌声献中华|北京风波|难忘的两个月|坦克人|黄雀行动|学生下跪|母亲运动|共和国卫士|为了忘却的纪念|四二六社论|维园|王丹|吾尔开希|刘刚|柴玲|封从德|方政|侯德健|刘晓波|丁子霖|方励之|赵紫阳|胡耀邦|李鹏|改革历程|惊心动魄的56天|北京风波纪实|五十天的回顾与反思|必须旗帜鲜明地反对动乱|风波后的反思|共和国卫士英烈集|亡命精英|叛逃精英|他改变了中国|八九民运实录|二十世纪中国政治|24周年|二十四周年|坦克英雄|民主运动|屠城|鲍彤|周锋锁|支联会|血腥清场|戒严部队|自由广场|民主人士|六四军人|天安门母亲|民运人士|六四真相|政治避难|学生领袖|绝食书|反人类罪|六四事件|六月四|6月4|捌玖|陆肆|绝食宣言|袁木|严家其|韩东方|翟伟民|陈子明|邓力群|陈希同|高自联|北高联|学自联|工自联|国家的囚徒"
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