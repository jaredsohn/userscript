// ==UserScript==
// @author      Shyangs
// @name        always Responsive Design View mode
// @description Fix web page content area size
// @namespace   https://greasyfork.org/users/91-shyangs
// @include     chrome://browser/content/browser.xul
// @version     0.1
// @updateURL   https://userscripts.org/scripts/source/486293.meta.js
// @downloadURL https://userscripts.org/scripts/source/486293.user.js
// @icon        http://www.gravatar.com/avatar/b4067537364e89cce0d6f91e193420d0
// @license     MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==
/* 
 適應性設計檢視模式 解析度固定為320x480
 Responsive Design View: Fix web page content area size
 */
(function(){

	let width = 320;  // 寬度
	let height = 480; // 高度

	if( "undefined" === typeof(gBrowser) ) return;
	let Fix_ResponsiveUI_Size = function(){
		let aTab = gBrowser.mCurrentTab;
		if(!ResponsiveUI.ResponsiveUIManager.isActiveForTab(aTab)) ResponsiveUI.toggle();
		aTab.__responsiveUI.setSize(width, height);
	};
	Fix_ResponsiveUI_Size();

	/* 考慮在每一個分頁和新開啟的分頁都固定內容尺寸大小，
		偵聽事件： 選擇/切換另一個分頁
	*/
	let tabs = gBrowser.tabContainer;
	tabs.addEventListener('select', Fix_ResponsiveUI_Size);
})();
