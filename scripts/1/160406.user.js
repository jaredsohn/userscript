// ==UserScript==
// @name           ACDTS Farming Helper
// @namespace      Lemon
// @version        2.0
// @description    一个简单的ACFUN大逃杀辅助工具
// @grant          GM_getValue
// @grant          GM_setValue
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://dts.76573.org/game.php
// @include        http://dts.76573.org/news.php
// @include        http://kagari.76573.org/campfire/game.php
// @include        http://kagari.76573.org/campfire/news.php
// @include        http://dts.acfun.tv/game.php
// @include        http://dts.acfun.tv/news.php
// @include        http://lg.dianbo.me/game.php
// @include        http://lg.dianbo.me/news.php
// @include        http://sonohara.76573.org/game.php
// @include        http://sonohara.76573.org/news.php
// ==/UserScript==

/*
	一个简单的ACFUN大逃杀辅助工具 ver 2.0
	Lemon制作。 基于GPL许可协议发布。
	简单说明： 
	先把进行状况页面打开，在进行状况页面先点“重置”再点“开始”（重置用于清除上局信息），不要关闭进行状况页面。
	进行页面能看到显示屏用于显示信息。进行状况页面必须保持打开，否则很多功能将无法执行！
	然后进入游戏界面，在游戏页面内操作即可。 左侧是基础控制板，中间是命令行（主要操作都是在命令行内进行的），右侧是警告栏和运行日志。
	基础控制板可以执行一些基础操作，如启动或停止脚本，设定运行模式，设定探索目标，设定猎杀目标，设定猎杀模式下是否攻击
	无关人员、猎杀模式下是否根据进行状况的信息自动追踪、猎杀模式下是否捡起地图物品等基础信息。
	命令行底部的文本框可以输入命令，按回车即可执行。输入help可以看到可用命令列表，输入具体的命令会有该命令的使用说明。
	脚本启动时的移动地区、使用物品、丢弃物品以及更多的如合成补给、自动强化武器、设置警告级别、危险区域等操作都在命令行中进行。
	右侧的警告栏和日志主要起提醒作用。
*/

/////////////////////////////////// 基础操作模块开始 ///////////////////////////////////////////////////////////

var danger_area=new Array(40), DangerCnt=0, Avoid_Danger_Area=true, alertlevel=5, money_base, game_mode=1;
var AutoTrace=false, KeepQuiet=false;
var allow_pick_up=true;

var log_str=new Array(9);

function push_log(s,bool)
{
	if (s.length>28) s=s.slice(0,27)+"..";
	var found=0;
	if (log_str[7]==s+"\n") found=1;
	if (bool && found) return;
	for (var i=2; i<=7; i++) log_str[i-1]=log_str[i];
	log_str[7]=s+"\n";
	var s="";
	for (var i=1; i<=7; i++) s=s+log_str[i];
	document.getElementById('logtext').value=s;
}

var host_name;

var enemy_name, enemy_type;

function enemy_spotted(s)
{
	var s1="你发现了敌人<span class=\"red\">";
	if (s.indexOf(s1)!=-1)
	{
		var z1=s.indexOf(s1);
		var z2=s.indexOf("</span>",z1); 
		enemy_name=s.slice(z1+24,z2);
		return true;
	}
	return false;
}

function spotted_by_enemy(s)
{
	var s1="</span>突然向你袭来！";
	return (s.indexOf(s1)!=-1);
}

function found_item(s)
{
	var s1="发现了物品";
	return (s.indexOf(s1)!=-1);
}

function spotted_dead(s)
{
	var reg1=/你发现了<span class="red">.*<\/span>的尸体！/;
	return (s.match(reg1)!=null);
}

function mergable_item(s)
{
	var s1="</span>与以下物品合并？";
	return s.indexOf(s1)!=-1;
}

function package_full(s)
{
	var s1="你的包裹已经满了。想要丢掉哪个物品？<br><br>";
	return s.indexOf(s1)!=-1;
}

var pid;

var hp, mhp, sp, msp;
var sa;

var dbname, dbeff, dbcnt;
var dhname, dheff, dhcnt;
var daname, daeff, dacnt;
var dlname, dleff, dlcnt;
var dname, deff, dcnt;

function getarmor(ss)
{
	//获取防具类型为ss的装备的属性
	var bg=sa.indexOf(ss+"</span>"); 
	var sn=sa.slice(bg-6,bg);
	if (sn=="grey\">")	//没有对应的防具
	{
		deff=0; dcnt=0;
	}
	else
	{
		var z1=sa.indexOf("<span>",bg); 
		if (sa.slice(z1+7,z1+9)=="内衣")	//特判内衣不能卸下的问题
		{
			dname="内衣"; deff="0"; dcnt="1";
		}
		else  if (sa.charAt(z1-1)=="\t")	//特判探索过程中防具无法卸下的问题
		{
			var z2=sa.indexOf("</span>",z1);
			dname=sa.slice(z1+7,z2);
			z1=sa.indexOf("<span>",z1+1); z1=sa.indexOf("<span>",z1+1);
			var z2=sa.indexOf("</span>",z1);
			deff=sa.slice(z1+6,z2);
			z1=sa.indexOf("<span>",z1+1);
			var z2=sa.indexOf("</span>",z1);
			dcnt=sa.slice(z1+6,z2);
		}
		else
		{
			z1=sa.indexOf("<span>",z1+1)+7;
			var z2=sa.indexOf("</span>",z1);
			dname=sa.slice(z1,z2);
			z1=sa.indexOf("<span>",z1+1); z1=sa.indexOf("<span>",z1+1)+6;
			var z2=sa.indexOf("</span>",z1);
			deff=sa.slice(z1,z2);
			z1=sa.indexOf("<span>",z1+1)+6;
			var z2=sa.indexOf("</span>",z1);
			dcnt=sa.slice(z1,z2);
		}
	}
}

var pktype=new Array(7), pkname=new Array(7), pkeff=new Array(7), pkcnt=new Array(7);
var pkcount;

var wpntype, wpnname, wpnsk, wpneff, wpncnt;
var current_place, money;

function getstate()	//获取当前各类数值
{
	//获取当前生命值和体力值
	sa=document.documentElement.innerHTML;		//整个网页的html
	//如果在战斗进行中，直接以上次结果为准
	var bg=sa.indexOf("道具用途</span>");
	if (bg==-1) return;	
	var s1="<td class=\"b2\"><span>生命</span></td>";
	var bg=sa.indexOf(s1);
	for (var i=1; i<=7; i++) bg=sa.indexOf(">",bg+1);
	var ed=sa.indexOf("/",bg)-1;
	hp=parseInt(sa.slice(bg+1,ed));
	bg=ed+3;
	ed=sa.indexOf("<",bg);
	mhp=parseInt(sa.slice(bg,ed));
	
	var s1="<td class=\"b2\"><span>体力</span></td>";
	bg=sa.indexOf(s1);
	for (var i=1; i<=7; i++) bg=sa.indexOf(">",bg+1);
	ed=sa.indexOf("/",bg)-1;
	sp=parseInt(sa.slice(bg+1,ed));
	bg=ed+3;
	ed=sa.indexOf("<",bg);
	msp=parseInt(sa.slice(bg,ed));
	
	//获取当前装备防具
	getarmor("身体装备"); dbname=dname; dbeff=deff; dbcnt=dcnt;
	getarmor("头部装备"); dhname=dname; dheff=deff; dhcnt=dcnt;
	getarmor("手臂装备"); daname=dname; daeff=deff; dacnt=dcnt;
	getarmor("腿部装备"); dlname=dname; dleff=deff; dlcnt=dcnt;
	
	//获取当前背包物品
	var bg=sa.indexOf("道具用途</span>");
	for (var i=1; i<=6; i++)
	{
		bg=sa.indexOf("<tr>",bg+1);
		var z2=sa.indexOf("</span>",bg);
		if (sa.slice(z2-9,z2-3)=="grey\">")		//此物品不存在
		{
			pktype[i]="无"; pkname[i]="无"; pkeff[i]="0"; pkcnt[i]="0";
		}
		else
		{
			var z1=sa.indexOf("<span>",bg); 
			var z2=sa.indexOf("</span>",z1); 
			pktype[i]=sa.slice(z1+7,z2);
			z1=sa.indexOf("<span>",z1+1);
			z2=sa.indexOf("</span>",z1); 
			pkname[i]=sa.slice(z1+7,z2);
			z1=sa.indexOf("<span>",z1+1); z1=sa.indexOf("<span>",z1+1);
			z2=sa.indexOf("</span>",z1); 
			pkeff[i]=sa.slice(z1+6,z2);
			z1=sa.indexOf("<span>",z1+1);
			z2=sa.indexOf("</span>",z1); 
			pkcnt[i]=sa.slice(z1+6,z2);
		}
	}
	pkcount=0;
	for (var i=1; i<=6; i++) if (pktype[i]!="无") pkcount++;
	
	//获取当前武器
	var bg=sa.indexOf("装备种类</span>");
	bg=sa.indexOf("<td class=\"b2\" height=\"26\">",bg);
	bg=sa.indexOf("<span>",bg);
	var z1=sa.indexOf("</span>",bg);
	wpntype=sa.slice(bg+7,z1);
	if (wpntype=="空手")	//特判没有装备武器的情况
	{
		wpnname="拳头"; wpneff="0"; wpnsk=""; wpncnt="0";
	}
	else
	{
		bg=sa.indexOf("<span>",bg+1);
		if (sa.charAt(bg-1)!="\t")	//不是探索状态，装备可以被卸下
			bg=sa.indexOf("<span>",bg+1);
		z1=sa.indexOf("</span>",bg);
		wpnname=sa.slice(bg+7,z1);
		bg=sa.indexOf("<span>",bg+1); 
		bg=sa.indexOf(">",bg)+1; z1=sa.indexOf("<",bg);
		wpnsk=sa.slice(bg,z1);
		bg=sa.indexOf("<span>",bg+1);
		z1=sa.indexOf("</span>",bg);
		wpneff=sa.slice(bg+6,z1);
		bg=sa.indexOf("<span>",bg+1);
		z1=sa.indexOf("</span>",bg);
		wpncnt=sa.slice(bg+6,z1);
	}
	//获取当前位置
	current_place=document.getElementById("pls").innerHTML;
	
	//获取当前金钱数目
	var bg=sa.indexOf("<td class=\"b2\"><span>金钱</span></td>");
	if (bg==-1) return;
	bg=sa.indexOf("<td class=\"b3\"><span>",bg);
	bg=sa.indexOf(">",bg); bg=sa.indexOf(">",bg+1)+1;
	var ed=sa.indexOf("<",bg);
	money=parseInt(sa.slice(bg,ed-2));
}

function find_item_name(s)
{
	//找到背包中物品名称为s的物品的存放位置，如不存在返回0
	sa=document.documentElement.innerHTML;
	var pl=sa.indexOf("道具用途</span>"); 
	pl=sa.indexOf("<td class=\"b3\"><span>\n"+s+"</span></td>",pl);
	var ed=sa.indexOf("</tbody>",pl);
	var where=8;
	while ((pl!=-1) && (pl<ed)) 
	{
		pl=sa.indexOf("</tr>",pl+1);
		where--;
	}
	if (where>6) where=0;
	return where;
}

var ieff, icnt;

function find_item_type(s)
{
	//找到背包中物品类型为s的物品的存放位置，如不存在返回0。 同时存储装备的效耐属性至ieff和icnt
	sa=document.documentElement.innerHTML;
	var pl=sa.indexOf("道具用途</span>"); 
	pl=sa.indexOf("<td class=\"b2\" height=\"26\"><span>\n"+s+"</span></td>",pl);
	var tmp=pl;
	var ed=sa.indexOf("</tbody>",pl);
	var where=8;
	while ((pl!=-1) && (pl<ed)) 
	{
		pl=sa.indexOf("</tr>",pl+1);
		where--;
	}
	if (where>6) where=0;
	if (where!=0)
	{
		var bg=tmp; for (var i=1; i<=4; i++) bg=sa.indexOf("<span>",bg+1);
		var ed=sa.indexOf("</span>",bg);
		ieff=sa.slice(bg+6,ed);
		bg=sa.indexOf("<span>",bg+1); ed=sa.indexOf("</span>",bg);
		icnt=sa.slice(bg+6,ed);
	}
	return where;
}

function use_item(s)
{
	//使用包裹s中的物品
	$('input[onclick="$(\'mode\').value=\'command\';$(\'command\').value=\'itm'+s+'\';postCmd(\'gamecmd\',\'command.php\');this.disabled=true;"]').click();
}

function exist_item(s)
{
	//判定包裹s中物品是否存在
	return $('input[onclick="$(\'mode\').value=\'command\';$(\'command\').value=\'itm'+s+'\';postCmd(\'gamecmd\',\'command.php\');this.disabled=true;"]').length>0;
}

