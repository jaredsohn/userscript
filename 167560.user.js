// ==UserScript==
// @name         TuanZhangShuaPiao
// @namespace    http://www.yekezhong.com/
// @version      1.0
// @description  刷票而已
// @match        http://i.hunantv.com/superboy/u/p/15158657*
// @copyright    2013+, 叶科忠
// ==/UserScript==
addInfoBox();
window.setTimeout(function(){document.getElementById("vote-btn-15158657").click();},5000);
window.setTimeout(function(){window.location.reload();},40000);

var cusid_ele = document.getElementsByClassName('videopic_box');
for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];  
    item.parentNode.removeChild(item);
}
//var box=document.getElementById("vplayer-box");
box.parentNode.removeChild(box);

function addInfoBox()
{
	var infoBox = document.createElement("div");
    var mybody=document.getElementsByTagName("body").item(0);
    infoBox.id = "infoBoxContanier";
    mybody.appendChild(infoBox);
    var newHtml = "<div id='infoBox' style='color:green;position: fixed; box-shadow: 0 0 5px 5px #888; \
right:30px; bottom: 15px; background: black; height: 70px; width: 200px; padding:2px; '>\
刷票机器人工作中！<br/>\
<p>Made by <a href='http://wlxh.suse.edu.cn/' target='_blank'>大学生网络技术协会</a><a href='http://www.yekezhong.com/' target='_blank'> 叶科忠</a></p>\
<p><a href='http://taourl.com/nmyu5' title='有点无聊？去淘宝特卖频道逛逛吧！' target='_blank'>【淘宝特卖】</a><a href='http://taourl.com/4v4jn' target='_blank'>【女装频道】</a></p>\
<p style:'float:right'>Ver 1.1 | 2013/5/15</p></div>";
    document.getElementById("infoBoxContanier").innerHTML = newHtml;
    
}