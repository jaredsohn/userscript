//--------------Information----------------------------------
// 2012-09-20
// Copyleft (c) 2013,网络孤独行客
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name        tieba_refresh
// @namespace   http://www.winbaike.com
// @description An auto-refresh userscript for Baidu tieba.
// @include     http://tieba.baidu.com/f?*
// @updateURL      https://userscripts.org/scripts/source/147324.meta.js
// @downloadURL    https://userscripts.org/scripts/source/147324.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant		unsafeWindow
// @version     0.03 Beta
// ==/UserScript==

(function(){

	GM_setValue("frequency",GM_getValue("frequency",60000));
	GM_setValue("run",GM_getValue("run",1));
	
	function frequency(){
		var freq="请输入的频率(单位：秒)\n输入字母'q'停止自动刷新"
		the_frequency=prompt(freq,GM_getValue("frequency")/1000);
		if(the_frequency==null||the_frequency==0)
			GM_setValue("frequency",GM_getValue("frequency"));
		else if(the_frequency=='q'){
			GM_setValue("run",0);
			window.location.reload();
		}
		else{
			GM_setValue("frequency",the_frequency*1000);
			GM_setValue("run",1);
			window.location.reload();
		}
	}
	
	(function (){
		var newLi = document.createElement('li'); 
		newLi.className = "j_tbnav_tab";
		newLi.innerHTML='<p><a href="javascript:void(0)" id="frequency">刷新</a></p>'		
		document.querySelector('.nav_list.j_nav_list').appendChild(newLi);
		var obfrequency=document.querySelector("#frequency")
		obfrequency.addEventListener("click",frequency);	
		GM_getValue("run") && window.setInterval(function(){unsafeWindow.Path.refresh()},GM_getValue("frequency",60000));
	})()
})();