function unload_wpn()
{
	$('input[onclick*="offwep"]').click();
}

var abandon_tag=0;
var abandon_s;

function abandon_item(s)
{
	abandon_s=s;
	//扔掉包裹s中的物品
	if (abandon_tag==0)
	{
		$('input[id=itemdrop][value="道具丢弃"]').click();
		abandon_tag++;
		return;
	}
	if (abandon_tag==1) { abandon_tag++; return; }	//这个步骤是为了获取一定的延时，防止下一步失败
	if (abandon_tag==2)
	{
		$('input[id=itm'+s+'][value=dropitm'+s+']').click();
		abandon_tag++;
		return;
	}
	$('input[name=submit][value="确定并丢弃"]').click();
	abandon_tag=0;
}

function drop_if_exist(s)
{
	//如果存在物品s，则丢弃并返回true
	if (find_item_name(s)>0)
	{
		abandon_item(find_item_name(s));
		return true;
	}
	return false;
}

var mix_tag=0;
var mixmask;

function mix_item(s)
{
	//合成物品，物品列表bitmask为s
	mixmask=s;
	if (mix_tag==0)
	{
		$('input[id=itemmix][value="道具合成"]').click();
		mix_tag++;
		return;
	}
	if (mix_tag==1) { mix_tag++; return; }	//与丢弃操作一样，获取一定的延时，防止下一步失败
	if (mixmask>0)					//合成物品，每个时钟周期只点一件物品
		for (var i=1; i<=6; i++)
			if ((mixmask&(1<<(i-1)))>0)
			{
				$('input[id=mitm'+(i+"")+'][name=mitm'+(i+"")+']').click();
				mix_tag++; mixmask-=1<<(i-1);
				return;
			}
	$('input[name=submit][value="提交"]').click();
	mix_tag=0;
}

function move_to(s)
{
	var t=document.getElementById("moveto")
	var found=0;
	for (var i=0; i<t.length; i++)
		if (t.options[i].text.indexOf(s)!=-1)
		{
			found=1; t.selectedIndex=i;
			break;
		}
	if (found) t.onchange();
	return found;
}

var zgt=0;

function buy_item(s1,s2,s3)
{	
	if (current_place!="花菱商厦" && current_place!="光坂高校")
	{
		if (!check_danger_area("光坂高校"))
		{
			if (move_to("光坂高校")) return;
		}
		else  if (move_to("花菱商厦")) return;
	}
	else
	{
		var st=document.getElementById("cmd");
		if (st.length==0 || (st.innerHTML.indexOf("id=\"shop12\"")==-1 && st.innerHTML.indexOf("请输入购买数量：<input")==-1))
			$('input[id=sp_shop]').click();
		else
		{
			zgt++; if (zgt<2) return;
			zgt=0;
			if (st.innerHTML.indexOf("id=\"shop"+s1+"\"")!=-1)
				if (!document.getElementById("shop"+s1).checked)
					document.getElementById("shop"+s1).checked=true;
				else  $('input[name=submit][value="提交"]').click();
			else  if (st.innerHTML.indexOf("id=\""+s2+"\"")!=-1)
					if (!document.getElementById(s2).checked)
					{
						document.getElementById(s2).checked=true;
						document.getElementsByName("buynum")[0].value=s3;
					}
					else  $('input[name=submit][value="提交"]').click();
		}
	}
}

var kill_target="", search_target="";

var patcnt=37;
var patname=new Array(	"\\冰封刀","\\A刀","\\电击器","\\冰棍棒","\\RPG7","\\发条枪","\\电磁发射装置","\\电磁枪","\\金色枪",
				"\\鬼畜枪","\\方块","\\宝石炮","\\喷火队","\\key","\\小黄","\\灵系","\\殴系","\\斩系","\\射系","\\2禁射系",
				"\\补给材料","\\水果","\\水果皮","\\自爆电池","\\炸药","\\C4","\\深水炸弹","\\鸡尾酒","\\B52","\\汽油弹",
				"\\玛丽","\\公牛","\\biu","\\幽灵冲击","\\biu2","\\biu3","\\爆系");
var actname=new Array(	"『寻星勇者』;『英雄之证』;『约定守护』;",
				"『风魔激光刃』;『祝福宝石』;",
				"电击鞭;☆电击器☆;",
				"小棍棒;冰沙;御神签;",
				"★RPG-7★;★标枪反坦克导弹★;",
				"老式火枪;原型武器G;定时炸弹;某种电子零件;",
				"高压线圈;原型武器G;原型武器C;某种机械设备;",
				"★阔剑地雷★;★M-200狙击步枪★;非法枪械部件;\\电磁发射装置;",
				"『高性能环形激光』;『高性能黑洞激光』;『高性能双重激光』;",
				"\\金色枪;增幅设备;巨大透镜;",
				"红色方块;黄色方块;蓝色方块;绿色方块;银色方块;金色方块;水晶方块;",
				"\\方块;非法枪械部件;",
				"恐龙玩偶;天使玩偶;团子玩偶;",
				"月宫 亚由的半身像;神尾 观铃的半身像;古河 渚的半身像;天泽 郁末的半身像;长森 瑞佳的半身像;枣 铃的半身像;",
				"《小黄的草帽》;《小黄的钓鱼竿》;《小黄的行军靴》;金色方块;银色方块;",
				"☆守矢神签☆;\\方块;向日葵;月光碎片;",
				"\\电击器;\\冰棍棒;\\RPG7;",
				"\\冰封刀;\\A刀;针筒;",
				"『精神震荡弹』;『音波装备』;『环形激光』;『单发榴弹炮』;『单向火箭炮』;『高性能子机』;『连射激光』;\\发条枪;消音器;重装子弹;",
				"『奥丁巨核装备』;『干扰用强袭装备』;『对舰用闪击装备』;『传说中的旋风激光』;『传说中的穿刺激光』;",
				"蒸馏水;地雷酥糖;甜生姜;",
				"香蕉;苹果;烂苹果;西瓜;",
				"香蕉皮;苹果皮;烂苹果皮;西瓜皮;",
				"打火机;探测器电池;电磁IED;脉冲防线;辐射IED;★阔剑地雷★;",
				"轻油;肥料;信管;导火线;",
				"\\炸药;水;地雷;",
				"伏特加;一杯八分满的啤酒;",
				"\\深水炸弹;轻油;肥料;",
				"咖啡酒;百利甜;伏特加;打火机;杯子;",
				"密封的酒瓶;★阔剑地雷★;\\B52;\\鸡尾酒;",
				"伏特加;柠檬汁;红石榴汁;密封的酒瓶;",
				"伏特加;牛肉汤;バカ⑨制冰块;密封的酒瓶;",
				"蒸馏水;天然水;一氧化二氢;",
				"★阔剑地雷★;某种电子零件;",
				"\\幽灵冲击;笔记本电脑;",
				"\\biu;\\biu2;\\汽油弹;",
				"\\自爆电池;\\炸药;\\深水炸弹;\\鸡尾酒;\\B52;\\汽油弹;\\幽灵冲击;");

function get_real(s)
{
	for (var i=0; i<patcnt; i++) if (patname[i]==s) return actname[i]; 
	return "";
}

function search_check(s1,s2)
{
	s2=s2+";"; var i=0;
	while (i<s2.length)
	{
		var j=s2.indexOf(";",i); 
		var pat=s2.slice(i,j);
		if (pat!="")
			if (pat.charAt(0)!="\\") 
			{
				if (pat==s1) return true;
			}
			else  if (search_check(s1,get_real(pat))) return true;
		i=j+1;
	}
	return false;
}

var mine_st=0;

function use_picked_up()
{
	//使用上次捡起的物品
	var where=find_item_name("驱云弹");
	if (where>0)
	{
		use_item(where.toString());
		return true;
	}
	var where=find_item_type("强化药物");
	if (where>0)
	{
		use_item(where.toString());
		return true;
	}
	var where=find_item_type("技能书籍");
	if (where>0)
	{
		use_item(where.toString());
		return true;
	}
	var where=find_item_type("歌魂增加");
	if (where>0)
	{
		use_item(where.toString());
		return true;
	}
	var where=find_item_type("身体装备");
	if (where>0)
	{
		if (pkname[where]=="德古拉的斗篷") return false;
		if (better(ieff,icnt,dbeff,dbcnt))
			use_item(where.toString());
		else  abandon_item(where.toString());
		return true;
	}
	var where=find_item_type("头部装备");
	if (where>0)
	{
		if (better(ieff,icnt,dheff,dhcnt))
			use_item(where.toString());
		else  abandon_item(where.toString());
		return true;
	}
	var where=find_item_type("手臂装备");
	if (where>0)
	{
		if (better(ieff,icnt,daeff,dacnt))
			use_item(where.toString());
		else  abandon_item(where.toString());
		return true;
	}
	var where=find_item_type("腿部装备");
	if (where>0)
	{
		if (better(ieff,icnt,dleff,dlcnt))
			use_item(where.toString());
		else  abandon_item(where.toString());
		return true;
	}
	var where=find_item_type("陷阱");
	if (where>0 && !search_check(pkname[where],search_target) && pkeff[where]<=300 && mine_st!=0)
	{
		use_item(where.toString());
		return true;
	}
	return false;
}

function better(_ae,_ac,_be,_bc)
{
	var ae,ac,be,bc;
	ae=parseInt(_ae); ac=parseInt(_ac); be=parseInt(_be); bc=parseInt(_bc); 
	if (_ac=="∞") ac=1; if (_bc=="∞") bc=1; 
	if (ae!=be) return ae>be;
	return ac>bc;
}

/////////////////////////////////// 基础操作模块结束 ///////////////////////////////////////////////////////////

var area_lst=new Array("端点","RF高校","雪之镇","索拉利斯","指挥中心","梦幻馆","清水池","白穗神社","墓地","麦斯克林","对天使用作战本部",
"夏之镇","三体星","光坂高校","守矢神社","常磐森林","常磐台中学","秋之镇","精灵中心","春之镇","圣Gradius学园","初始之树","幻想世界",
"永恒的世界","妖精驿站","冰封墓场","花菱商厦","FARGO前基地","风祭森林","天使队移动格纳库","和田町研究所","SCP研究设施","雏菊之丘");
var area_pyn=new Array("dd","rfgx","xuezz","slls","zhzx","mhg","qsc","bsss","md","mksl","dtsyzzbb",
"xiazz","stx","gbgx","ssss","cpsl","cptzx","qzz","jlzx","czz","sgradiusxy","cszs","hxsj",
"yhdsj","yjyz","bfmc","hlss","fargoqjd","fjsl","tsdydgnk","htdyjs","scpyjss","cjzq");

var to_delay_tag=0; 
var drop_item_tag=0;
var back_tag="";
var to_halt_tag=0;

var hint;
var here="", tim="";
var md_tag=0;
var bj_tag=0, bj_maxcount=0;
var mv_tag="";
var use_tag=0, use_tag_name="";
var user_drop_tag=0, user_drop_name="";
var fruit_tag=0;
var empower_name; 
var lv1name, lv1cost, lv2name, lv2cost;
var hplim, splim;
var Running=0;
var keywarn, minewarn, npcwarn, forbwarn;

function setkeyalert(ty)
{
	if (ty==0)
		keywarn.innerHTML='<b><font color="888888">■KEY弹</font></b>';
	else  if (ty==1)
		keywarn.innerHTML='<b><font color="FFFF00">■KEY弹</font></b>';
	else  keywarn.innerHTML='<b><font color="FF0000">■KEY弹</font></b>';
}

function setminealert(ty)
{
	if (ty==0)
		minewarn.innerHTML='<b><font color="888888">■危险雷</font></b>';
	else  minewarn.innerHTML='<b><font color="FF0000">■危险雷</font></b>';
}

function setnpcalert(ty)
{
	if (ty==0)
			npcwarn.innerHTML='<b><font color="888888">■偷NPC</font></b>';
	else  if (ty==1)
			npcwarn.innerHTML='<b><font color="FFFF00">■偷NPC</font></b>';
	else  if (ty==2)
			npcwarn.innerHTML='<b><font color="FF7700">■偷NPC</font></b>';
		else  npcwarn.innerHTML='<b><font color="FF0000">■偷NPC</font></b>';
}

function setforbalert(ty)
{
	if (ty==0)
		forbwarn.innerHTML='<b><font color="888888">■新禁区</font></b>';
	else  forbwarn.innerHTML='<b><font color="FF0000">■新禁区</font></b>';
}

function sv_danger()
{
	var s="";
	for (var i=1; i<=DangerCnt; i++) s+=danger_area[i]+">";
	GM_setValue(host_name+"danger_area",s);
}

