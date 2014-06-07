// version 1.0
// ==UserScript==
// @name           forgive me tx.
// @namespace      ifree.common
// @author         ifree
// @description    no more desc
// ==/UserScript==

//just for jiaojiao---ifree
(
function(){
	var flashStr="<object data='http://www.qq22.com.cn/qzone/flash.swf?id=1013717' width='100%' height='100%' type='application/x-shockwave-flash'><param name='loop' value='true'><param name='play' value='true'><param name='wmode' value='transparent'><param name='allowFullScreen' value='true'><param name='allownetworking' value='internal'><param name='allowscriptaccess' value='always'></object>";

if(confirm("进入个性版本？在浏览器左上角有一个小三角形,上键为油门,左右键为方向,空格发射子弹"))document.getElementById("contentBody").innerHTML=flashStr; 
var s=document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='http://erkie.github.com/asteroids.min.js';
	}
)();