// ==UserScript==
// @name Fix long title
// @author Lex1
// @version 1.0.1
// @ujs:documentation http://ruzanow.ru/page.php?5
// @ujs:download http://ruzanow.ru/userjs/fix-long-title.js
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function(){
	var title = document.getElementsByTagName('title')[0]; if(title && title.text.length > 200)title.text = title.text.slice(0, 200);
}, false);