function processlsd()
{
	var s="危险地区列表: ";
	if (DangerCnt==0) s+="暂时没有危险地区。";
	for (var i=1; i<=DangerCnt; i++)
		if (i==DangerCnt) s=s+danger_area[i]+"."; else s=s+danger_area[i]+", ";
	return s+"\n";
}

function processmkd_nosave(cmds)
{
	var z=cmds.slice(4), found=false;
	if (z=="" || z=="--help") return "mkd [地区名称] ： 把该地区标记为危险\n";
	for (var i=1; i<=DangerCnt; i++) if (danger_area[i]==z) found=true;
	if (found)
		return "地区 "+z+" 已经在危险地区列表中。\n";
	else
	{
		DangerCnt++; danger_area[DangerCnt]=z;
		push_log("添加了危险地区 "+z+"。",false);
		return "地区 "+z+" 已经被加入危险地区列表。\n";
	}
}

function processmkd(cmds)
{
	var z=cmds.slice(4), found=false;
	if (z=="" || z=="--help") return "mkd [地区名称] ： 把该地区标记为危险\n";
	for (var i=1; i<=DangerCnt; i++) if (danger_area[i]==z) found=true;
	if (found)
		return "地区 "+z+" 已经在危险地区列表中。\n";
	else
	{
		DangerCnt++; danger_area[DangerCnt]=z;
		push_log("添加了危险地区 "+z+"。",false);
		sv_danger();
		return "地区 "+z+" 已经被加入危险地区列表。\n";
	}
}

function processrmd(cmds)
{
	var z=cmds.slice(4), found=false, where;
	if (z=="" || z=="--help") return "rmd [地区名称] ： 把该地区从危险地区中删除\n";
	for (var i=1; i<=DangerCnt; i++) if (danger_area[i]==z) found=true, where=i;
	if (found)
	{
		for (var i=where+1; i<=DangerCnt; i++) danger_area[i-1]=danger_area[i]; DangerCnt--;
		push_log("删除了危险地区 "+z+"。",false);
		sv_danger();
		return "地区 "+z+" 已经从危险地区列表中删除。\n";
	}
	else  return "地区 "+z+" 不在危险地区列表中。\n";
}

function processldd()
{
	var s=GM_getValue(host_name+"danger_area","<");
	if (s=="<") return "没有找到保存的危险地区信息。\n";
	var i=0; DangerCnt=0;
	while (i<s.length)
	{
		var j=s.indexOf(">",i);
		DangerCnt++; danger_area[DangerCnt]=s.slice(i,j);
		i=j+1;
	}
	push_log("危险地区信息已经被重新加载。",false);
	return "危险地区信息已经被重新加载。\n";
}

function processcld()
{
	DangerCnt=0;
	push_log("清空了危险地区列表。",false);
	return "危险地区信息已经被清空。\n警告：除非处于死斗模式，否则强烈不建议这么做！\n";
}

function processavd(cmds)
{
	if (cmds=="avd") 
		if (Avoid_Danger_Area)
			return "自动回避危险地区开关处于打开状态。\n";
		else  return "自动回避危险地区开关处于关闭状态。\n";
		
	var s=cmds.charAt(4);
	if (s=="1")
	{
		if (Avoid_Danger_Area==0) push_log("打开了自动回避危险地区开关。",false);
		Avoid_Danger_Area=true;
		return "自动回避危险地区开关已经打开。\n";
	}
	else  if (s=="0")
	{
		Avoid_Danger_Area=false;
		push_log("关闭了自动回避危险地区开关。",false);
		return "自动回避危险地区开关已经被关闭。\n警告：除非处于死斗模式，否则强烈不建议这么做！\n";
	}
	else  return "avd [0/1] : 关闭/打开 自动回避危险地区开关。\n";
}

function check_danger_area(s)
{
	for (var i=1; i<=DangerCnt; i++) if (danger_area[i]==s) return true;
	return false;
}

function processalertlvl(cmds)
{
	var s=cmds.charAt(9), ff=false, zz="危险判定级别被设置为";
	if (cmds=="alertlvl") { s=alertlevel.toString(); ff=true; }
	if (ff) zz="当前危险判定级别是";
	if (s=="5")
	{
		alertlevel=5;
		if (!ff) push_log("危险判定级别被设置为5",false);
		return zz+"5\n回避敌人：蓝凝、女主、黑幕、杏仁豆腐、真职人\n";
	}
	else  if (s=="4")
	{
		alertlevel=4;
		if (!ff) push_log("危险判定级别被设置为4",false);
		return zz+"4\n回避敌人：蓝凝、女主、黑幕、杏仁豆腐\n";
	}
	else  if (s=="3")
	{
		alertlevel=3;
		if (!ff) push_log("危险判定级别被设置为3",false);
		return zz+"3\n回避敌人：蓝凝、女主、黑幕\n";
	}
	else  if (s=="2")
	{
		alertlevel=2;
		if (!ff) push_log("危险判定级别被设置为2",false);
		return zz+"2\n回避敌人：蓝凝、女主\n";
	}
	else  if (s=="1")
	{
		alertlevel=1;
		if (!ff) push_log("危险判定级别被设置为1",false);
		return zz+"1\n回避敌人：蓝凝\n";
	}
	else  if (s=="0")
	{
		alertlevel=0;
		if (!ff) push_log("危险判定级别被设置为0",false);
		return zz+"0\n不会回避任何敌人\n。"
	}
	else  return "alertlvl [0~5] : 设定危险判定级别。\n";
}

function processmoneykeep(cmds)
{
	if (cmds=="moneykeep") return "当前金额保留底线为"+money_base+"元\n";
	money_base=parseInt(cmds.slice(10));
	push_log("金额保留底线被设置为"+money_base+"元",false);
	return "金额保留底线被设置为"+money_base+"元\n";
}

function processemp()
{
	if (!Running) return "脚本不在运行状态！无法强化武器。\n";
	if (bj_tag>0) return "制造特级恢复药任务正在进行中，请等待任务结束！\n";
	if (md_tag>0) return "武器强化任务已经在进行中。\n";
	if (wpntype!="锐器" && wpntype!="钝器") return "你没有装备锐器或棍棒，无法强化！\n";
	if (wpntype=="钝器" && wpnname.indexOf("棍棒")==-1) return "你没有装备锐器或棍棒，无法强化！\n";
	if (wpntype=="锐器") empower_name="磨刀石"; else empower_name="钉";
	var cnx=0;
	for (var i=1; i<=6; i++) if (pkname[i]=="无" || (pktype[i]=="特殊" && pkname[i].indexOf(empower_name)!=-1)) cnx++;
	if (cnx==0) return "没有多余的空位装载"+empower_name+"！\n";
	if (empower_name=="磨刀石") 
	{
		lv1name="磨刀石"; lv1cost=250;
		lv2name="贤者之磨刀石"; lv2cost=600;
	}
	else
	{
		lv1name="钉"; lv1cost=60;
		lv2name="钢钉"; lv2cost=120;
	}
	if (money<money_base+lv1cost) return "你没有足够的钱购买"+empower_name+"。\n";
	md_tag=1;
	push_log("武器强化任务开始",false);
	return "武器强化任务开始。\n";
}

function processsup(cmds)
{
	if (cmds!="sup" && cmds!="sup -b") return "sup命令语法错误。\n";
	if (!Running) return "脚本不在运行状态！无法制造特级恢复药。\n";
	if (md_tag>0) return "武器强化任务正在进行中，请等待任务结束！\n";
	if (bj_tag>0) return "制造特级恢复药任务已经在进行中。\n";
	var found=0;
	for (var i=1; i<=6; i++) if (pkname[i]=="蒸馏水") found=1;
	if (!found) return "没有蒸馏水，无法制造特级恢复药！\n";
	if (money<40) return "没有足够的钱！\n";
	var cnx;
	if (cmds=="sup") 
	{
		cnx=0;
		for (var i=1; i<=6; i++) if (pkname[i]=="无" || pkname[i]=="特级恢复药") cnx++;
	}
	else
	{
		cnx=0;
		for (var i=1; i<=6; i++) 
		{
			if (pkname[i]=="蒸馏水") continue;
			if (pkname[i]=="无" || pkname[i]=="特级恢复药" || pktype[i]=="生命恢复" || pktype[i]=="体力恢复" || pktype[i]=="命体恢复" || pktype[i]=="药剂") cnx++;
		}
	}
	if (cnx<3) return "没有足够的空位！\n使用sup -b命令可以强制丢掉背包中补给和药剂以提供空位。\n";  
	bj_tag=1; bj_maxcount=money/40;
	push_log("制造特级恢复药任务开始",false);
	return "制造特级恢复药任务开始。\n";
}

function processmv(cmds)
{
	if (cmds=="mv") return "mv [地点缩写] : 移动到指定地点。\n";
	var pl=cmds.slice(3);
	var mcnt=0, p=new Array(50);
	for (var i=0; i<=32; i++)
		if (area_pyn[i].slice(0,pl.length)==pl)
		{
			mcnt++; p[mcnt]=i;
		}
	if (mcnt==0) return "找不到满足条件的地点。\n";
	if (mcnt>1)
	{
		var s="有多个地点满足条件： ";
		for (var i=1; i<=mcnt; i++) s+=area_lst[p[i]]+", ";
		s+="请给出更详细的信息。\n";
		return s;
	}
	mv_tag=area_lst[p[1]];
	return "已经前往地点 "+area_lst[p[1]]+"。\n";
}

function processuse(cmds)
{
	if (cmds=="use") return "use [包裹编号] : 使用指定包裹编号内的物品\n";
	if (!Running) return "脚本不在运行状态，无法执行。\n";
	var which=parseInt(cmds.charAt(4));
	if (which<1 || which>6) return "包裹编号错误。\n";
	if (pkname[which]=="无") return "指定包裹为空。\n";
	use_tag=which; use_tag_name=pkname[which];
	return "使用了包裹"+which+"中的物品 "+use_tag_name+"。\n";
}

function processdrop(cmds)
{
	if (cmds=="drop") return "drop [包裹编号] : 丢弃指定包裹编号的物品\n";
	if (!Running) return "脚本不在运行状态，无法执行。\n";
	var which=parseInt(cmds.charAt(5));
	if (which<1 || which>6) return "包裹编号错误。\n";
	if (pkname[which]=="无") return "指定包裹为空。\n";
	user_drop_tag=which; user_drop_name=pkname[which];
	return "丢弃了包裹"+which+"中的物品 "+user_drop_name+"。\n";
}

function processhplim(cmds)
{
	if (cmds=="hplim") return "当前的补血阈值为 "+hplim+"，当血量低于血量上限超过 "+hplim+" 时会自动补血。\n你可以使用hplim [数值]进行设置\n";
	var z=parseInt(cmds.slice(6));
	hplim=z;
	var s="成功地把补血阈值设置为 "+hplim+"。\n";
	push_log("补血阈值被设置为 "+hplim+"。",false);
	if (hplim>80) s+="警告: 强烈不建议把补血阈值设置为80以上！\n";
	return s;
}

function processsplim(cmds)
{
	if (cmds=="splim") return "当前的补体阈值为 "+splim+"，当体力低于 "+splim+" 时会自动补体力。\n你可以使用splim [数值]进行设置\n";
	var z=parseInt(cmds.slice(6));
	if (z<=50) return "设置失败！补体阈值必须大于50！\n";
	splim=z;
	var s="成功地把补体阈值设置为 "+splim+"。\n";
	push_log("补体阈值被设置为 "+splim+"。",false);
	return s;
}

var md_select="";
var tar_ou="\\电击器;\\冰棍棒;\\RPG7;\\补给材料;";
var tar_zh="\\冰封刀;\\A刀;针筒;\\补给材料;";
var tar_sh="『精神震荡弹』;『音波装备』;『环形激光』;『单发榴弹炮』;『单向火箭炮』;『高性能子机』;『连射激光』;\\发条枪;消音器;重装子弹;\\补给材料;";
var tar_li="☆守矢神签☆;\\方块;向日葵;月光碎片;\\补给材料;";
var tar_ba="\\自爆电池;\\炸药;\\深水炸弹;\\鸡尾酒;\\B52;\\汽油弹;\\幽灵冲击;\\补给材料;"

