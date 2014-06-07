// ==UserScript==
// @name       youdao Reader Clean
// @namespace  http://userscripts.org/users/178239
// @version    0.2
// @downloadURL http://userscripts.org/scripts/source/178239.user.js
// @updateURL http://userscripts.org/scripts/source/178239.meta.js
// @description  Removes the sidebar, ads, and other clutter from Digg Reader.
// @match      http://reader.youdao.com/
// @copyright  2013+, Chen Tianfei
// @run-at document-start
// ==/UserScript==

(function () {
	var s = document.createElement('style');
	s.innerHTML = 'body{overflow:auto}#contentTitle{display:none!important}#top{display:none!important}#main{top:0!important}#navigation{display:none!important}#contentWrapper{margin-left:0!important;padding-left:0!important}#toggleNavigation.half-toggle{display:none!important}#contentPageBar{display:none!important}.cast-container{background:#fff!important}.cast-clip-date{display:none!important}.cast-clip-container{font-size:1.3em!important;color:#333!important;padding:0 22px 0 250px!important}.cast{border-bottom:1px solid #ddd!important;padding:3px 0!important}#current-read .cast-wrapper{border-color:#ddd!important}.readed .cast-wrapper{border:none!important}.readed .cast-clip{background-color:#fff!important}.readed .cast-clip-container{text-decoration:line-through}.readed .cast-clip h2{font-weight:bold!important;color:#888!important}.cast-content{max-width:100%;font-size:1.5em;line-height:150%}';

	var body = document.querySelector ('body');
	body.appendChild(s);

	var a = document.createElement('a');
	a.href='http://reader.youdao.com/#sub';
	a.innerHTML = '添加订阅';
	setTimeout(function(){document.querySelector('#contentFunctionBar > .fl').appendChild(a);}, 8000);

})();