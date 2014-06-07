// ==UserScript==
// @name           TLFTombCheck
// @namespace      http://userscripts.org/users/fking
// @description    标记TLF主论坛中的过旧帖子（坟）
// @include        http://www1.eastgame.org:8088/*
// @include        http://bbs.eastgame.org/*
// @include        http://pw.eastgame.org:8088/*
// @include        http://bbs.gfan.com/*
// @version        1.0
// ==/UserScript==

var days = 30;

var currentTime = (new Date()).getTime();
var intTimeGaps = 1000*60*60*24*days;
var threads = '/html/body/div//form/table/tbody[starts-with(@id,"normalthread")]/tr/td[@class="author"]/em';
// '/html/body/div[@id="wrap"]/div/div/div[@id="threadlist"]/form/table/tbody[starts-with(@id,"normalthread")]/tr/td[@class="author"]/em';

fnCheckGravePlus(threads, true);

function fnCheckGravePlus(xpath, flag){
	var linkTag;
	linkTag = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var i = 0;
	var len = linkTag.snapshotLength;
	while (i < len){
		if (linkTag.snapshotItem(i)){
			var content, node;
			node = linkTag.snapshotItem(i);
			if (node.innerHTML.toString().split('-').length == 3){
				var postTime = Date.parse(node.innerHTML.toString().replace(/-/g, '/'));
				if (!isNaN(postTime)){
					switch (flag){
						case true:
							if ((currentTime-intTimeGaps) > postTime){
								var statusTime = new Date(currentTime-postTime-39600000);
								node.style.fontStyle = 'italic';
								
								var subjectNode = node.parentNode.parentNode.children[2];
								var titleObjs = document.evaluate("span", subjectNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
								if (titleObjs.snapshotLength > 0)
								{
									var spanObj = titleObjs.snapshotItem(0);
									spanObj.style.fontStyle = "italic";
									if (spanObj.children[0] && (spanObj.children[0].tagName == "A"))
										spanObj.children[0].style.color = "dimgray";
								}
								var tips = document.createElement("span");
								tips.innerHTML = "&nbsp;(" + ((statusTime.getYear()-70)>0?((statusTime.getYear()-70) + '年'):'') + (statusTime.getMonth()>0?(statusTime.getMonth() + '个月'):'') + (statusTime.getDate()>0?(statusTime.getDate() + '天前'):'') + ")";
								tips.style.color = "darkred";
								tips.style.fontStyle = "normal";
								subjectNode.appendChild(tips);

								tips = document.createElement("span");
								tips.innerHTML = "[坟]&nbsp;";
								tips.style.color = "darkred";
								tips.style.fontStyle = "normal";
								subjectNode.insertBefore(tips, titleObjs.snapshotItem(0));
							}
							else {
								node.parentNode.parentNode.style.display = '';
							}
							break;
					}
				}
			}
		}
		i++;
	}
}