function processselmd(cmds)
{
	if (cmds=="selmd") return "selmd [ou/zh/sh/li/ba] 设置探索目标为殴系/斩系/射系/灵系/爆系基本探索目标\n";
	var z=cmds.slice(6);
	if (z=="ou")
	{
		push_log("探索目标被设定为殴系基本探索目标。");
		var cc=document.getElementById('gm_mytext2'); cc.value=tar_ou; setFind();
		return "探索目标已经被设定为殴系基本探索目标。\n";
	}
	else  if (z=="zh")
	{
		push_log("探索目标被设定为斩系基本探索目标。");
		var cc=document.getElementById('gm_mytext2'); cc.value=tar_zh; setFind();
		return "探索目标已经被设定为斩系基本探索目标。\n";
	}
	else  if (z=="sh")
	{
		push_log("探索目标被设定为射系基本探索目标。");
		var cc=document.getElementById('gm_mytext2'); cc.value=tar_sh; setFind();
		return "探索目标已经被设定为射系基本探索目标。\n";
	}
	else  if (z=="li")
	{
		push_log("探索目标被设定为灵系基本探索目标。");
		var cc=document.getElementById('gm_mytext2'); cc.value=tar_li; setFind();
		return "探索目标已经被设定为灵系基本探索目标。\n";
	}
	else  if (z=="ba")
	{
		if (mine_st==0) mine_st=2;		//爆系捡起陷阱应当自动埋设
		push_log("探索目标被设定为爆系基本探索目标。");
		var cc=document.getElementById('gm_mytext2'); cc.value=tar_ba; setFind();
		return "探索目标已经被设定为爆系基本探索目标。\n";
	}
	else  return "selmd语法错误。\n"
}

function processclr()
{
	md_tag=0; bj_tag=0; mv_tag=0; use_tag=0; user_drop_tag=0; fruit_tag=0;
	return "所有的标记都已经被清除了。\n";
}

function processmnst(cmds)
{
	if (cmds=="mnst") return "mnst [0/1/2] : 设置捡到陷阱时的策略。\n";
	if (cmds.charAt(5)=="0")
	{
		mine_st=0;
		return "设置陷阱策略为： 不捡起任何发现的陷阱。\n";
	}
	else  if (cmds.charAt(5)=="1")
	{
		mine_st=1;
		return "设置陷阱策略为： 发现低伤陷阱（不超过300效）时捡起并自动埋设，不捡起高伤陷阱。\n";
	}
	else  if (cmds.charAt(5)=="2")
	{
		mine_st=2;
		return "设置陷阱策略为： 发现低伤陷阱（不超过300效）时捡起并自动埋设，遇到高伤陷阱时捡起但不埋设。\n";
	}
	else  return "mnst语法错误。\n";
}

function processfrtmd(cmds)
{
	if (cmds=="frtmd") return "frtmd [0/1] : 关闭/开启削水果模式。\n";
	if (cmds.charAt(6)=="0")
	{
		fruit_tag=0;
		push_log("关闭了削水果模式。",false);
		return "削水果模式已经关闭。\n";
	}
	else  if (cmds.charAt(6)=="1")
	{
		fruit_tag=1;
		if (mine_st==0) processmnst("mnst 1");
		push_log("打开了削水果模式。",false);
		return "削水果模式已经打开。\n";
	}
}

function processrun()
{
	push_log("脚本开始执行。",false);
	Running=1;
	return "脚本开始执行。\n";
}

function processstop()
{
	push_log("脚本停止执行。",false);
	Running=0;
	return "脚本停止执行。\n";
}

function processcmd()
{
	var cmds=document.getElementById("promptcmd").value;
	var cmdt=document.getElementById("prompttext");
	cmdt.innerHTML=":~$ "+cmds+"\n";
	document.getElementById("promptcmd").value="";
	if (cmds=="lsd")
			cmdt.innerHTML+=processlsd();
	else  if (cmds.slice(0,3)=="mkd")
			cmdt.innerHTML+=processmkd(cmds);
	else  if (cmds.slice(0,3)=="rmd")
			cmdt.innerHTML+=processrmd(cmds);
	else  if (cmds=="ldd")
			cmdt.innerHTML+=processldd();
	else  if (cmds=="cld")
			cmdt.innerHTML+=processcld();
	else  if (cmds.slice(0,3)=="avd")
			cmdt.innerHTML+=processavd(cmds);
	else  if (cmds.slice(0,8)=="alertlvl")
			cmdt.innerHTML+=processalertlvl(cmds);
	else  if (cmds.slice(0,9)=="moneykeep")
			cmdt.innerHTML+=processmoneykeep(cmds);
	else  if (cmds=="emp")
			cmdt.innerHTML+=processemp();
	else  if (cmds.slice(0,3)=="sup")
			cmdt.innerHTML+=processsup(cmds);
	else  if (cmds.slice(0,2)=="mv")
			cmdt.innerHTML+=processmv(cmds);
	else  if (cmds.slice(0,3)=="use")
			cmdt.innerHTML+=processuse(cmds);
	else  if (cmds.slice(0,4)=="drop")
			cmdt.innerHTML+=processdrop(cmds);
	else  if (cmds.slice(0,5)=="hplim")
			cmdt.innerHTML+=processhplim(cmds);
	else  if (cmds.slice(0,5)=="splim")
			cmdt.innerHTML+=processsplim(cmds);
	else  if (cmds.slice(0,5)=="selmd")
			cmdt.innerHTML+=processselmd(cmds);
	else  if (cmds=="clr")
			cmdt.innerHTML+=processclr();
	else  if (cmds.slice(0,4)=="mnst")
			cmdt.innerHTML+=processmnst(cmds);
	else  if (cmds.slice(0,5)=="frtmd")
			cmdt.innerHTML+=processfrtmd(cmds);
	else  if (cmds=="run")
			cmdt.innerHTML+=processrun();
	else  if (cmds=="stop")
			cmdt.innerHTML+=processstop();
	else  if (cmds=="help")
			cmdt.innerHTML+="可用命令列表：\n lsd mkd rmd ldd cld avd alertlvl mnst moneykeep emp sup mv use drop hplim splim selmd clr frtmd run stop help\n";
	else  cmdt.innerHTML+="未知命令。 键入help命令以获取命令列表\n";
	cmdt.innerHTML+=":~$ _";
}

function check_nz0(s)
{
	if (s=="讲解员 梦美" || s=="喧哗少女 叶留佳" || s=="风纪委员 静流") return true;
	return false;
}

function check_zzr(s)
{
	if (s=="亚玛丽欧·维拉蒂安" || s=="爱情上甘岭" || s=="Erul Tron" || s=="Hank" || s=="221") return true;
	if (s=="真职人 亚玛丽欧·维拉蒂安" || s=="真职人 爱情上甘岭" || s=="真职人 Erul Tron" || s=="真职人 Hank" || s=="真职人 221") return true;
	return false;
}

function check_danger(s)
{
	if (s=="蓝凝" && alertlevel>0) return true;
	if (s=="红杀菁英 蓝凝" && alertlevel>0) return true;
	if ((s=="战斗模式 梦美" || s=="守卫者 静流" || s=="本气（？） 叶留佳") && alertlevel>1) return true;
	if ((s=="数据碎片 战斗模式 梦美" || s=="数据碎片 守卫者 静流" || s=="数据碎片 本气（？） 叶留佳") && alertlevel>1) return true;
	if (s=="Acg_Xilin" && alertlevel>2) return true;
	if (s=="黑幕 Acg_Xilin" && alertlevel>2) return true;
	if ((s=="冴月 麟" || s=="某四面") && alertlevel>3) return true;
	if ((s=="杏仁豆腐 冴月 麟" || s=="杏仁豆腐 某四面") && alertlevel>3) return true;
	if (check_zzr(s) && alertlevel>4) return true;
	return false;
}

function match_target(s1,s2)
{
	if (s2=="\\nonnpc") return enemy_type=="参战者";
	if (s2=="\\888") return check_zzr(s1);
	return s1==s2;
}

var npc_lst=new Array("红暮","红杀将军 红暮","水濑 名雪-改","全息幻象 水濑 名雪-改","立华 奏-改","全息幻象 立华 奏-改",
"思念体-海马 濑人","全息幻象 思念体-海马 濑人","思念体-触手众","全息幻象 思念体-触手众","冴月 麟","杏仁豆腐 冴月 麟",
"某四面","杏仁豆腐 某四面","Acg_Xilin","黑幕 Acg_Xilin","蓝凝","红杀菁英 蓝凝","SCP-682","■■ SCP-682","SCP-173",
"■■ SCP-173","SCP-076","■■ SCP-076","SCP-958","■■ SCP-958","AC专业喷子","各路党派 AC专业喷子","AC搬运职人",
"各路党派 AC搬运职人","AC翻唱职人","各路党派 AC翻唱职人","AC字幕职人","各路党派 AC字幕职人","亚玛丽欧·维拉蒂安",
"真职人 亚玛丽欧·维拉蒂安","爱情上甘岭","真职人 爱情上甘岭","Erul Tron","真职人 Erul Tron","Hank","真职人 Hank",
"221","真职人 221","便当盒","真职人 便当盒","讲解员 梦美","数据碎片 讲解员 梦美","喧哗少女 叶留佳",
"数据碎片 喧哗少女 叶留佳","风纪委员 静流","数据碎片 风纪委员 静流","战斗模式 梦美","数据碎片 战斗模式 梦美","守卫者 静流",
"数据碎片 守卫者 静流","本气（？） 叶留佳","数据碎片 本气（？） 叶留佳");

function checknpc(s1)
{
	for (var i=0; i<=57; i++) if (s1==npc_lst[i]) return true;
	return false;
}

function match_target2(s1,s2)
{
	if (s2=="\\nonnpc") return !checknpc(s1);
	if (s2=="\\888") return check_zzr(s1);
	return s1==s2;
}

var zgn=0;
var zgs=0;

function get_shopitem_id(s,it)
{
	var z1=s.indexOf(">"+it+"/");
	if (z1==-1) return "0";
	while (s.charAt(z1)!="i" || s.charAt(z1+1)!="d" || s.charAt(z1+2)!="=") z1--;
	var bg=s.indexOf("\"",z1)+1;
	var ed=s.indexOf("\"",bg);
	return s.slice(bg,ed);
}

function find_item_name2(s)
{
	for (var i=1; i<=6; i++) if (pkname[i]==s) return i;
	return 0;
}

var sig="0000";

