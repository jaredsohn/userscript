// ==UserScript==
// @id             app.simplenote.com-75cbaa1f-348e-42c7-bbde-efb9607458aa@scriptish
// @name           Simplenote markdown quick preview
// @version        1.0
// @namespace      
// @author         d
// @description    Click markdown result to refresh the result.
// @include        https://app.simplenote.com/
// @run-at         document-end
// ==/UserScript==
(function(){
	function clickPreview(){
		document.getElementById('view_mode_markdown').click();
	};
	document.getElementById("static_content").addEventListener('click',clickPreview,false);
})();
