// ==UserScript==
// @author      Shyangs
// @name        civitas daily work report
// @description civitas 每日工作後，再次點擊可查看工作紀錄
// @namespace   http://userscripts.org/users/60668#civitas.dwr
// @include     http://civitas.soobb.com/Estates/*
// @version     0.1
// @grant       GM_getValue
// @grant       GM_setValue
// @updateURL   https://userscripts.org/scripts/source/431767.meta.js
// @downloadURL https://userscripts.org/scripts/source/431767.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     GPLv3; http://opensource.org/licenses/gpl-3.0.html
// ==/UserScript==
(function(){
	var $ = unsafeWindow.$,
		$EstateWork = $('.EstateWork'),
		$EstateDetails = $('.EstateDetails'),
		$cache;

	if ( 0 !== $EstateWork.length ){
		GM_setValue('EstateWork', $EstateWork[0].outerHTML);
	}


	$cache = $EstateDetails.find('.Name:contains("工作")').parents('.Tile');
	if( $cache.is(':contains("今天已工作过了")') ||
		$cache.is(':contains("今天已工作過了")') ){
		$cache[0].addEventListener('click', function(){
			var setting = GM_getValue('EstateWork');
			if( setting === undefined ){
				alert('無紀錄！');
			}else{
				$EstateDetails.replaceWith(setting);
			}
		});
	}
})();