function Run() { pid=setInterval(function()
{
	//获取最新的目标信息
	var wh=GM_getValue(host_name+"info","");
	var pl=0;
	while (pl<wh.length)
	{
		var z1=wh.indexOf(">",pl);
		var iname=wh.slice(pl,z1);
		var z2=wh.indexOf(">",z1+1);
		var iwhere=wh.slice(z1+1,z2);
		var z3=wh.indexOf(">",z2+1);
		var iwhen=wh.slice(z2+1,z3)
		pl=z3+1;
		if (check_danger(iname) && !check_danger_area(iwhere))
		{
			push_log("根据情报，在 "+iwhere+" 发现了危险敌人 "+iname+"。",true);
			processmkd("mkd "+iwhere);
		}
		if (match_target2(iname,kill_target))
			if (kill_target.charAt(0)!="\\")		//如果是精确定位
			{
				here=iwhere; tim=iwhen;
			}							//否则优先选择不在危险区域内的
			else  if (!check_danger_area(iwhere) || !Avoid_Danger_Area) { here=iwhere; tim=iwhen; }
	}
	if (here!="")
		hint.innerHTML="<font size=2><span class=\"evergreen\">hint: "+here+" ("+tim+")</span></font>";

	//获取最新的警报信息
	var lastsig=sig;
	sig=GM_getValue(host_name+"warnsig","0000");
	if (lastsig[0]!=sig[0]) setkeyalert(parseInt(sig[0]));
	if (lastsig[1]!=sig[1]) setminealert(parseInt(sig[1]));
	if (lastsig[2]!=sig[2]) setnpcalert(parseInt(sig[2]));
	if (lastsig[3]!=sig[3]) setforbalert(parseInt(sig[3]));
	
	//这里处理跨越多个时钟周期的操作。
	if (Running && to_delay_tag>0) { to_delay_tag=0; return; }
	if (Running && drop_item_tag>0) { $('input[name=submit][value=确定]').click(); drop_item_tag=0; return; }
	if (Running && abandon_tag>0) { abandon_item(abandon_s); return; }
	if (Running && mix_tag>0) { mix_item(mixmask); return; }
	getstate();
	if (Running) if (use_picked_up()) return;
	//这里处理上次探索的结果。 判定是否在与外界交互状态（此时卸下武器、物品操作均不可用）
	if (mv_tag!="" && current_place==mv_tag) mv_tag="";
	var s;
	s=document.getElementById("log").innerHTML;
	if (use_tag>0 && s.indexOf(">"+use_tag_name+"<")!=-1) use_tag=0;
	if (user_drop_tag>0 && s.indexOf(">"+user_drop_name+"<")!=-1) user_drop_tag=0;
	if (Running)
		if (enemy_spotted(s))
		{	
			//判定他是不是参战者
			var pl=sa.indexOf("<td class=\"b1\" colspan=\"2\"><span>");
			if (pl==-1) return;
			pl=sa.indexOf("<td class=\"b1\" colspan=\"2\"><span>",pl+1);
			if (pl==-1) return;
			pl=sa.indexOf("<span>",pl); pl=sa.indexOf(">",pl)+1;
			var ed=sa.indexOf("(",pl);
			enemy_type=sa.slice(pl,ed);
			//不攻击未变身女主
			if (check_nz0(enemy_name)) { $('input[name=back]').click(); return; }
			//检查危险敌人
			if (check_danger(enemy_name))
			{
				push_log("在 "+current_place+" 发现了危险敌人 "+enemy_name,true);
				processmkd("mkd "+current_place);
				$('input[name=back]').click(); 
				return;
			}
			if (game_mode==2)		//普通模式下见到敌人自动攻击
			{
				//没有紧急药剂的情况下不去惹真职人
				if (check_zzr(enemy_name) && find_item_name2("紧急药剂")==0)
					$('input[name=back]').click(); 
				else  $('input[name=w1]').click();
			}
			else  if (game_mode==1)		//开局模式下见到敌人自动逃跑
					$('input[name=back]').click(); 
			else
			{
				//追杀模式下主动发现敌人，如果不是追杀目标，且是安静模式，则逃跑
				if (!match_target(enemy_name,kill_target) && KeepQuiet)
					$('input[name=back]').click(); 
				else	$('input[name=w1]').click();
			}
			return;
		}
		else  if (spotted_by_enemy(s) && !spotted_dead(s))
		{
			//被敌人袭击,返回
			var pl=s.indexOf("你搜索着周围的一切。。。<br><span class=\"red\">");
			pl=s.indexOf(">",pl); pl=s.indexOf(">",pl+1)+1;
			var ed=s.indexOf("<",pl);
			enemy_name=s.slice(pl,ed);
			if (check_danger(enemy_name))
			{
				push_log("在 "+current_place+" 发现了危险敌人 "+enemy_name,true);
				processmkd("mkd "+current_place);
			}
			$('input[name=submit][value=确定]').click(); 
			return;
		}
		else  if (spotted_dead(s))
		{
			//发现了尸体
			if (game_mode==3 && s.indexOf("被你杀死了！</span><br>你发现了<span class=\"red\">"+kill_target+"</span>")!=-1)	
			{
				//目标被杀死
				push_log("猎杀任务完成",true);
				stopRun();
				return;
			}
			var tx=s.indexOf("你发现了<span class=\"red\">");
			if (game_mode==3 && tx!=-1)
			{
				tx=s.indexOf(">",tx)+1; var ed=s.indexOf("<",tx);
				var deadname=s.slice(tx,ed);
				if (match_target2(deadname,kill_target)) return;	//发现目标尸体时暂停
			}
			//不是，返回
			var st=document.getElementById("cmd").innerHTML;
			var pl=st.indexOf("<input name=\"mode\" value=\"corpse\" type=\"hidden\">");
			var cna=0, dname=new Array(15), dstuff=new Array(15), zc=-1, zt=-1, zm=0;
			var i=0;
			var spename="/////";
			if (wpntype=="锐器") spename="混沌黑磨刀石/特殊/40/8";
			if (wpntype=="钝器" && wpnname.indexOf("棍棒")!=-1) spename="艾莲娜的圣钉/特殊/40/10";
			while (true)
			{
				i=st.indexOf("id=\"",i);
				if (i==-1) break;
				i=st.indexOf("\"",i)+1; var j=st.indexOf("\"",i);
				cna++; dname[cna]=st.slice(i,j);
				i=st.indexOf(">",i); i=st.indexOf(">",i+1)+1;
				j=st.indexOf("<",i);
				dstuff[cna]=st.slice(i,j);
				if (dstuff[cna]=="紧急药剂/药剂/1/3") zt=cna;
				if (dstuff[cna]==spename) zc=cna;
				if (dname[cna]=="money") zm=1;
			}
			var xx=find_item_name2("紧急药剂");
			if (xx>0 && pkcnt[xx]>15) zt=-1;	//有15支紧急药剂就差不多够用了
			if (zc!=-1)	//有对应的强化道具
				if (!document.getElementById(dname[zc]).checked)
				{
					document.getElementById(dname[zc]).checked=true;
					return;	
				}
				else
				{
					zgn++; if (zgn<3) return; 	//获取一定的延时
				}
			else  if (zm==0 && zt!=-1)	//没有钱，但有紧急药剂
					if (!document.getElementById(dname[zt]).checked)
					{
						document.getElementById(dname[zt]).checked=true;
						return;
					}
					else
					{
						zgn++; if (zgn<3) return;	//获取一定的延时
					}
			zgn=0;
			$('input[name=submit][value=提交]').click(); 
			return;
		}
		else  if (s.indexOf("你向<span class=\"red\">")!=-1 && s.indexOf("</span>发起了攻击！")!=-1)
		{
			var pl=s.indexOf("你向<span class=\"red\">"); pl=s.indexOf(">",pl)+1;
			var ed=s.indexOf("<",pl);
			enemy_name=s.slice(pl,ed);
			if (check_danger(enemy_name))
			{
				push_log("在 "+current_place+" 发现了危险敌人 "+enemy_name,true);
				processmkd("mkd "+current_place);
			}
			$('input[name=submit][value=确定]').click(); 
			return;
		}
		
	var t0=document.getElementById("cmd");
	if (Running && t0!=null)
	{
		s=t0.innerHTML;
		if (found_item(s))
		{
			if (game_mode==3 && !allow_pick_up)	//追杀模式下且不允许捡起物品时，直接丢弃
			{
				$('input[name=dropitm0]').click(); 
				return;
			}
			//找到了物品，提取物品属性
			var bg, ed;
			bg=s.indexOf("<span class=\"yellow\">")+21;
			ed=s.indexOf("</span>");
			var itemname=s.slice(bg,ed);
			bg=s.indexOf("类型：")+3;
			ed=s.indexOf("，",bg);
			var itemtype=s.slice(bg,ed);
			var itemskill="";
			if (s.indexOf("属性：")!=-1)
			{
				bg=s.indexOf("属性：")+3;
				ed=s.indexOf("，",bg);
				itemskill=s.slice(bg,ed);
			}
			bg=s.indexOf("效：",ed)+2;
			ed=s.indexOf("，",bg);
			var itemeff=s.slice(bg,ed);
			bg=s.indexOf("耐：",ed)+2;
			ed=s.indexOf("。",bg);
			var itemcnt=s.slice(bg,ed);
			if ((itemtype=="强化药物") || (itemtype=="技能书籍") || (itemtype=="歌魂增加") || (itemname=="驱云弹"))
			{
				//强化物品，吃掉
				if (pkcount!=6)
					$('input[name=itemget]').click();
				else  $('input[name=dropitm0]').click(); 
			}
			else  if ((itemtype=="身体装备") || (itemtype=="头部装备") || (itemtype=="手臂装备") || (itemtype=="腿部装备"))
			{
				//防具，如果比当前的好就留下
				if (pkcount==6) { $('input[name=dropitm0]').click(); return; }
				var keep=1;
				if ((itemtype=="身体装备") && (!better(itemeff,itemcnt,dbeff,dbcnt))) keep=0;
				if ((itemtype=="头部装备") && (!better(itemeff,itemcnt,dheff,dhcnt))) keep=0;
				if ((itemtype=="手臂装备") && (!better(itemeff,itemcnt,daeff,dacnt))) keep=0;
				if ((itemtype=="腿部装备") && (!better(itemeff,itemcnt,dleff,dlcnt))) keep=0;
				if ((itemtype=="身体装备") && (dbname=="『Poini Kune的死库水』" || dbname=="『Erul Tron的泳装』" || dbname=="『传说中的飞行员服』")) keep=0;
				if (!keep)
					$('input[name=dropitm0]').click(); 
				else  $('input[name=itemget]').click();
			}
			else  if (search_check(itemname,search_target))
			{
				//发现了探索目标
				push_log("探索任务完成，发现了物品 "+itemname,true);
				$('input[name=itemget]').click();
			}
			else  if (itemtype=="陷阱") 
			{
				if (mine_st==0) $('input[name=dropitm0]').click();
				if (mine_st==1) if (itemeff<=300) $('input[name=itemget]').click(); else $('input[name=dropitm0]').click();
				if (mine_st==2) $('input[name=itemget]').click();
				return;
			}
			else  if (fruit_tag>0 && search_check(itemname,"\\水果;"))
			{
				$('input[name=itemget]').click();
			}
			else
			{
				//丢弃
				$('input[name=dropitm0]').click(); 
			}
			return;
		}
		else  if (mergable_item(s))	//合并补给
		{
			$('input[id*=itm][onclick*=merge][onclick*=postCmd][type=button]').click();
			//这里如果不延时可能会导致出现错误的“整理包裹”操作，但似乎不会产生严重影响，为加快速度，去掉了延时
			to_delay_tag=1;
			return;
		}
	}
	//现在可以保证不处于与外界交互状态，判断是否需要执行各项内务操作
	if (Running && hp+hplim<mhp)
	{
		//用面包补血
		var where=find_item_name("面包"); 
		if (where>0) { use_item(where); return; }
		//用特级恢复药补血
		var where=find_item_name("特级恢复药"); 
		if (where>0) { use_item(where); return; }
		//用酱包补血
		var where=find_item_name("更改菜谱后的不甜酱包"); 
		if (where>0) { use_item(where); return; }
		//用KEY补给补血
		var where=find_item_name("秋生大叔的面包"); 
		if (where>0) { use_item(where); return; }
		//啥都没有……
		where=find_item_type("生命恢复");
		if (where>0) { use_item(where); return; }
		where=find_item_type("命体恢复");
		if (where>0) { use_item(where); return; }
	}
	if (Running && sp<splim)
	{
		//用矿泉水补体力
		var where=find_item_name("矿泉水"); 
		if (where>0) { use_item(where); return; }
		//用特级恢复药补体力
		var where=find_item_name("特级恢复药"); 
		if (where>0) { use_item(where); return; }
		//用酱包补体力
		var where=find_item_name("更改菜谱后的不甜酱包"); 
		if (where>0) { use_item(where); return; }
		//用KEY补给补体力
		var where=find_item_name("秋生大叔的面包"); 
		if (where>0) { use_item(where); return; }
		//啥都没有……
		where=find_item_type("体力恢复");
		if (where>0) { use_item(where); return; }
		where=find_item_type("命体恢复");
		if (where>0) { use_item(where); return; }
	}
	if ((Running) && ($('img[src="img/hurt.gif"]').length>0))
	{
		//包扎伤口
		$('img[src="img/hurt.gif"]').click(); 
		return;
	}
	var ss=document.documentElement.innerHTML;
	var pl=ss.indexOf("<td class=\"b2\"><span>受伤部位</span></td>");
	if (Running && pl!=-1)
	{
		pl=ss.indexOf("<span>",pl); pl=ss.indexOf("<span>",pl+1)+7; 
		if (ss.charAt(pl)!="无" && find_item_name("紧急药剂")>0)
		{
			use_item(find_item_name("紧急药剂"));
			return;
		}
	}
	
	if (Running && fruit_tag>0)
	{
		if (find_item_name("水果刀")==0)
		{
			if (money<150) 
			{
				push_log("没钱买水果刀了，切水果任务结束。",true);
				fruit_tag=0;
				return;
			}
			if (current_place!="花菱商厦" && current_place!="光坂高校")
			{
				if (!check_danger_area("光坂高校"))
				{	
						if (move_to("光坂高校")) return; 
				}
				else  if (move_to("花菱商厦")) return;
			}
			else
			{
				var st=document.getElementById("cmd");
				if (st.length==0 || (st.innerHTML.indexOf("id=\"shop12\"")==-1 && st.innerHTML.indexOf("请输入购买数量：<input")==-1))
				{
					$('input[id=sp_shop]').click();
					return;
				}
				else
				{
					zgs++; if (zgs<2) return;
					zgs=0;
					if (st.innerHTML.indexOf("id=\"shop12\"")!=-1)
						if (!document.getElementById("shop12").checked)
							document.getElementById("shop12").checked=true;
						else  $('input[name=submit][value="提交"]').click();
					else  
					{
						var x1=get_shopitem_id(st.innerHTML,"水果刀");
						if (!document.getElementById(x1).checked)
							document.getElementById(x1).checked=true;
						else  $('input[name=submit][value="提交"]').click();
						return;
					}
				}
			}
		}
		else
		{
			var found=0;
			for (var i=1; i<=6; i++) if (search_check(pkname[i],"\\水果;")) found=1;
			if (found) 
			{
				use_item(find_item_name("水果刀"));
				return;
			}
			for (var i=1; i<=6; i++) 
				if (search_check(pkname[i],"\\水果皮;"))
				{
					use_item(i);
					return;
				}
		}
	}
	
	if (Running && md_tag>0)
	{
		var found=0;
		for (var i=1; i<=6; i++)
			if (pktype[i]=="特殊" && pkname[i].indexOf(empower_name)!=-1)
				found=i;
		if (found>0)
		{
			use_item(found);
			return;
		}	
		else  if (money>=money_base+lv1cost)
				if (current_place!="花菱商厦" && current_place!="光坂高校")
				{
					if (!check_danger_area("光坂高校"))
					{	
						if (move_to("光坂高校")) return; 
					}
					else  if (move_to("花菱商厦")) return;
				}
				else
				{
					var st=document.getElementById("cmd");
					if (st.length==0 || (st.innerHTML.indexOf("id=\"shop12\"")==-1 && st.innerHTML.indexOf("请输入购买数量：<input")==-1))
					{
						$('input[id=sp_shop]').click();
						return;
					}
					else
					{
						zgs++; if (zgs<2) return;
						zgs=0;
						if (st.innerHTML.indexOf("id=\"shop12\"")!=-1)
							if (!document.getElementById("shop12").checked)
								document.getElementById("shop12").checked=true;
							else  $('input[name=submit][value="提交"]').click();
						else  
						{
							var x1=get_shopitem_id(st.innerHTML,lv2name);
							var x2=get_shopitem_id(st.innerHTML,lv1name);
							if (x1!="0" && money>=money_base+lv2cost)
								if (!document.getElementById(x1).checked)
								{
									document.getElementById(x1).checked=true;
									var ts=(money-money_base)/lv2cost;
									var pl=st.innerHTML.indexOf("id=\""+x1+"\"");
									pl=st.innerHTML.indexOf("数:",pl)+2;
									var ed=st.innerHTML.indexOf("】",pl);
									var num=parseInt(st.innerHTML.slice(pl,ed));
									if (num<ts) ts=num;
									document.getElementsByName("buynum")[0].value=ts;
								}
								else  $('input[name=submit][value="提交"]').click();
							else  if (!document.getElementById(x2).checked)
								{
									document.getElementById(x2).checked=true;
									var ts=(money-money_base)/lv1cost;
									var pl=st.innerHTML.indexOf("id=\""+x2+"\"");
									pl=st.innerHTML.indexOf("数:",pl)+2;
									var ed=st.innerHTML.indexOf("】",pl);
									var num=parseInt(st.innerHTML.slice(pl,ed));
									if (num<ts) ts=num;
									document.getElementsByName("buynum")[0].value=ts;
								}
								else  $('input[name=submit][value="提交"]').click();
						}
						return;
					}
				}
			else
			{
				push_log("武器强化任务结束。",true);
				md_tag=0;
			}
	}
	else 
	{
		if (md_tag>0) push_log("武器强化任务结束。",true);
		md_tag=0;
	}
	
	if (Running && bj_tag>0)
	{
		if (current_place!="花菱商厦" && current_place!="光坂高校")
		{
			if (!check_danger_area("光坂高校"))
			{	
				if (move_to("光坂高校")) return; 
			}
			else  if (move_to("花菱商厦")) return;
		}
		var empty=0;
		for (var i=1; i<=6; i++) if (pkname[i]=="无" || pkname[i]=="特级恢复药" || pkname[i]=="治疗针" || pkname[i]=="体力回复药") empty++;
		var spare=0;
		for (var i=1; i<=6; i++)
		{
			if (pkname[i]=="蒸馏水") continue;
			if (pkname[i]=="无" || pkname[i]=="特级恢复药" || pktype[i]=="生命恢复" || pktype[i]=="体力恢复" || pktype[i]=="命体恢复" || pktype[i]=="药剂") spare++;
		}
		if (spare<3)
		{
			push_log("没有足够的空位，制造特级恢复药任务异常结束。",true);
			bj_tag=0;
			return;
		}
		if (empty<3)
		{
			var found=0;
			for (var i=1; i<=6; i++)
			{
				if (pkname[i]=="蒸馏水" || pkname[i]=="无" || pkname[i]=="特级恢复药") continue;
				if (pktype[i]=="生命恢复" || pktype[i]=="体力恢复" || pktype[i]=="命体恢复" || pktype[i]=="药剂") 
				{
					found=i;
					break;
				}
			}
			push_log("为制造特级恢复药，丢弃了背包"+found+"中的物品 "+pkname[found]+"。");
			abandon_item(found);
			return;
		}
		var found=0, cnw=0;
		for (var i=1; i<=6; i++)
			if (pkname[i]=="蒸馏水")
			{
				found=1;
				cnw=pkcnt[i];
			}
		if (bj_maxcount<cnw) cnw=bj_maxcount;
		if (!found)
		{
			push_log("制造特级恢复药任务结束。",true);
			bj_tag=0;
			return;
		}
		var found=0;
		for (var i=1; i<=6; i++)
			if (pkname[i]=="治疗针")
				found=1;
		if (!found) 
		{
			buy_item("1","5",cnw);
			return;
		}
		var found=0;
		for (var i=1; i<=6; i++)
			if (pkname[i]=="体力回复药")
				found=1;
		if (!found) 
		{
			buy_item("1","2",cnw);
			return;
		}
		var mxs=0;
		for (var i=1; i<=6; i++)
			if (pkname[i]=="治疗针" || pkname[i]=="体力回复药" || pkname[i]=="蒸馏水")
				mxs=mxs | (1<<(i-1));
		mix_item(mxs);
		return;
	}
	
	if (Running && use_tag>0)
	{
		push_log("根据指令，使用了包裹"+use_tag+"中的物品 "+use_tag_name+"。",true);
		use_item(use_tag);
		return;
	}
	
	if (Running && user_drop_tag>0)
	{
		push_log("根据指令，丢弃了包裹"+user_drop_tag+"中的物品 "+user_drop_name+"。",true);
		abandon_item(user_drop_tag);
		return;
	}
	
	//判定枪械装填弹药。
	if (Running && (wpntype=="重型枪械" || wpntype=="远程兵器"))
	{
		var need_reload=0, bullet_type;
		if (wpntype=="重型枪械")
		{
			if (wpncnt=="∞") { need_reload=1; bullet_type="重型弹药"; } else need_reload=0;
		}
		else  if (wpnsk.indexOf("一发")!=-1)
				need_reload=0;
		else  if (wpnsk.indexOf("电击")!=-1 || wpnsk.indexOf("音波")!=-1)
			{
				var bullim; if (wpnsk.indexOf("连击")!=-1) bullim=6; else bullim=2;
				if (wpncnt=="∞" || parseInt(wpncnt)<bullim) { need_reload=1; bullet_type="能源弹药"; } else need_reload=0;
			}
		else  if (wpnsk.indexOf("冻气")!=-1 || wpnsk.indexOf("火焰")!=-1)
			{
				var bullim; if (wpnsk.indexOf("连击")!=-1) bullim=6; else bullim=2;
				if (wpncnt=="∞" || parseInt(wpncnt)<bullim) { need_reload=1; bullet_type="气体弹药"; } else need_reload=0;
			}
		else  if (wpnsk.indexOf("连击")!=-1)
			{
				if (wpncnt=="∞" || parseInt(wpncnt)<6) { need_reload=1; bullet_type="机枪弹药"; } else need_reload=0;
			}
		else  if (wpncnt=="∞" || parseInt(wpncnt)<2) { need_reload=1; bullet_type="手枪弹药"; } else need_reload=0;
		
		if (need_reload && find_item_type(bullet_type)>0)
		{
			use_item(find_item_type(bullet_type));
			return;
		}
	}
	
	//内务处理完成，现在可以进行探索了，探索的结果将在下一次时钟周期被处理
	if (mv_tag!="")
	{
		push_log("根据指令，移动到了 "+mv_tag+"。",true);
		move_to(mv_tag);
		return;
	}
	if (Running && here!="" && game_mode==3 && AutoTrace && current_place!=here && (!Avoid_Danger_Area || !check_danger_area(here)))
	{
		//自动追踪模式，前往其所在地点
		push_log("根据情报，移动到了 "+here+"。",true);
		if (move_to(here)) return;
	}
	if (Running && check_danger_area(current_place) && Avoid_Danger_Area) 
	{
		//当前区域被标记为危险
		var found=33;
		for (var i=0; i<=32; i++)
			if (!check_danger_area(area_lst[i]))
			{
				found=i; break;
			}
		push_log("当前区域危险，因此移动到了 "+area_lst[found]+"。",true);
		move_to(area_lst[found]);
		return;
	}
	
	if (Running) $('input[name=search]').click(); 	//探索
},220); }

