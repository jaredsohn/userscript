// ==UserScript==
// @id             www.google.com-bb30618e-3ebf-4f87-81e8-071fc08935ca@*
// @name           Ctrl+Enter to submit Add to google bookmarks
// @version        1.0
// @namespace      *
// @author         
// @description    
// @include        https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=*
// @run-at         document-end
// ==/UserScript==

function keyPressEvent(event){
	var kcode = (event.keyCode)?event.keyCode:event.which;
	if(event.ctrlKey) {
	//	if( kcode == 221) dispBmP(); // ']'
	//	if( kcode == 219) gotoBm();  // '['
	//	if( kcode == 66) dispBmP(); // 'b'
	//	if( kcode == 86) gotoBm();  // 'v'	
		if( kcode == 13) document.getElementsByTagName('form')[0].submit();;
	}
} 

document.addEventListener("keydown", keyPressEvent, true);