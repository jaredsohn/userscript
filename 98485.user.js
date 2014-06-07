// ==UserScript==
// @name          Disable JavaScript Alert
// @author        
// @namespace     
// @include     http://www.diaryclub.com/diary/modules.php?op=user&sop=diary&set=add
// @description	  
// ==/UserScript==


unsafeWindow.alert = function alert(message) {
	
		console.log(message);
	
}