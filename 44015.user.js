// ==UserScript==
// @name           Quick Search
// @namespace      GLB
// @include        http://goallineblitz.com/game/home.pl?user_id=*
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

var account = getElementsByClassName('account_value', document)
var str = 'http://goallineblitz.com/game/search_forum.pl?page=1&keyword=&age=2&forum_ids=&user_name=' + account[0].innerHTML + '&title=&sort_date=&action=Search'
var search_btn = document.createElement('a');
search_btn.setAttribute('href', str);
search_btn.innerHTML = 'Quick Search';
var box = document.getElementById('my_account_content')
box.appendChild(search_btn)
