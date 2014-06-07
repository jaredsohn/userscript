// ==UserScript==
// @name         Green Background
// @author       阿尔帝梅斯
// @namespace    http://tieba.baidu.com/f?kw=firefox
// @description  Eye Care
// @version	 	 1.0
// @include      *
// @require      http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==
/*这是一个可以真正改变网页背景颜色的js脚本,这个脚本只改变网页中背景为白色(你也可以定义其他颜色)的部分,
 * 它只将白色背景改成你设定的颜色,不会影响网页的整体结构.由于经常上网,网页白色的背景实在太刺眼了,网上早的方法
 * 会改变整个网页的背景使得网页面目全非,在火狐网上找到一个叫"油猴"的插件可以调用脚本,在此启发下写了这个脚本,
 * Bcolor和color得初始值可以达到将指定的背景颜色改成指定的颜色的目的,
 * 由于初学JavaScript这个脚本还有些问题,我在网上找到的代码只能获取rgb格式的背景颜色,所以设定被改变的
 * 颜色时需要用rgb格式表示,另外只能改变一种颜色,有高手的话请完善一下.
 * 默认的是把白色背景改成网上那个所谓的眼科专家说的对眼睛最好的颜色.
*/

var Gr1=240;  //RGB中的R值...当网页的背景颜色的rgb值分别大于Gr1,Gg1,Gb1时此脚本将把颜色改成目标颜色color
var Gg1=240;  //RGB中的G值
var Gb1=240;  //RGB中的B值
var color="#C7EDCC"  //改变后的背景颜色,默认值为网上那个所谓的眼科专家说的对眼睛最好的颜色

//**********以下代码用户无需修改***********//
var Gr,Gg,Gb;	//全局变量记录当前标签的rgb值,用于比较	
	
	//以下函数用于分解获取的"rgb(255, 255, 255)"格式的rgb 
	function FGrgb(Grgb){

	var kaisi=Grgb.indexOf(",");
	Gr=parseInt(Grgb.slice(4,kaisi));

	var kaisi1=Grgb.indexOf(",",kaisi+1);
	Gg=parseInt(Grgb.slice(kaisi+1,kaisi1));
	
	Gb=parseInt(Grgb.slice(kaisi1+1,Grgb.length-1));
	
	//alert(Gr+"|"+Gb+"|"+Gg);
	}


var Lcolor=""; //用于记录网页中获取的背景颜色
//获取并修改body的背景颜色.
Lcolor=document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-Color");
FGrgb(Lcolor);

if ((Gr>Gr1 && Gg>Gg1 && Gb>Gb1) || Lcolor=="transparent") //transparent表示透明
{
	document.body.style.backgroundColor=color;
}

//获取并修改所有标签的背景颜色
var alltags = document.getElementsByTagName("*");

for (x in alltags) {
	Lcolor = document.defaultView.getComputedStyle(alltags[x], "").getPropertyValue("background-Color");
	FGrgb(Lcolor);
	if (Gr > Gr1 && Gg > Gg1 && Gb > Gb1) {
		alltags[x].style.backgroundColor = color;
	}
}
