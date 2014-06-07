// ==UserScript==
// @name           ACDTS KEY Helper
// @namespace      a simple ACDTS Helper by Lemon
// @version        1.3
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
	一个简单的 ACFUN大逃杀 KEY弹辅助工具 v1.3
	使用说明
	* 点start键开始；stop可以暂停。
	* 第二行的输入框是留空时是摸KEY模式，非空时为追杀模式。在摸KEY时请务必留空，否则不会捡起任何物品。
	* 摸KEY模式下请务必保证背包中没有杂物，且手上没有武器！
	* 摸KEY模式下，如果勾选锁定目标选项，则会自动移动到清水池摸KEY。
	* 摸KEY全自动合成，无需人工干预。
	* 追杀模式下，请首先新开一个进行状况窗口，点开始键。进行状况窗口中的脚本会与游戏窗口中的脚本通信，确定敌人位置。
	* 把目标姓名写入第二行文本框，装备武器点start即可。
	* 主动定位追杀目标位置，定位依据是目标最后一次杀兵的位置，显示在hint栏上。
	* 注意追杀模式下不会捡起地上的任何物品，因此请保证补给足够。
	* 追杀模式下，当勾选锁定目标选项时，会自动前往目标最后一次杀兵的位置进行探索。
	* 如果卡住了只需刷新页面再次start即可。
	脚本目前在摸KEY模式中，实现了：
	* 自动补血补体，自动包扎伤口
	* 遇到敌人时自动逃跑
	* 摸到无害物品（强化药、技能书、药剂、无毒的水）时自动吃
	* 摸到防具时如果比当前的好会自动替换、自动扔掉原来的防具
	* 自动尝试合成酱包
	* 如果有条件合成酱包且补给不足时（矿泉水小于20），即使以丢弃半身像为代价也会合成
	* 自动保留需要的半身像、自动合成半身像
	* 当背包满时自动把当前耐久最高的半身像作为武器，背包重新有空位时自动卸下武器
	脚本目前在追杀模式中，实现了：
	* 自动补血补体，自动包扎伤口
	* 自动丢弃所有摸到的物品
	* 只对目标进行攻击
	* 当脚本运行于进行状况页面时，会实时监视运行状况，并与游戏窗口中的脚本通信，确定目标最后一次杀兵位置。
	* 可以选择根据目标位置信息自动追踪目标
*/

/////////////////////////////////// 基础操作模块开始 ///////////////////////////////////////////////////////////

var host_name;

var enemy_name;

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
	var s1="突然向你袭来！";
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

function check_KEY_item(s)
{
	if (s=="月宫 亚由的半身像") return true;
	if (s=="神尾 观铃的半身像") return true;
	if (s=="古河 渚的半身像") return true;
	if (s=="天泽 郁末的半身像") return true;
	if (s=="长森 瑞佳的半身像") return true;
	if (s=="枣 铃的半身像") return true;
	if (s=="四季流转的咏叹调") return true;
	if (s=="旁观轮回的覆唱诗") return true;
	return false;
}

