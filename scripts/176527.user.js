// ==UserScript==
// @name           鼠标拖拽脚本
// @description    鼠标拖拽的脚本，嗯，都是后台打开的
// @version        1.1
// @author         H57
// @namespace      http://www.h57.pw/ 
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function(event) {
	var self = arguments.callee;
	if (!event) {
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		return;
	}
	switch (event.type) {
	case "dragstart":
		{
			self.startPoint = [event.screenX, event.screenY];
			self.sourceNode = event.target;
			event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
			break;
		}
	case "dragover":
		{
			self.startPoint && (Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true);
			break;
		}
	case "drop":
		{
			if (self.startPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
				event.preventDefault();
				event.stopPropagation();
				var [subX, subY] = [event.screenX - self.startPoint[0], event.screenY - self.startPoint[1]];
				var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
				var direction;
				if (distX > distY) direction = subX < 0 ? "L" : "R";
				else direction = subY < 0 ? "U" : "D";
				if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
					if (direction == "U") {
						//新标签打开图片链接(前台)
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "D") {
						//新标签打开图片链接(后台)
						gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "L") {
						//复制图片地址
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
						return;
					}
					if (direction == "R") {
						//下载图片
						saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, null, null, document);
						return;
					}
				} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
					if (direction == "U") {
						//新标签打开链接(前台)
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "D") {
						//新标签打开链接(后台)
						gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "L") {
						//复制链接文字
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
						return;
					}
					if (direction == "R") {
						//下载链接
						saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, null, null, document);
						return;
					}
				} else {
					if (direction == "U") {
						//搜索框搜索选中文字(前台)
						gBrowser.selectedTab = gBrowser.addTab();
						BrowserSearch.loadSearch(event.dataTransfer.getData("text/unicode"), false);
						return;
					}
					if (direction == "D") {
						//Google搜索选中文字(后台)
						//gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
						//return;
						//按URL打开文本
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode"));
						return;
					}
					if (direction == "L") {

						//Google翻译文本
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						div.style.cssText = "position:absolute;z-index:1000;border-left:solid 0.5px #0000AA;border-top:solid 1px #0000AA;border-right:solid 2.5px #0000AA;border-bottom:solid 2px #0000AA;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: black;left:" + +(event.clientX + content.scrollX + 10) + 'px;top:' + +(event.clientY + content.scrollY + 10) + "px";
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.cn/translate_a/t?client=t&hl=zh-CN&sl=auto&tl=zh-CN&text=" + event.dataTransfer.getData("text/unicode"), 0);
						xmlhttp.send();
						div.textContent = eval("(" + xmlhttp.responseText + ")")[0][0][0];
						content.addEventListener("click", function() {
							content.removeEventListener("click", arguments.callee, false);
							div.parentNode.removeChild(div);
						}, false);
						return;
					
					}
					if (direction == "R") {
						//复制文本
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/unicode"));
						return;
					}
				}
				self.startPoint = 0;
			}
		}
	}
})()