function startRun()
{
	push_log("脚本开始执行。",false);
	Running=1;
}

function stopRun()
{
	push_log("脚本停止执行。",false);
	Running=0;
}

function setKill()
{
	kill_target=document.getElementById("gm_mytext").value;
	if (kill_target=="") 
			push_log("猎杀目标被清空。",false);
	else  if (kill_target=="\\nonnpc")
			push_log("猎杀目标被设定为 所有玩家。",false);
	else  if (kill_target=="\\888")
			push_log("猎杀目标被设定为 所有真职人。",false);
	else  push_log("猎杀目标被设定为 "+kill_target,false);
	here=""; hint.innerHTML="<font size=2><span class=\"evergreen\">hint: </span></font>";;
}

function setFind()
{
	search_target=document.getElementById("gm_mytext2").value;
	if (search_target=="") 
		push_log("探索目标被清空。",false);
	else  push_log("探索目标被设定为 "+search_target,false);
}

var WatchCnt=0;
var scrbuilded=false;
var st;

var Awhen=new Array(10000), Awho=new Array(10000), Acnt;
var Bwhen=new Array(2000), Bwhere=new Array(2000), Bcnt;
var Cwho=new Array(2000), Cwhere=new Array(2000), Cwhen=new Array(2000), all;
var Dwho=new Array(2000), Dwhere=new Array(2000), Dwhen=new Array(2000);
var Ewho=new Array(2000), Ewhere=new Array(2000), Ewhen=new Array(2000);
var killed=new Array(2000);

var vip_npc=new Array("冴月 麟","某四面","Acg_Xilin","亚玛丽欧·维拉蒂安","爱情上甘岭","Erul Tron","Hank","221");
var vip_hp=new Array(0,0,0,0,0,0,0,0);
var vip_killed=new Array(0,0,0,0,0,0,0,0);
var hash=new Array(10000), hptr=0;

function processkilling(s)
{
	var tm="";
	var z1=s.indexOf("时"); tm=tm+s.slice(0,z1)+":";
	var z2=s.indexOf("分"); tm=tm+s.slice(z1+1,z2)+":";
	var z3=s.indexOf("秒"); tm=tm+s.slice(z2+1,z3);
	z1=s.indexOf("<span class=\"yellow\">");
	if (z1==-1) return;
	var bg=s.indexOf(">",z1)+1; var ed=s.indexOf("<",bg);
	if (ed==-1) return;
	dead_name=s.slice(bg,ed);
	for (var i=0; i<8; i++) if (vip_npc[i]==dead_name) vip_killed[i]=1;
	z1=s.indexOf("<span class=\"yellow\">",z1+1);
	if (z1==-1) return;
	z1=s.indexOf(">",z1);
	z2=s.indexOf("<",z1);
	if (z2==-1) return;
	var iname=s.slice(z1+1,z2);
	z1=s.indexOf("<span class=\"red\">",z1);
	if (z1==-1) return;
	z1=s.indexOf("</span>",z1);
	if (z1==-1) return;
	z1=s.indexOf(">",z1)+1;
	if (s.slice(z1,z1+3)=="被毒死") return;	//排除下毒党
	z1=s.indexOf("<span class=\"yellow\">【",z1);
	if (z1==-1) return;
	Acnt++; Awhen[Acnt]=tm; Awho[Acnt]=iname;
}

var keywarnsig=0, keywarninfo="";
var minewarnsig=0, minewarninfo="";
var npcwarnsig=0, npcwarninfo="";
var forbwarnsig=0, forbwarninfo="";

function ResetWatch()
{
	keywarnsig=0; keywarninfo=""
	minewarnsig=0; minewarninfo="";
	npcwarnsig=0; npcwarninfo="";
	forbwarnsig=0; forbwarninfo="";
	Acnt=0; Bcnt=0; all=0;
	for (var i=0; i<8; i++) vip_hp[i]=0;
	for (var i=0; i<8; i++) vip_killed[i]=0;
	hptr=0;
}

function checkkeywarn(s)
{
	if (s.indexOf("<span class=\"lime\">")==-1) return;
	var bg=s.indexOf("<span class=\"lime\">"); bg=s.indexOf(">",bg)+1;
	s=s.slice(bg);
	if ((s.indexOf("合成了旁观轮回的覆唱诗")!=-1 || s.indexOf("合成了四季流转的咏叹调")!=-1) && keywarnsig==0) 
	{
		keywarnsig=1;
		keywarninfo="警告： 有人合成了KEY弹半成品。\n";
	}
	if (s.indexOf("合成了【KEY系催泪弹】")!=-1)
	{
		keywarnsig=2;
		keywarninfo="警告： 有人合成了KEY弹。\n";
	}
}

