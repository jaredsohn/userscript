// ==UserScript==
// @name       xtweb
// @version    0.1
// @description  xtweb
// @match      http://xt.kingdee.com/xtweb/web/index.jsp
// @match      http://xunt.me/xtweb/web/index.jsp
// @match      http://xunt.im/xtweb/web/index.jsp
// @match      http://xuntong.im/xtweb/web/index.jsp
// @copyright  2013, Janon
// ==/UserScript==

setTimeout(function(){
	var oHead = document.getElementsByTagName('HEAD').item(0); 
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = '/xuntong/resource/xtwebext.js';
	oHead.appendChild(ga);
	ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.text = 'setInterval (function (){try{ jSocial_web_loadGroupList();}catch(e){alert(e);}}, 7133);';
	oHead.appendChild(ga);
}, 1000);