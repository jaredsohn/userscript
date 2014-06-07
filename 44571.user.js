// ==UserScript==
// @name           Quick Search (forum)
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
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

var els = getElementsByClassName('post_user', document);
for(var i=0,j=els.length; i<j; i++) {
	els[i].setAttribute('style', 'height: auto')
}

var els = getElementsByClassName('user_name', document);
for(var i=0,j=els.length; i<j; i++) {
	var link = els[i].getElementsByTagName('a')
	var id = link[0].innerHTML
	var str = 'http://goallineblitz.com/game/search_forum.pl?page=1&keyword=&age=2&forum_ids=&user_name=' + id + '&title=&sort_date=&action=Search'
	var search_btn = document.createElement('a');
	var br = document.createElement('br');
	search_btn.setAttribute('href', str);
	search_btn.innerHTML = '<font size="1">Recent Posts</font>';
	els[i].appendChild(br)
	els[i].appendChild(search_btn)
}