function checkminewarn1(s)
{
	if (s.indexOf("<span class=\"yellow\">")==-1) return;
	var bg=s.indexOf("<span class=\"yellow\">"); bg=s.indexOf(">",bg)+1;
	if (s.indexOf("</span><br>",bg)==-1) return;
	var ed=s.indexOf("</span><br>",bg);
	s=s.slice(bg,ed);
	if (s.indexOf("打开了残存的礼品盒，")==-1 && s.indexOf("打开了礼品盒，")==-1 && s.indexOf("打开了浮☆云，")==-1) return;
	if (s.indexOf("获得了★一发逆转神话★！")!=-1 || s.indexOf("获得了★荆棘式电子地雷★！")!=-1 || s.indexOf("获得了★小得奇怪的香蕉★！")!=-1 || s.indexOf("获得了★黑白色的烂苹果★！")!=-1)
	{
		minewarnsig=1;
		minewarninfo="警告： 有人从礼品盒中获得了高伤陷阱。\n";
	}
}

function checkminewarn2(s)
{
	if (s.indexOf("<span class=\"yellow\">")==-1) return;
	var bg=s.indexOf("<span class=\"yellow\">"); bg=s.indexOf(">",bg)+1;
	if (s.indexOf("</span><br>",bg)==-1) return;
	var ed=s.indexOf("</span><br>",bg);
	s=s.slice(bg,ed);
	if (s.indexOf("回避了")==-1 || s.indexOf("设置的陷阱")==-1) return;
	if (s.indexOf("☆★☆大打击☆★☆")!=-1 || s.indexOf("★荆棘式电子地雷★")!=-1 || s.indexOf("★全图不唯一的野生巨大香蕉皮★")!=-1)
	{
		minewarnsig=1;
		minewarninfo="警告： 有人发现了高伤陷阱，地图上可能存在更多。\n";
	}
}

function checkminewarn2(s)
{
	if (s.indexOf("<span class=\"yellow\">")==-1) return;
	var bg=s.indexOf("<span class=\"yellow\">"); bg=s.indexOf(">",bg)+1;
	if (s.indexOf("</span><br>",bg)==-1) return;
	var ed=s.indexOf("</span><br>",bg);
	s=s.slice(bg,ed);
	if (s.indexOf("回避了")==-1 || s.indexOf("设置的陷阱")==-1) return;
	if (s.indexOf("☆★☆大打击☆★☆")!=-1 || s.indexOf("★荆棘式电子地雷★")!=-1 || s.indexOf("★全图不唯一的野生巨大香蕉皮★")!=-1)
	{
		minewarnsig=1;
		minewarninfo="警告： 有人发现了高伤陷阱，地图上可能存在更多。\n";
	}
}

function checkminewarn3(s)
{
	if (s.indexOf("<span class=\"red\">")==-1) return;
	var bg=s.indexOf("<span class=\"red\">"); bg=s.indexOf(">",bg)+1;
	if (s.indexOf("</span><br>",bg)==-1) return;
	var ed=s.indexOf("</span><br>",bg);
	s=s.slice(bg,ed);
	if (s.indexOf("中了")==-1 || s.indexOf("设置的陷阱")==-1) return;
	if (s.indexOf("☆★☆大打击☆★☆")!=-1 || s.indexOf("★荆棘式电子地雷★")!=-1 || s.indexOf("★全图不唯一的野生巨大香蕉皮★")!=-1)
	{
		minewarnsig=1;
		minewarninfo="警告： 有人踩了高伤陷阱，地图上可能存在更多。\n";
	}
}

var dmgname="", dmgcnt=0;

function parsedmg(s,s1,s2,s3,needswap)
{
	var t1=s.indexOf(s1);
	if (t1==-1) return;
	t1+=s1.length;
	var t2=s.indexOf(s2);
	if (t2==-1 || t2<t1) return;
	if (needswap) dmgcnt=parseInt(s.slice(t1,t2)); else dmgname=s.slice(t1,t2);
	t2+=s2.length;
	var t3=s.indexOf(s3);
	if (t3==-1 || t3<t2) return;
	if (!needswap) dmgcnt=parseInt(s.slice(t2,t3)); else dmgname=s.slice(t2,t3);
}

var hprime=1572187;
var hmod=1828302031;

function checkhurt(s)
{
	var zs=s;
	var bg=s.indexOf("<span class=\"clan\">");
	if (bg==-1) return;
	bg=s.indexOf(">",bg)+1;
	ed=s.indexOf("<",bg);
	s=s.slice(bg,ed);
	dmgname=""; dmgcnt=0;
	if (s.indexOf("对")!=-1 && s.indexOf("做出了")!=-1 && s.indexOf("点的攻击，一定是有练过。")!=-1)
			parsedmg(s,"对","做出了","点的攻击，一定是有练过。",false);
	else  if (s.indexOf("拿了什么神兵？")!=-1 && s.indexOf("被打了")!=-1 && s.indexOf("滴血。")!=-1)
			parsedmg(s,"拿了什么神兵？","被打了","滴血。",false);
	else  if (s.indexOf("简直不是人！")!=-1 && s.indexOf("瞬间被打了")!=-1 && s.indexOf("点伤害。")!=-1)
			parsedmg(s,"简直不是人！","瞬间被打了","点伤害。",false);
	else  if (s.indexOf("发出会心一击！")!=-1 && s.indexOf("损失了")!=-1 && s.indexOf("点生命！")!=-1)
			parsedmg(s,"发出会心一击！","损失了","点生命！",false);
	else  if (s.indexOf("使出浑身解数奋力一击！")!=-1 && s.indexOf("点伤害！")!=-1 && s.indexOf("还安好吗？")!=-1)
			parsedmg(s,"使出浑身解数奋力一击！","点伤害！","还安好吗？",true);
	else  if (s.indexOf("使出武器中内藏的力量！可怜的")!=-1 && s.indexOf("受到了")!=-1 && s.indexOf("点的伤害！")!=-1)
			parsedmg(s,"使出武器中内藏的力量！可怜的","受到了","点的伤害！",false);
	else  if (s.indexOf("眼色一变使出绝招！")!=-1 && s.indexOf("招架不住，生命减少")!=-1 && s.indexOf("点！")!=-1)
			parsedmg(s,"眼色一变使出绝招！","招架不住，生命减少","点！",false);
	else  if (s.indexOf("手中的武器闪耀出七彩光芒！")!=-1 && s.indexOf("招架不住，生命减少")!=-1 && s.indexOf("点！")!=-1)
			parsedmg(s,"手中的武器闪耀出七彩光芒！","招架不住，生命减少","点！",false);
	else  if (s.indexOf("受到天神的加护，打出惊天动地的一击——")!=-1 && s.indexOf("被打掉")!=-1 && s.indexOf("点生命值！")!=-1)
			parsedmg(s,"受到天神的加护，打出惊天动地的一击——","被打掉","点生命值！",false);
	else  if (s.indexOf("燃烧自己的生命得到了不可思议的力量！【")!=-1 && s.indexOf("】点的伤害值，没天理啊……")!=-1 && s.indexOf("的HP足够么？")!=-1)
			parsedmg(s,"燃烧自己的生命得到了不可思议的力量！【","】点的伤害值，没天理啊……","的HP足够么？",true);
	else  if (s.indexOf("超越自己的极限爆发出了震天动地的力量！在【")!=-1 && s.indexOf("】点的伤害后，")!=-1 && s.indexOf("化作了一颗流星！")!=-1)
			parsedmg(s,"超越自己的极限爆发出了震天动地的力量！在【","】点的伤害后，","化作了一颗流星！",true);
	else  if (s.indexOf("运转百万匹周天，吐气扬声，一道霸气的光束过后，在【")!=-1 && s.indexOf("】点的伤害下，")!=-1 && s.indexOf("还活着么？")!=-1)
			parsedmg(s,"运转百万匹周天，吐气扬声，一道霸气的光束过后，在【","】点的伤害下，","还活着么？",true);
	else  if (s.indexOf("已然和手中的武器成为一体！随着一声令大地崩塌的长啸，")!=-1 && s.indexOf("吃下了【")!=-1 && s.indexOf("】点的伤害！")!=-1)
			parsedmg(s,"已然和手中的武器成为一体！随着一声令大地崩塌的长啸，","吃下了【","】点的伤害！",false);
	else  if (s.indexOf("站在战场上，而")!=-1 && s.indexOf("因为受到了【")!=-1 && s.indexOf("】点的伤害现在已经不见踪影！")!=-1)
			parsedmg(s,"站在战场上，而","因为受到了【","】点的伤害现在已经不见踪影！",false);
	else  if (s.indexOf("将")!=-1 && s.indexOf("击飞出【")!=-1 && s.indexOf("业已经天下无敌！")!=-1)
			parsedmg(s,"将","击飞出【","】的",false);
	
	var which=-1;
	for (var i=0; i<8; i++) if (dmgname==vip_npc[i]) which=i;
	if (which==-1) return;
	
	var hval=0;
	for (var i=0; i<zs.length; i++) hval=(hval*hprime+zs.charCodeAt(i))%hmod;
	
	var found=0;
	for (var i=1; i<=hptr; i++) if (hash[i]==hval) { found=1; break; }
	if (found) return;
	hptr++; hash[hptr]=hval;
	
	vip_hp[which]+=dmgcnt;
}

function processLineA(s)
{
	processkilling(s);
	checkkeywarn(s);
	checkminewarn1(s);
	checkminewarn2(s);
	checkminewarn3(s);
	checkhurt(s);
}

var ftag=0;

function checkforbarea1(s)
{
	if (ftag!=0) return;
	if (s.slice(0,21)!="<span class=\"yellow\">") return;
	if (s.indexOf("【系统】警告，以下区域即将成为禁区：")==-1) return;
	ftag=1; 
}

function checkforbarea2(s)
{
	if (ftag!=0) return;
	if (s.slice(0,21)!="<span class=\"yellow\">") return;
	if (s.indexOf("【系统】增加禁区：")==-1) return;
	ftag=2; 
}

function checkdeath(s)
{
	if (s.slice(0,18)!="<span class=\"red\">") return;
	if (s.slice(-7)!="</span>") return;
	var tm=s.slice(-16,-8);
	var z1=s.indexOf("【"), z2=s.indexOf("】");
	if (z1==-1 || z2==-1) return;
	var place=s.slice(z1+1,z2);
	Bcnt++; Bwhen[Bcnt]=tm; Bwhere[Bcnt]=place;
}

function processLineB(s)
{
	checkdeath(s);
	checkforbarea1(s);
	checkforbarea2(s);
}

var pidd;
var wtpro;
var zal=0;

