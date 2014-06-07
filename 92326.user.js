// ==UserScript==
// @name           HitHuntHeal
// @namespace      http://hhh/
// @description    Hitlist hunt heal and level combined
// @include http://*monstergamesinc.com/*
// @include http://*facebook.com/mobwars/*
// @include http://*hithuntheal.com/*
// @include http://hhh.co.cc/*
// @include http://www.facebook.com/home.php*
// @include http://99.198.122.90*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==


/*这是一个可以真正改变网页背景颜色的js脚本,这个脚本只改变网页中背景为白色(你也可以定义其他颜色)的部分,
 * 它只将白色背景改成你设定的颜色,不会影响网页的整体结构.由于经常上网,网页白色的背景实在太刺眼了,网上早的方法
 * 会改变整个网页的背景使得网页面目全非,在火狐网上找到一个叫"油猴"的插件可以调用脚本,在此启发下写了这个脚本,
 * Bcolor和color得初始值可以达到将指定的背景颜色改成指定的颜色的目的,
 * 由于初学JavaScript这个脚本还有些问题,我在网上找到的代码只能获取rgb格式的背景颜色,所以设定被改变的
 * 颜色时需要用rgb格式表示,另外只能改变一种颜色,有高手的话请完善一下.
 * 默认的是把白色背景改成网上那个所谓的眼科专家说的对眼睛最好的颜色.
*/

var Lcolor="";
var x=0;
var Bcolor="rgb(255, 255, 255)"   //被改变的颜色,需要rgb格式显示
var color="#CFE8CC"  //#C7EDCC,#EEEEEE需要改变的颜色,设定此项可以改变背景颜色

//获取body的背景颜色.
Lcolor=document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-Color");
//alert(Lcolor);
if (Lcolor ==Bcolor || Lcolor=="transparent") 
{
	document.body.style.backgroundColor=color;
}

var alltags = document.getElementsByTagName("*");


for (x in alltags) {

	Lcolor=document.defaultView.getComputedStyle(alltags[x], "").getPropertyValue("background-Color");
	
	if (Lcolor ==Bcolor) 
	  {
		alltags[x].style.backgroundColor = color;
		
	}
}