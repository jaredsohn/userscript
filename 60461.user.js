// ==UserScript==
// @name		UserScript.org Include/Exclude Data
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-24
// @namespace	usoIncludeExcludeData
// @include		http://userscripts.org/scripts/show/*
// @version		0.1.1
// @homepageURL http://userscripts.org/scripts/show/60461
// @description	Adds include/exclude data for userscripts to a userscript's about page on userscripts.org.
// ==/UserScript==

(function(){
	var usoIncludeExcludeData={
		init:function(){
			var install=document.evaluate("//div[@id='install_script']/a[contains(@class,'userjs')]",document,null,9,null).singleNodeValue;
			if(!install) return;

			var url=install.href.replace(/user.js\s*$/i,'meta.js');

			var req=new XMLHttpRequest();
			req.open('GET',url,true);
			req.onreadystatechange=function (responseDetails) {
				if(req.readyState != 4 || req.status != 200) return;
		
				var res=req.responseText,temp,tempUL,tempStr;
				var includes=res.match(/^\s*\/\/\s*@include.*$/gmi);
				var excludes=res.match(/^\s*\/\/\s*@exclude.*$/gmi);

				var side=document.createElement('div');

				if (includes) {
					temp = document.createElement('h6');
					temp.innerHTML = 'Includes';
					side.appendChild(temp);
					tempUL = document.createElement('ul');
					side.appendChild(tempUL);
					for (var i = 0; i < includes.length; i++) {
						temp = document.createElement('li');
						tempStr=includes[i].replace(/^\s*\/\/\s*@include\s*/i, '');
						tempStr=tempStr.replace(/^\s*/i,'').replace(/\s*$/i,'');
						if(!tempStr) continue;
						temp.innerHTML=tempStr;
						tempUL.appendChild(temp);
					}
				}

				if (excludes) {
					temp = document.createElement('h6');
					temp.innerHTML = 'Excludes';
					side.appendChild(temp);
					tempUL = document.createElement('ul');
					side.appendChild(tempUL);
					for (var i = 0; i < excludes.length; i++) {
						temp = document.createElement('li');
						tempStr=excludes[i].replace(/^\s*\/\/\s*@exclude\s*/i, '');
						tempStr=tempStr.replace(/^\s*/i,'').replace(/\s*$/i,'');
						if(!tempStr) continue;
						temp.innerHTML=tempStr;
						tempUL.appendChild(temp);
					}
				}

				temp=document.getElementById('script_sidebar');
				temp.insertBefore(side,temp.firstChild);

				return;
			}
			req.send(null);

		}
	}
	usoIncludeExcludeData.init();
})();