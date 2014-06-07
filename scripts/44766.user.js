// ==UserScript==
// @name           Post and Lock
// @include        http://goallineblitz.com/game/forum_thread.pl*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function testLock() {
setTimeout(testLock2, 100);
}

function testLock2() {
	GM_xmlhttpRequest({
	method: 'GET',
	url: lock,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
}

function unchecked() {
	post.removeEventListener("click", testLock, false)
	button.removeEventListener("change", unchecked, false)
	button.addEventListener("change", checked, false)
}

function checked() {
	post.addEventListener("click", testLock, false)
	button.removeEventListener("change", checked, false)
	button.addEventListener("change", unchecked, false)
}

var url = document.location.href;
var thread = url.split("thread_id=", 2);
var thread2 = thread[1].split("&", 2);
var str1 = getElementsByClassName("big_head subhead_head", document);
var str = str1[0].innerHTML;
var test = str.split('/game/forum_thread_list.pl?forum_id=', 5);
var test_length = test.length - 1;
var test2 = test[test_length].split("\"", 2);
var forum = "http://goallineblitz.com/game/forum_thread_list.pl?forum_id=" + test2[0] + "&thread_id=" + thread2[0];
var lock = forum + "&lock=1";

var test = document.getElementsByTagName('input')
for(var i=0,j=test.length; i<j; i++) {
    if(test[i].alt == 'Post') {
        var post = test[i];
    }
}
var bar = document.getElementById('reply_content')
var button = document.createElement('input')
button.setAttribute('type', 'checkbox')
button.setAttribute('tabindex', '30')
button.setAttribute('style', 'vertical-align: middle; width: 5px; position:relative; left:-650px; top: 25px')
var title = document.createElement('font')
title.setAttribute('style', 'vertical-align: middle; font-weight: bold; position:relative; left:-650px; top: 25px')
title.innerHTML = " Lock? "
bar.appendChild(title)
bar.appendChild(button)
button.addEventListener("change", checked, false)