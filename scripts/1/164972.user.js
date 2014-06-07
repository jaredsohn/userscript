// ==UserScript==
// @name          mixiチェック for SoundCloud
// @namespace     http://www.chipple.net/tools/gmscripts
// @include       https://soundcloud.com/*
// @version       1.0
// ==/UserScript==

{
	function onClick(event) {
		if (!event) return;
		var target = event.target;
		if (!target) return;
		while (target && target.tagName != "ARTICLE") target = target.parentNode;
		if (!target) return;
		var inputs = target.getElementsByTagName("input");
		if (inputs.length == 0) return;
		var input = inputs[0];
		if (input.className != "shareContent__linkField") return;
		var url = input.value;
		// 
		// ここにあるキーはこのユーザスクリプト専用に登録したものです。
		// 他の目的でキーが必要の場合は、 http://developer.mixi.co.jp/ で登録してください。
		//
		// The key embedded here is registered for this UserScript only.
		// If you need one for another purpose, make your own at http://developer.mixi.co.jp/
		//
		var u = 'http://mixi.jp/share.pl?u='+encodeURIComponent(url)+'&k=3417c7c8b627e93e4bdeca5'+/*DO NOT USE THIS KEY ELSEWHERE*/'2b7d85828812ca3e8';
		window.open(u,'share','width=632,height=456,location=yes,resizable=yes,toolbar=no,menubar=no,scrollbars=no,status=no');
	}
	
	function getShareDiv() {
		var body_children = document.getElementsByTagName("body")[0].childNodes;
		if (body_children.length < 1) return;
		var share_div = body_children[body_children.length-1];
		if (share_div.tagName != "DIV") return;
		var articles = share_div.getElementsByTagName("article");
		if (articles.length == 0) return;
		var article = articles[0];
		if (article.className != "shareContent") return;
		article.className += " _has_mixi";  // To prevent adding 2ce
		return share_div;
	}
	
	function addMixi(share_div) {
		var uls = share_div.getElementsByTagName("ul");
		if (uls.length == 0) return;
		var ul = uls[0];
		var lis = ul.getElementsByTagName("li");
		if (lis.length < 2) return;
		var last_share_button_li = lis[lis.length-1];
		
		var new_li = document.createElement("li");
		new_li.className = "shareContent__shareButton";
		var new_div = document.createElement("div");
		var new_a = document.createElement("a");
		new_a.className = "shareButtonLink sc-social-icon-32x32 sc-social-icon-mixi-32x32 sc-ir";
		//new_a.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAKXRFWHRDcmVhdGlvbiBUaW1lAInOIDMxIDcgMjAxMiAyMjo0ODozOCArMDkwMLoFRbMAAAAHdElNRQfcCAENBRxASmEJAAAACXBIWXMAAArwAAAK8AFCrDSYAAAABGdBTUEAALGPC/xhBQAAAVlQTFRFAPkA7e3tzMzM0tLS1NTUzs7O7u7u6Ojo5+fn5eLd5+Xk6urqz8/P6Ofk17t60a9f4dW76Ojn1dXV6+vr6+rq4NKw1LNozKNCy584yJYkxI4UxpQg6ujk19fX6uXb0q9cxZEZxZAUxZAW0rBh6+ji2NjY7u3o0q9ZxJAUxpMcxZEXxpEa2r+B7u3t2tra5di5xZAX4saE1KxO3btr27hn1bBW4cJ9yJcm6uTV29vb3cKGxY4U6tKc17JZ4cR+4MF42rZk586T4c6g3t7e3d3d3cKD6tKd2LNe4MJ74ODg6Niw6tSf6tSgyZkn8eC2yZop4sWD5MiH4suU4eHh9/PqzKI64MF65MiJ7tut7t2w7dqq8eG5zKA19OrR4uLi////7d25yJYh27tu5OTk7d21y5wv2LVi//rx+fPi4caG0aZFxpQdyZos1K1S6tep///5/Pfr/Pbo//nu+VA5VwAAAAF0Uk5TAEDm2GYAAADySURBVHjaLc9XV8JAFATgG0E3GsSy1th2oigYjbEiRkEwiIhgwV5YFXtD/f8PJsj3MOeeeZpLpLlMa2AuJ9Kkr/b981s/OFlevry+xd8/Pr9qUlpUlfLhUYfPfnqWVarI2zvDELYuBHDvFeXjE5yenV/kLq+uYd5UKL/roLBXLJT2Dw6BozK5WQfbOSR3sJkGsnlKrDlY30Ay5RfRzBZZczbmF7C4hOUVxFcTFJmcisamYZoQMczMWjSijI6J/x3G+IQSoW7Oe3r7+gcG9aHwMOdBCtW/Yu3hjs4uxliImE9V1dY2L1SmESlNgWBDoLmF/gAg+y6Ah1sgSwAAAABJRU5ErkJggg%3D%3D)";  // 16x16
		new_a.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKXRFWHRDcmVhdGlvbiBUaW1lAJP6IDE0IDQgMjAxMyAyMTo0NToxMSArMDkwMPwTQhMAAAAHdElNRQfdBA4NBTVUN9eXAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAA0NJREFUeNrVVk1ME0EUntlu6Q9t6Q+Uyp+0BUSRgEQJYjAmijGe9GLixV5MDAcTE24aE+4e1Tt48UIwxmCi4eABTIRYJUV+FMNPgZYChXbpf3fHtyytdVu6jYEDL9N0Z+bN97158+a9wYQQl8vldDrRYUtbW1tzczMtoDscjkMnGBgY4P/6+/vJkQmAU4duuEiOPwFdiFI8tBH0fg/75+MhL5sIY0ouVxlUequ2vEVttGNM/ScBnFIksLQ+Pch4vxHCIYxxaiqys8h4nL7ZIWXJSUvTHW15a8ZkYQSEY9dnh3xzb+ELuqL1ez3+Fw0sLX5+ZrReq2i5R1F0oQQcl3RPvAysfkFEwMknBBH/wgiXiFRf6Ml2Vw73gWfWJl/x6EgafU+FV9pxj23Of4C1EgSgEfR83VoYEboKTSWtNACI2nRKazlH0SoBQVlSqztxvkht5jeQ4lmfGWTjjJSLCOeZep22u7azN7Q5V6SxqA1WjGWJWBA8DqeqKWsSjmJ5/EVgbVzQZ5MR//Kouf5mvh0wPleM8WSO6GsuBdcmfry7P/uxF1xsv9KXiPinhx9MD/dEthfMjbcyfIV21yclXMR4J0XxBuG/Mf+ecMl4yBfanCFsfG1ygEtGuWQ46HEqis0ow+0xZlWCIMq4xSM7SzhlINDA/gibSE3C5aAyDeLYuAQBRFvWsbPon9ggeUJLJi+WIJAVaXKsKyBYBVHqqiUIVAZ7oWDZQpDW0ipBoK/qyDQY4gQyXWo5iu16IoHl9Gwi7A9v/UwfMuxeX3VRBCi+B7BHfXXntntUuJ/L4895aKGDkW/mTaa7tlfGoO27kCBz422KVkrsAJJaRYtDqa36632MUvjiw8BC48MLFZedKbV3Z+fUHLkIIsHW9VhtrM/KKwe5nih0lTXtDxGWZU/mIAAraIXedvkpZGBaqScIIZIHnKiMdbauJ7RCl7Mk5E7XmBe6rO6GyXp11+difFPRoJuNBfmyg3CMWUkrltqvW87eldGKgyyQKJmUTA5JFFp6JOz/9ftTH3yoTQ0AXWxqyI8gXZOzaplMV9lusnVryk7nr8aFEogEqnxtx6PC9Y//u4iCN/D+K/WwBWABHB/18/0P81KotGaBTdIAAAAASUVORK5CYII=)";  // 32x32
		new_a.addEventListener("click", onClick);
		new_a.style.cursor = "pointer";
		new_div.appendChild(new_a);
		new_li.appendChild(new_div);
		share_div.style.width = 
			parseInt(share_div.style.width)
			+ last_share_button_li.offsetWidth 
			+ 7  // rightMargin
			+ "px";
		ul.insertBefore(new_li, last_share_button_li);
	}
	
	function onTick() {
		var share_div = getShareDiv();
		if (!share_div) return;
		addMixi(share_div);
	}
	
	setInterval(onTick, 1000);
}