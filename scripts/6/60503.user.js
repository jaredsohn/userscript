// ==UserScript==
// @name		UserScript.org Display Match Pattern Meta Data
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-24
// @namespace	usoMatchesData
// @include		http://userscripts.org/scripts/show/*
// @match		http://userscripts.org/scripts/show/*
// @version		0.1
// @description	Adds match patterns data for userscripts to a userscript's about page on userscripts.org.
// ==/UserScript==

(function(){
	var usoMatchesData={
		init:function(){
			var install=document.evaluate("//div[@id='install_script']/a[contains(@class,'userjs')]",document,null,9,null).singleNodeValue;
			if(!install) return;

			var url=install.href.replace(/user.js\s*$/i,'meta.js');

			var req=new XMLHttpRequest();
			req.open('GET',url,true);
			req.onreadystatechange=function (responseDetails) {
				if(req.readyState != 4 || req.status != 200) return;
		
				var res=req.responseText,temp,tempUL,tempStr;
				var includes=res.match(/^\s*\/\/\s*@match.*$/gmi);

				var side=document.createElement('div');

				if (includes) {
					temp = document.createElement('h6');
					temp.innerHTML = 'Match Patterns';
					side.appendChild(temp);
					tempUL = document.createElement('ul');
					side.appendChild(tempUL);
					for (var i = 0; i < includes.length; i++) {
						temp = document.createElement('li');
						tempStr=includes[i].replace(/^\s*\/\/\s*@match\s*/i, '');
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
	usoMatchesData.init();
})();