function get_KEY_ID(s)
{
	if (s=="月宫 亚由的半身像") return 1;
	if (s=="神尾 观铃的半身像") return 2;
	if (s=="古河 渚的半身像") return 4;
	if (s=="四季流转的咏叹调") return 7;
	if (s=="天泽 郁末的半身像") return 8;
	if (s=="长森 瑞佳的半身像") return 16;
	if (s=="枣 铃的半身像") return 32;
	if (s=="旁观轮回的覆唱诗") return 56;
	return 0;
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

var wpntype, wpnname, wpneff, wpncnt;
var current_place;

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
	var wpntype=sa.slice(bg+7,z1);
	if (wpntype=="空手")	//特判没有装备武器的情况
	{
		wpnname="拳头"; wpneff="0"; wpncnt="0";
	}
	else
	{
		bg=sa.indexOf("<span>",bg+1);
		if (sa.charAt(bg-1)!="\t")	//不是探索状态，装备可以被卸下
			bg=sa.indexOf("<span>",bg+1);
		z1=sa.indexOf("</span>",bg);
		wpnname=sa.slice(bg+7,z1);
		bg=sa.indexOf("<span>",bg+1); bg=sa.indexOf("<span>",bg+1);
		z1=sa.indexOf("</span>",bg);
		wpneff=sa.slice(bg+6,z1);
		bg=sa.indexOf("<span>",bg+1);
		z1=sa.indexOf("</span>",bg);
		wpncnt=sa.slice(bg+6,z1);
	}
	
	//获取当前位置
	current_place=document.getElementById("pls").innerHTML;
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

function check_duplicate(s)
{
	//检查半身像是否与背包物品冗余
	for (var i=1; i<=6; i++)
		if (check_KEY_item(pkname[i]))
		{
			var x=get_KEY_ID(pkname[i]), y=get_KEY_ID(s);
			if ((x&y)==y) return true;
		}
		
	//检查是否有半身像与武器冗余了
	if (check_KEY_item(wpnname) && ((get_KEY_ID(wpnname)&get_KEY_ID(s))==get_KEY_ID(s))) return true;
	return false;
}

/////////////////////////////////// 基础操作模块结束 ///////////////////////////////////////////////////////////

function use_picked_up()
{
	//使用上次捡起的物品
	var where=find_item_name("水");
	if (where>0)
	{
		use_item(where.toString());
		return true;
	}
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
	var where=find_item_type("药剂");
	if (where>0)
	{
		use_item(where.toString());
		return true;
	}
	var where=find_item_type("身体装备");
	if (where>0)
	{
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

var kill_target="";

var to_delay_tag=0; 
var drop_item_tag=0;
var back_tag="";
var to_halt_tag=0;

var hint;
var here="", tim="";
var AutoTrace=false;

var Running=0;

function Run() { pid=setInterval(function()
{
	//这里处理跨越多个时钟周期的操作。
	if (Running && to_delay_tag>0) { to_delay_tag=0; return; }
	if (Running && drop_item_tag>0) { $('input[name=submit][value=确定]').click(); drop_item_tag=0; return; }
	if (Running && abandon_tag>0) { abandon_item(abandon_s); return; }
	if (Running && mix_tag>0) { mix_item(mixmask); return; }
	getstate();
	if (Running) if (use_picked_up()) return;
	//这里处理上次探索的结果。 判定是否在与外界交互状态（此时卸下武器、物品操作均不可用）
	var s;
	s=document.getElementById("log").innerHTML;
	if (Running)
		if (enemy_spotted(s))
		{
			//主动发现敌人，如果不是追杀目标，逃跑
			if (enemy_name==kill_target)
				$('input[name=w1]').click();
			else	$('input[name=back]').click(); 
			return;
		}
		else  if (spotted_by_enemy(s))
		{
			//被敌人袭击,返回
			$('input[name=submit][value=确定]').click(); 
			return;
		}
		else  if (spotted_dead(s))
		{
			//发现了尸体
			if (s.indexOf("被你杀死了！</span><br>你发现了")!=-1)	//判定是否是追杀目标
			{
				stopRun();
				alert("任务完成");
				return;
			}
			//不是，返回
			$('input[name=submit][value=提交]').click(); 
			return;
		}
		else  if (s.indexOf("你向<span class=\"red\">"+kill_target+"</span>发起了攻击！")!=-1)
		{
			$('input[name=submit][value=确定]').click(); 
			return;
		}
		
	var t0=document.getElementById("cmd");
	if (Running && t0!=null)
	{
		s=t0.innerHTML;
		if (found_item(s))
		{
			if (kill_target!="")	//非追杀模式下才会捡起物品
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
			if (check_KEY_item(itemname))
			{
				//KEY系物品，保留
				if (check_duplicate(itemname) && pkcount==6)
					$('input[name=dropitm0]').click(); 
				else  
				{
					$('input[name=itemget]').click(); 
					if (pkcount==6) to_delay_tag=1;
				}
			}	
			else  if (((itemname=="水") && (itemeff=="75") && (itemcnt=="2") && (sp+75<msp)) || (itemname=="驱云弹"))
			{
				//75/2的水，喝掉； 驱云弹，用掉
				if (pkcount!=6)
					$('input[name=itemget]').click();
				else  $('input[name=dropitm0]').click(); 
			}
			else  if (((itemname=="地雷酥糖") || (itemname=="甜生姜")) && (find_item_name("面包")>0) && (find_item_name("更改菜谱后的不甜酱包")==0))
			{
				//尝试合成酱包
				if (pkcount==6 && pkcnt[find_item_name("矿泉水")]>=20)		//还有至少20瓶矿泉水，压力不大，不丢半身像了
					$('input[name=dropitm0]').click(); 
				else  
				{
					$('input[name=itemget]').click();
					if (pkcount==6) to_delay_tag=1;
				}
			}
			else  if ((itemtype=="强化药物") || (itemtype=="技能书籍") || (itemtype=="歌魂增加") || (itemtype=="药剂"))
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
				if ((itemtype=="身体装备") && (dbname=="『Poini Kune的死库水』" || dbname=="『Erul Tron的泳装』")) keep=0;
				if (!keep)
					$('input[name=dropitm0]').click(); 
				else  $('input[name=itemget]').click();
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
			//to_delay_tag=1;
			return;
		}
		else  if (package_full(s))	//背包满了
		{
			var bg=s.indexOf("获得了物品<span class=\"yellow\">");
			bg=s.indexOf(">",bg)+1;
			var ed=s.indexOf("</span>",bg);
			var itemname=s.slice(bg,ed);
			if (itemname=="地雷酥糖" || itemname=="甜生姜")	//此时情况一定是4半身像+生姜/酥糖，丢掉一个半身像
			{
				var chosen=0;
				for (var i=1; i<=6; i++)
					if (check_KEY_item(pkname[i]))
					{
						chosen=i; break;
					}
				$('input[value=swapitm'+(chosen+"")+']').click();
				drop_item_tag=1;
				return;
			}
			else	//此时情况一定是可以合成半身像了，而背包中有生姜/酥糖
			{
				//丢弃生姜/酥糖
				var chosen=0;
				for (var i=1; i<=6; i++)
					if (pkname[i]=="地雷酥糖" || pkname[i]=="甜生姜")
					{
						chosen=i; break;
					}
				$('input[value=swapitm'+(chosen+"")+']').click();
				drop_item_tag=1;
				return;
			}
		}	
	}
	//现在可以保证不处于与外界交互状态，判断是否需要执行各项内务操作
	if (Running && hp+65<=mhp)
	{
		//用面包补血
		var where=find_item_name("面包"); 
		if (where>0) { use_item(where); return; }
		//用酱包补血
		var where=find_item_name("更改菜谱后的不甜酱包"); 
		if (where>0) { use_item(where); return; }
		//用KEY补给补血
		var where=find_item_name("秋生大叔的面包"); 
		if (where>0) { use_item(where); return; }
		//既没有酱包也没有面包……
		where=find_item_type("生命恢复");
		if (where>0) { use_item(where); return; }
		where=find_item_type("命体恢复");
		if (where>0) { use_item(where); return; }
	}
	if (Running && sp<=50)
	{
		//用矿泉水补体力
		var where=find_item_name("矿泉水"); 
		if (where>0) { use_item(where); return; }
		//用酱包补体力
		var where=find_item_name("更改菜谱后的不甜酱包"); 
		if (where>0) { use_item(where); return; }
		//用KEY补给补体力
		var where=find_item_name("秋生大叔的面包"); 
		if (where>0) { use_item(where); return; }
		//既没有酱包也没有水……
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
	if (Running && kill_target=="")	//非追杀模式下才会执行合成操作
	{
		//检查能否合成酱包中间产物
		if (find_item_name("地雷酥糖")>0 && find_item_name("甜生姜")>0)
		{
			if (pkcount==6 && find_item_name("曾经的荣光-橙黄")==0) 
			{
				if (find_item_name("矿泉水")>0)
				{
					//丢掉矿泉水
					abandon_item(find_item_name("矿泉水"));
					return;
				}
				else
				{
					//选择一个半身像做武器
					var maxcnt=0, maxi=0;
					for (var i=1; i<=6; i++)
						if (check_KEY_item(pkname[i]) && pkcnt[i]>maxcnt)
						{
							maxcnt=pkcnt[i]; maxi=i;
						}
					use_item(maxi);
					return;
				}
			}
			var mxs=(1<<(find_item_name("地雷酥糖")-1))+(1<<(find_item_name("甜生姜")-1));
			mix_item(mxs);
			return;
		}
		//检查能否合成酱包
		if (find_item_name("曾经的荣光-橙黄")>0 && find_item_name("面包")>0)
		{
			var mxs=(1<<(find_item_name("曾经的荣光-橙黄")-1))+(1<<(find_item_name("面包")-1));
			mix_item(mxs);
			return;
		}
		//如果有酱包，丢弃其余补给
		if (find_item_name("更改菜谱后的不甜酱包")>0)
		{
			if (drop_if_exist("曾经的荣光-橙黄")) return;
			if (drop_if_exist("地雷酥糖")) return;
			if (drop_if_exist("甜生姜")) return;
			if (drop_if_exist("矿泉水")) return;
			if (drop_if_exist("面包")) return;
		}
		//检查背包中是否有冗余的半身像
		var found=false, which=0;
		for (var i=1; i<=6; i++)
			if (check_KEY_item(pkname[i]))
				for (var j=1; j<=6; j++)
					if (i!=j && check_KEY_item(pkname[j]))
					{
						var x=get_KEY_ID(pkname[i]), y=get_KEY_ID(pkname[j]);
						if ((x&y)==y) { found=true; which=j; break; }
					}
		if (found)
		{
			if (current_place=="冰封墓场") 		//冗余的半身像丢到冰封
				abandon_item(which);
			else  
			{
				back_tag=current_place;
				move_to("冰封墓场");
			}
			return;
		}
		//检查是否有半身像与武器冗余了，注意根据设定，KEY弹中间产物永远不会被作为武器
		if (check_KEY_item(wpnname))
		{
			for (var i=1; i<=6; i++)
				if (pkname[i]==wpnname)
				{
					if (current_place=="冰封墓场") 
						abandon_item(i);
					else  
					{
						back_tag=current_place;
						move_to("冰封墓场");
					}
					return;
				}
		}
		//检查是否可以合成半身像
		var mask=0;
		for (var i=1; i<=6; i++)
			if (check_KEY_item(pkname[i]))
				mask=mask | get_KEY_ID(pkname[i]);
				
		if (check_KEY_item(wpnname)) mask=mask | get_KEY_ID(wpnname);
		
		if ((mask&7)==7 && find_item_name("四季流转的咏叹调")==0 && wpnname!="四季流转的咏叹调")
		{
			//可以合成四季流转的咏叹调
			var mxs=0, cn=0;
			for (var i=1; i<=6; i++)
				if (check_KEY_item(pkname[i]) && get_KEY_ID(pkname[i])<=4)
				{
					mxs=mxs|(1<<(i-1));
					cn++;
				}
			if (cn==2)	//有一件半身像（或生姜/酥糖）被作为武器了，先把它卸下，下次时钟周期再合成
			{
				var tol=0;	//选择一件不参与合成的半身像
				for (var i=1; i<=6; i++)
					if (check_KEY_item(pkname[i]) && get_KEY_ID(pkname[i])>=8)
						tol=i;
				if (tol==0)	//那件物品是生姜/酥糖，或那个物品槽是空的，先把它丢掉
				{
					for (var i=1; i<=6; i++)
						if (pkname[i]=="甜生姜" || pkname[i]=="地雷酥糖")
							tol=i;
					
					if (tol!=0)		//找到了物品，丢掉
						abandon_item(tol);
					else  unload_wpn();	//物品槽是空的，卸下武器即可
				}
				else  use_item(tol);
				return;
			}
			mix_item(mxs);
			return;
		}
		if ((mask&56)==56 && find_item_name("旁观轮回的覆唱诗")==0 && wpnname!="旁观轮回的覆唱诗")
		{
			//可以合成旁观轮回的覆唱诗
			var mxs=0, cn=0;
			for (var i=1; i<=6; i++)
				if (check_KEY_item(pkname[i]) && get_KEY_ID(pkname[i])>=8)
				{
					mxs=mxs|(1<<(i-1));
					cn++;
				}
			if (cn==2)	//有一件半身像（或生姜/酥糖）被作为武器了，先把它卸下，下次时钟周期再合成
			{
				var tol=0;	//选择一件不参与合成的半身像
				for (var i=1; i<=6; i++)
					if (check_KEY_item(pkname[i]) && get_KEY_ID(pkname[i])<=4)
						tol=i;
				if (tol==0)	//那件物品是生姜/酥糖，或那个物品槽是空的，先把它丢掉
				{
					for (var i=1; i<=6; i++)
						if (pkname[i]=="甜生姜" || pkname[i]=="地雷酥糖")
							tol=i;
					
					if (tol!=0)		//找到了物品，丢掉
						abandon_item(tol);
					else  unload_wpn();	//物品槽是空的，卸下武器即可
				}
				else  use_item(tol);
				return;
			}
			mix_item(mxs);
			return;
		}
		//判断是否可以合成最终产物
		if (find_item_name("四季流转的咏叹调")>0 && find_item_name("旁观轮回的覆唱诗")>0)
		{
			var mxs=0;
			for (var i=1; i<=6; i++)
				if (pkname[i]=="四季流转的咏叹调" || pkname[i]=="旁观轮回的覆唱诗")
					mxs=mxs | (1<<(i-1));
			mix_item(mxs);
			to_halt_tag=1;	//合成完成后自动移动到冰封墓场，停止脚本
			return;
		}
		if (pkcount<5 && wpnname!="拳头" && wpnname!="【KEY系催泪弹】")
		{
			//包裹中即使卸下武器仍有空位，把作为武器的半身像卸下
			unload_wpn();
			return;
		}
		if (pkcount==6 && wpnname=="拳头")
		{
			//包裹满了，选择耐久最高的半身像作为武器
			var maxcnt=0, maxi=0;
			for (var i=1; i<=6; i++)
				if (check_KEY_item(pkname[i]) && pkcnt[i]>maxcnt)
				{
					maxcnt=pkcnt[i]; maxi=i;
				}
			use_item(maxi);
			return;
		}
		//判断当前作为武器的半身像耐久是否最高，如果不是，选择耐久最高的半身像作为武器
		if (check_KEY_item(wpnname))
		{
			var maxcnt=wpncnt, maxi=0;
			for (var i=1; i<=6; i++)
				if (check_KEY_item(pkname[i]) && pkcnt[i]>maxcnt)
				{
					maxcnt=pkcnt[i]; maxi=i;
				}
			if (maxi!=0) { use_item(maxi); return; }
		}
	}
	//内务处理完成，现在可以进行探索了，探索的结果将在下一次时钟周期被处理
	if (kill_target!="")	//追杀模式，获取最新的目标信息
	{
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
			if (iname==kill_target)
			{
				here=iwhere; tim=iwhen;
				break;
			}
		}
		if (here!="")
			hint.innerHTML="<font size=3><span class=\"evergreen\">hint: "+here+" ("+tim+")</span></font>";
		if (Running && here!="" && AutoTrace && current_place!=here)
		{
			//自动追踪模式，前往其所在地点
			if (move_to(here)) return;
		}
	}
	if (Running && to_halt_tag>0) { move_to("冰封墓场"); to_halt_tag=0; Running=0; return; }	//处理终止标记
	if (Running && back_tag!="") { move_to(back_tag); back_tag=""; return; }	//根据back_tag返回
	if (Running && kill_target=="" && AutoTrace && current_place!="清水池") { move_to("清水池"); return; }	
	if (Running) $('input[name=search]').click(); 	//探索
},250); }

function startRun()
{
	Running=1;
}

function stopRun()
{
	Running=0;
}

function setKill()
{
	kill_target=document.getElementById("gm_mytext").value;
	here=""; hint.innerHTML="<font size=3><span class=\"evergreen\">hint: </span></font>";;
}

var WatchCnt=0;

var st;

var Awhen=new Array(600), Awho=new Array(600), Acnt;
var Bwhen=new Array(60), Bwhere=new Array(60), Bcnt;
var Cwho=new Array(60), Cwhere=new Array(60), Cwhen=new Array(60), all;
var killed=new Array(60);

function processLineA(s)
{
	var tm="";
	var z1=s.indexOf("时"); tm=tm+s.slice(0,z1)+":";
	var z2=s.indexOf("分"); tm=tm+s.slice(z1+1,z2)+":";
	var z3=s.indexOf("秒"); tm=tm+s.slice(z2+1,z3);
	z1=s.indexOf("<span class=\"yellow\">");
	if (z1==-1) return;
	z1=s.indexOf("<span class=\"yellow\">",z1+1);
	if (z1==-1) return;
	z1=s.indexOf(">",z1);
	z2=s.indexOf("<",z1);
	if (z2==-1) return;
	var iname=s.slice(z1+1,z2);
	z1=s.indexOf("<span class=\"red\">",z1);
	if (z1==-1) return;
	z1=s.indexOf("<span class=\"yellow\">【",z1);
	if (z1==-1) return;
	Acnt++; Awhen[Acnt]=tm; Awho[Acnt]=iname;
}

function processLineB(s)
{
	if (s.slice(0,18)!="<span class=\"red\">") return;
	if (s.slice(-7)!="</span>") return;
	var tm=s.slice(-16,-8);
	var z1=s.indexOf("【"), z2=s.indexOf("】");
	if (z1==-1 || z2==-1) return;
	var place=s.slice(z1+1,z2);
	Bcnt++; Bwhen[Bcnt]=tm; Bwhere[Bcnt]=place;
}

var pidd;
var wtpro;

function startWatch() { pidd=setInterval(function()
{
	WatchCnt++;
	//创建提示
	if (WatchCnt==1)
	{
		wtpro.innerHTML="<font size=3><span class=\"evergreen\">提示: 进行状况监视工具正在运行中……</span></font>";
	}
	if (WatchCnt%2==1)
	{
		//监视消息页面
		st=document.getElementById("newsinfo").innerHTML;	//获取消息列表
		var pl=st.indexOf("</B></span><br>");
		pl=st.indexOf("<br>",pl)+4; Acnt=0; var pcn=0;
		while (pl<st.length && pcn<=500)
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
	else
	{
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
		
		var fn="";
		for (var i=1; i<=all; i++)
			if (!killed[i])
				fn=fn+Cwho[i]+">"+Cwhere[i]+">"+Cwhen[i]+">";
		
		GM_setValue(host_name+"info",fn);
		$('button[onclick*=all]').click();
	}
},2000); }

function stopWatch()
{
	clearInterval(pidd);
	wtpro.innerHTML="<font size=3><span class=\"evergreen\">提示: 进行状况监视工具不在运行</span></font>";
	WatchCnt=0;
}

function SetAutoTrace()
{
	if (document.getElementById("gm_chkbox").checked)
		AutoTrace=true;
	else  AutoTrace=false;
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
	//主程序，创建按钮。
	var btn = document.getElementsByClassName("title")[0];
	var prompt = document.createElement("div");
	prompt.innerHTML="<table id=\"gm_table\" border=\"0\" align=\"center\"></table>";
	btn.appendChild(prompt);
	var x=document.getElementById('gm_table').insertRow(0);
	var prompt=x.insertCell(0);
	prompt.innerHTML="<input type='button' value='开始'/>";
	prompt.addEventListener('click',startWatch,false);
	var prompt=x.insertCell(1);
	prompt.innerHTML="<input type='button' value='暂停'/>";
	prompt.addEventListener('click',stopWatch,false);
	
	var btn = document.getElementsByClassName("title")[0];
	wtpro = document.createElement("div");
	wtpro.innerHTML="<font size=3><span class=\"evergreen\">提示: 进行状况监视工具不在运行</span></font>";
	btn.appendChild(wtpro);
}
else
{
	//在游戏中运行
	//主程序，创建按钮。
	var btn = document.getElementsByClassName("title")[0];
	var prompt = document.createElement("div");
	prompt.innerHTML="<table id=\"gm_table\" border=\"0\" align=\"center\"></table>";
	btn.appendChild(prompt);
	var x=document.getElementById('gm_table').insertRow(0);
	var prompt=x.insertCell(0);
	prompt.innerHTML="<input type='button' value='开始'/>";
	prompt.addEventListener('click',startRun,false);
	var prompt=x.insertCell(1);
	prompt.innerHTML="<input type='button' value='暂停'/>";
	prompt.addEventListener('click',stopRun,false);
	var prompt=x.insertCell(2);
	prompt.innerHTML="<input id='gm_chkbox' type=\"checkbox\">";
	prompt.addEventListener('click',SetAutoTrace,false);
	var prompt=x.insertCell(3);
	prompt.innerHTML="<font size=2><span class=\"evergreen\">锁定目标</span></font>";
	
	var btn = document.getElementsByClassName("title")[0];
	var prompt = document.createElement("div");
	prompt.innerHTML="<input type='text' id='gm_mytext' value=''/>";
	prompt.addEventListener('change',setKill,false);
	btn.appendChild(prompt);
	
	var btn = document.getElementsByClassName("title")[0];
	hint = document.createElement("div");
	hint.innerHTML="<font size=3><span class=\"evergreen\">hint: </span></font>";
	btn.appendChild(hint);
	
	Run();
}