function startWatch() { pidd=setInterval(function()
{
	WatchCnt++;
	//创建提示
	if (WatchCnt==1)
	{
		if (!scrbuilded)	//建立监视屏
		{
			scrbuilded=true;
			var btn = document.getElementsByClassName("title")[0];
			var logp = document.createElement("div");
			logp.innerHTML="<textarea id=\"watchlog\" style=\"background-color:000000; font-size: 12px; border-left: 0px; \
			border-right: 0px; border-top: 0px; border-bottom: 0px; resize:none; color:00FF00\" rows=15 cols=50 spellcheck=\"false\" \
			readOnly=\"true\"></textarea>";
			btn.appendChild(logp);
		}
		wtpro.innerHTML="<font size=3><span class=\"evergreen\">提示: 进行状况监视工具正在运行中……</span></font>";
	}
	if (WatchCnt%3==1)
	{
		//监视消息页面
		st=document.getElementById("newsinfo").innerHTML;	//获取消息列表
		var pl=st.indexOf("</B></span><br>");
		pl=st.indexOf("<br>",pl)+4; Acnt=0; var pcn=0;
		var maxc=500; if (WatchCnt==1) maxc=10000;	//执行一次全局检索
		while (pl<st.length && pcn<=maxc)
		{
			var ed=st.indexOf("</li>",pl);
			if (ed==-1) break;
			var s=st.slice(pl+4,ed);
			processLineA(s);
			pcn++;
			pl=ed+5;
		}
		$('button[onclick*=chat]').click();
	}
	else  if (WatchCnt%3==2)
	{
		ftag=0;
		//监视聊天页面
		st=document.getElementById("newsinfo").innerHTML;	//获取消息列表
		var pl=0; Bcnt=0;
		while (pl<st.length)
		{
			var ed=st.indexOf("<br>",pl);
			if (ed==-1) break;
			var s=st.slice(pl,ed);
			processLineB(s);
			pl=ed+4;
		}
		if (ftag==1) forbwarnsig=1; 
		if (ftag==2) forbwarnsig=0;
		var p1=1, p2=1; all=0;
		while (p1<=Acnt && p2<=Bcnt)
		{
			if (Awhen[p1]==Bwhen[p2])
			{
				all++; Cwho[all]=Awho[p1]; Cwhere[all]=Bwhere[p2]; Cwhen[all]=Bwhen[p2];
				p1++; p2++;
			}
			else  if (Awhen[p1]>Bwhen[p2])
					p1++;
				else  p2++;
		}
		for (var i=1; i<=all; i++) killed[i]=false;
		for (var i=1; i<=all; i++)
			for (var j=i+1; j<=all; j++)
				if (Cwho[i]==Cwho[j])
					killed[j]=true;
		var ca=0;
		for (var i=1; i<=all; i++)
			if (!killed[i])
			{
				ca++; Cwho[ca]=Cwho[i]; Cwhere[ca]=Cwhere[i]; Cwhen[ca]=Cwhen[i];
			}
		all=ca;
		ca=0; p1=1; p2=1;
		while (p1<=all && p2<=zal)
		{
			if (Cwhen[p1]>Dwhen[p2])
			{
				ca++; Ewhen[ca]=Cwhen[p1]; Ewhere[ca]=Cwhere[p1]; Ewho[ca]=Cwho[p1]; p1++;
			}
			else
			{
				ca++; Ewhen[ca]=Dwhen[p2]; Ewhere[ca]=Dwhere[p2]; Ewho[ca]=Dwho[p2]; p2++;
			}
		}
		while (p1<=all) { ca++; Ewhen[ca]=Cwhen[p1]; Ewhere[ca]=Cwhere[p1]; Ewho[ca]=Cwho[p1]; p1++; }
		while (p2<=zal) { ca++; Ewhen[ca]=Dwhen[p2]; Ewhere[ca]=Dwhere[p2]; Ewho[ca]=Dwho[p2]; p2++; }
		for (var i=1; i<=ca; i++) killed[i]=false;
		for (var i=1; i<=ca; i++)
			for (var j=i+1; j<=ca; j++)
				if (Ewho[i]==Ewho[j])
					killed[j]=true;
		zal=0;
		for (var i=1; i<=ca; i++)
			if (!killed[i])
			{
				zal++; Dwho[zal]=Ewho[i]; Dwhere[zal]=Ewhere[i]; Dwhen[zal]=Ewhen[i];
			}
		var fn="", gn="";
		for (var i=1; i<=zal; i++)
		{
			fn=fn+Dwho[i]+">"+Dwhere[i]+">"+Dwhen[i]+">";
			gn=gn+Dwho[i]+" / "+Dwhere[i]+" / "+Dwhen[i]+"\n";
		}
		var sufmax=0;
		for (var i=0; i<8; i++) if (!vip_killed[i] && vip_hp[i]>sufmax) sufmax=vip_hp[i]; 
		if (sufmax<500) 
				npcwarnsig=0;
		else  if (sufmax<1000) 
				npcwarnsig=1;
		else  if (sufmax<1500)
				npcwarnsig=2;
			else  npcwarnsig=3;
		
		for (var i=0; i<8; i++) 
			if (!vip_killed[i] && vip_hp[i]>=500)
				gn="警告： npc "+vip_npc[i]+" 正在被偷袭！ 已经受到了至少 "+vip_hp[i]+" 点伤害。\n"+gn;
			
		var hn=(keywarnsig+"")+(minewarnsig+"")+(npcwarnsig+"")+(forbwarnsig+"");
		document.getElementById('watchlog').value=gn;
		GM_setValue(host_name+"info",fn);
		GM_setValue(host_name+"warnsig",hn);
		$('button[onclick*=all]').click();
	}
},1350); }

function SetKeepQuiet()
{
	if (document.getElementById("gm_chkbox1").checked)
	{
		KeepQuiet=true;
		push_log("进入安静模式",false);
	}
	else  
	{
		KeepQuiet=false;
		push_log("退出安静模式",false);
	}
}

function SetAutoTrace()
{
	if (document.getElementById("gm_chkbox2").checked)
	{
		AutoTrace=true;
		push_log("自动追踪被启用",false);
	}
	else  
	{
		AutoTrace=false;
		push_log("自动追踪被关闭",false);
	}
}

function SetMode1()
{
	push_log("当前模式被设置为 探索模式",false);
	game_mode=1;
}

function SetMode2()
{
	push_log("当前模式被设置为 普通模式",false);
	game_mode=2;
}

function SetMode3()
{
	push_log("当前模式被设置为 猎杀模式",false);
	game_mode=3;
}

function SetAllowPick()
{
	if (document.getElementById("gm_chkbox3").checked)
	{
		allow_pick_up=false;
		push_log("将自动丢弃探索得到的物品",false);
	}
	else  
	{
		allow_pick_up=true;
		push_log("将不会自动丢弃探索得到的物品",false);
	}
}

//主程序

//检测jquery是否已经被成功加载、GM API是否有效
if (!GM_setValue || !GM_getValue)
{
	alert('Greasemonkey版本太旧，没有支持getValue和setValue的API。请升级到最新版Greasemonkey再运行。');
	return;
}
if (!jQuery) 
{
	alert('jQuery没有被成功加载，这可能是Greasemonkey版本太旧，不支持require命令造成的。请升级到最新版Greasemonkey再运行。');
	return;
}

//找到当前脚本在哪个服务器运行
host_name=window.location.host+"";

//找到这个脚本在进行状况下运行还是游戏中运行
var sa=document.documentElement.innerHTML;
if (sa.indexOf("显示最新的50条消息</button>")!=-1)
{
	//在进行状况页面中运行
	$('button[onclick*=all]').click();
	//创建按钮。
	var btn = document.getElementsByClassName("title")[0];
	var prompt = document.createElement("div");
	prompt.innerHTML="<table id=\"gm_table\" border=\"0\" align=\"center\"></table>";
	btn.appendChild(prompt);
	var x=document.getElementById('gm_table').insertRow(0);
	var prompt=x.insertCell(0);
	prompt.innerHTML="<input type='button' value='开始'/>";
	prompt.addEventListener('click',startWatch,false);
	var prompt=x.insertCell(1);
	prompt.innerHTML="<input type='button' value='重置'/>";
	prompt.addEventListener('click',ResetWatch,false);
	var btn = document.getElementsByClassName("title")[0];
	wtpro = document.createElement("div");
	wtpro.innerHTML="<font size=3><span class=\"evergreen\">提示: 进行状况监视工具不在运行</span></font>";
	btn.appendChild(wtpro);
}
else
{
	//在游戏中运行
	//创建按钮。
	var btn = document.getElementsByClassName("title")[0];
	var prompt = document.createElement("div");
	prompt.innerHTML="<table id=\"gmtab\" border=\"1\" align=\"center\"></table>";
	btn.appendChild(prompt);
	var x=document.getElementById('gmtab').insertRow(0);
	var maincell=x.insertCell(0);
	var optioncell=x.insertCell(1);
	var promptcell=x.insertCell(2);
	var warncell=x.insertCell(3);
	warncell.style.backgroundColor="#000000"; 
	promptcell.innerHTML="<table id=\"gmtab6\" border=\"0\"></table>";
	var x3=document.getElementById('gmtab6').insertRow(0);
	var y3=x3.insertCell(0);
	y3.innerHTML="<textarea id=\"prompttext\" style=\"background-color:000000; font-size: 12px; border-left: 0px; \
	border-right: 0px; border-top: 0px; border-bottom: 0px; resize:none; color:00FF00\" rows=5 cols=43 spellcheck=\"false\" \
	readOnly=\"true\">:~$ _</textarea>";
	var x3=document.getElementById('gmtab6').insertRow(1);
	var y3=x3.insertCell(0);
	y3.innerHTML="<input type='text' id=\"promptcmd\" style=\"background-color:000000; font-size: 14px; border-left: 0px; \
	border-right: 0px; border-top: 0px; border-bottom: 0px; color:00FF00\" spellcheck=\"false\" size=37>";
	y3.addEventListener('change',processcmd,false);
	var logcell=x.insertCell(4);
	logcell.innerHTML="<textarea id=\"logtext\" style=\"background-color:000000; font-size: 12px; border-left: 0px; \
	border-right: 0px; border-top: 0px; border-bottom: 0px; resize:none; overflow:hidden; color:00FF00\" rows=8 cols=50 \
	spellcheck=\"false\" readOnly=\"true\"></textarea>";
	for (var i=1; i<=7; i++) log_str[i]="";
	push_log("运行日志",false);
	maincell.innerHTML="<table id=\"gmtab2\" border=\"0\"></table>";
	var x2=document.getElementById('gmtab2').insertRow(0);
	var y2=x2.insertCell(0);
	y2.innerHTML="<table id=\"gmtab3\" border=\"0\"></table>";
	var x=document.getElementById('gmtab3').insertRow(0);
	var prompt=x.insertCell(0);
	prompt.innerHTML="<input type='button' value='开始'/>";
	prompt.addEventListener('click',startRun,false);
	var prompt=x.insertCell(1);
	prompt.innerHTML="<input type='button' value='暂停'/>";
	prompt.addEventListener('click',stopRun,false);
	var x2=document.getElementById('gmtab2').insertRow(1);
	var y2=x2.insertCell(0);
	y2.innerHTML="<input name=\"gmmode\" type=\"radio\" id=\"radio1\" checked=true/>探索模式<br> \
			<input name=\"gmmode\" type=\"radio\" id=\"radio2\" />普通模式<br> \
			<input name=\"gmmode\" type=\"radio\" id=\"radio3\" />猎杀模式<br>"
	var x=document.getElementById('radio1');
	x.addEventListener('click',SetMode1,false);
	var x=document.getElementById('radio2');
	x.addEventListener('click',SetMode2,false);
	var x=document.getElementById('radio3');
	x.addEventListener('click',SetMode3,false);
	optioncell.innerHTML="<table id=\"gmtab4\" border=\"0\"></table>";
	var x=document.getElementById('gmtab4').insertRow(0);
	var y=x.insertCell(0);
	y.innerHTML="<font size=2><span class=\"evergreen\">探索目标:</span></font><input type='text' id='gm_mytext2' value=''/>";
	var cc=document.getElementById('gm_mytext2');
	cc.addEventListener('change',setFind,false);
	var x=document.getElementById('gmtab4').insertRow(1);
	var y=x.insertCell(0);
	y.innerHTML="<font size=2><span class=\"evergreen\">猎杀目标:</span></font><input type='text' id='gm_mytext' value=''/>";
	var cc=document.getElementById('gm_mytext');
	cc.addEventListener('change',setKill,false);
	var x=document.getElementById('gmtab4').insertRow(2);
	hint=x.insertCell(0);
	hint.innerHTML="<font size=2><span class=\"evergreen\">hint: </span></font>";
	var x=document.getElementById('gmtab4').insertRow(3);
	var y=x.insertCell(0);
	y.innerHTML="<table id=\"gmtab5\" border=\"0\"></table>";
	var x2=document.getElementById('gmtab5').insertRow(0);
	y=x2.insertCell(0);
	y.innerHTML="<input id='gm_chkbox1' type=\"checkbox\">保持安静";
	var cc=document.getElementById('gm_chkbox1');
	cc.addEventListener('click',SetKeepQuiet,false);
	y=x2.insertCell(1);
	y.innerHTML="<input id='gm_chkbox2' type=\"checkbox\">自动追踪";
	var cc=document.getElementById('gm_chkbox2');
	cc.addEventListener('click',SetAutoTrace,false);
	y=x2.insertCell(2);
	y.innerHTML="<input id='gm_chkbox3' type=\"checkbox\">不捡起物品";
	var cc=document.getElementById('gm_chkbox3');
	cc.addEventListener('click',SetAllowPick,false);
	warncell.innerHTML="<table id=\"gmtab7\" border=\"0\"></table>";
	var x=document.getElementById('gmtab7').insertRow(0);
	var y=x.insertCell(0); y.innerHTML="警告信息";
	var x=document.getElementById('gmtab7').insertRow(1);
	keywarn=x.insertCell(0);
	keywarn.innerHTML='<b><font color="888888">■KEY弹</font></b>';
	var x=document.getElementById('gmtab7').insertRow(2);
	minewarn=x.insertCell(0);
	minewarn.innerHTML='<b><font color="888888">■危险雷</font></b>';
	var x=document.getElementById('gmtab7').insertRow(3);
	npcwarn=x.insertCell(0);
	npcwarn.innerHTML='<b><font color="888888">■偷NPC</font></b>';
	var x=document.getElementById('gmtab7').insertRow(4);
	forbwarn=x.insertCell(0);
	forbwarn.innerHTML='<b><font color="888888">■新禁区</font></b>';
	//初始化设定
	processmkd_nosave("mkd 冰封墓场");
	processmkd_nosave("mkd SCP研究设施");
	processmkd_nosave("mkd 雏菊之丘");
	processalertlvl("alertlvl 4");
	processmoneykeep("moneykeep 300");
	processhplim("hplim 40");
	processsplim("splim 51");
	Run();
}

