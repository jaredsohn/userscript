// ==UserScript==
// @name          五百米绿色生活专用微博发送器
// @namespace     http://www.500mi.com
// @description   使用五百米绿色生活appkey来发送微博
// @include       *
// ==/UserScript==
setTimeout("load()",2000) 
load = function() {
	load.getScript();
	load.tryReady(0); //用来等待jQuery类库加载
}
load.getScript = function() {
	var script = document.createElement('script')
	script.setAttribute("type","text/javascript")
	script.setAttribute("src", "http://code.jquery.com/jquery-1.7.2.min.js")
	if (typeof script!="undefined")
	document.getElementsByTagName("head")[0].appendChild(script)
}
load.tryReady = function(time_elapsed) {
	//持续查询jQuery是否加载完毕
	if (typeof $ == "undefined") { // 如果没有加载jQuery...
		if (time_elapsed <= 5000) {
			setTimeout("load.tryReady(" + (time_elapsed + 200) + ")", 200); //设置200ms后继续尝试
		} else {
			alert("Failed to loading jQuery because of timeout.")
		}
	} else {
		// jQuery加载完毕后执行的代码
		$.getScript("http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1729250720", function(){
			WB2.anyWhere(function(W){
				W.widget.publish({
					toolbar:"face,topic,image",
					button_type:"red",
					button_size:"big",
					default_text:"#五百米绿色生活#",
					button_text:"五百米微博特供",
					id: "wb_publisher"
				});
			});
		});
   	}
 }