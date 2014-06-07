// ==UserScript==
// @name           Bitrix Document Editor
// @namespace      Editor
// @include        http://page-flip.com/*
// @exclude        http://page-flip.com/bitrix/*
// @exclude        http://page-flip.com/my_account/admin/*
// ==/UserScript==

//Сonnecting a jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.shmidtsergey.ru/js/jquery.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//connecting textarea script for jQuery
var JQ_TB = document.createElement('script');
JQ_TB.src = 'http://www.shmidtsergey.ru/js/textarea.js';
JQ_TB.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(JQ_TB);

var stag = document.createElement('style');
stag.setAttribute("type", "text/css");
var sclass = '#linktoedit a { color:#FFF; text-decoration:none; } #linktoedit a:hover {text-decoration:underline;} #linktoedit {position:fixed; bottom:0; right:40px; padding:6px; -moz-border-radius:8px 8px 0 0 ; font-size:10px; background:rgba(0,0,0,0.5);display:none; z-index:100000} .e {padding-left:10px;background:url(data:image/gif;base64,R0lGODlhBgAGAIABAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQUM1NzQ2QUU1MEUxMURGOUNGMUFDMjFGNENBQjAwQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQUM1NzQ2QkU1MEUxMURGOUNGMUFDMjFGNENBQjAwQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBQzU3NDY4RTUwRTExREY5Q0YxQUMyMUY0Q0FCMDBBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBQzU3NDY5RTUwRTExREY5Q0YxQUMyMUY0Q0FCMDBBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAAYABgAAAgqMA4eQ6N5YW6oAADs=) no-repeat left center;  } ';
sclass = document.createTextNode(sclass)
stag.appendChild(sclass);
document.getElementsByTagName('head')[0].appendChild(stag);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();

function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}
function strpos (haystack, needle, offset) {
    var i = (haystack+'').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}


function letsJQuery() { 

	var thisurl = location.href;

	furstact = thisurl.split('?');

	thisurl = furstact[0];

	thisurl = str_replace('http://page-flip.com', '', thisurl);
	
	if((thisurl.match('.php') == null)&&(thisurl.match('.html') == null)&&(thisurl.match('.htm') == null)){
		thisurl += "index.php";
	}	

	$('body').append('<div id="linktoedit"><a class="e" href="http://page-flip.com/bitrix/admin/fileman_file_edit.php?path=' + thisurl +'&full_src=Y&site=&lang=ru&&filter=Y&set_filter=Y#tab_edit1">Edit This Page</a> | <a href=http://page-flip.com/bitrix/admin/fileman_file_edit.php?path=%2Fcss%2Fstyles.css&full_src=Y&site=s1&lang=ru&&filter=Y&set_filter=Y">Edit Styles</a> | <a href="/bitrix/admin/">Bitrix Admin</a> | <a href="/my_account/admin/">My Account Admin</a> | <a href="#" onclick="$(\'#linktoedit\').remove();">x</a></div>');
	$('#linktoedit').slideDown();
}