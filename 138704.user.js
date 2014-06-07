	
	1 下载 firefox
	2 安装油猴子	
	https://addons.mozilla.org/zh-CN/firefox/addon/greasemonkey/?src=ss
	
	 点击添加到firefox,按提示重启firefox
	 
	 3 打开任何一个败毒搜索页
	  从菜单  工具 －》greasemonkey  选择 new user scripte
	  
	  
	  按提示选择一个编辑器
	  
	  输入下面的代码
		// ==UserScript==
		// @name        baidu
		// @namespace   baidu
		// @description baidu
		// @include     http://www.baidu.com
		// @version     1
		// ==/UserScript==
	
		var allTable = document.getElementsByTagName('table')[0];
			
		//console.log(  allTable);
		 
			var allLinks = allTable.getElementsByTagName('a');  
			//console.log(  allLinks	);
			for(var j=0;j<allLinks.length;j++){  
		   console.log(allLinks[j].innerHTML);		
				allLinks[j].click();
				if(allLinks[j].className=='m' && allLinks[j].firstChild.nodeValue=='推广'){  
					var removeTable = allTable[i];  
					removeTable.style.display='none';  
					removeTable.nextSibling.style.display='none';   //隐藏<br>  
				}  
			}  
			  
 