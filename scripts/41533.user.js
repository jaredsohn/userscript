// ==UserScript==
// @name           Mod Tools in toolbar (with delete)
// @namespace      GLB
// @include  http://goallineblitz.com/game/forum_thread.pl?thread_id=*
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

function deleteThread() {
		if (confirm("Really delete this thread?")) {
			window.location = forum + '&delete=0';
		}
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
var sticky = forum + "&sticky=1";
var lock = forum + "&lock=1";
var lock_button = document.createElement('div');
lock_button.setAttribute('class', 'tab_off');
lock_button.innerHTML = '<a href="' + lock + '">Lock</a>';
var sticky_button = document.createElement('div');
sticky_button.setAttribute('class', 'tab_off');
sticky_button.innerHTML = '<a href="' + sticky + '">Sticky</a>';
var modbar = getElementsByClassName("subhead_link_bar", document);
modbar[0].innerHTML = modbar[0].innerHTML;
var unsticky = forum + "&sticky=0";
var unlock = forum + "&lock=0";
var unlock_button = document.createElement('div');
unlock_button.setAttribute('class', 'tab_off');
unlock_button.innerHTML = '<a href="' + unlock + '">Un-Lock</a>';
var unsticky_button = document.createElement('div');
unsticky_button.setAttribute('class', 'tab_off');
unsticky_button.innerHTML = '<a>Delete</a>';
modbar[0].appendChild(lock_button);
modbar[0].appendChild(unlock_button);
modbar[0].appendChild(sticky_button);
modbar[0].appendChild(unsticky_button);
unsticky_button.addEventListener("click", deleteThread, false)