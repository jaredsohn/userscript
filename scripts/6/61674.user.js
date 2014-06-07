// ==UserScript==
// @name           Forum Jump
// @namespace      Here
// @include        http://goallineblitz.com/game/*
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

function findName(test) {
    if (test.innerHTML.indexOf('GLB Radio', 0)>=0) return 1;
    if (test.innerHTML.indexOf('Shop', 0)>=0) return 1;
  return 0;
}

function findName2(test) {
    if (test.innerHTML.indexOf('Flex Points', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('toolbar_item', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		els[i].parentNode.removeChild(els[i])	     
	}
	if (findName2(els[i])){
		els[i].innerHTML = 'Flex'     
	}
}


var box = document.createElement('a')
box.setAttribute('class', 'toolbar_item')
box.innerHTML = '<center><form class="toolbar_item" name="form1"><select onchange="window.location=document.form1.menu.options[document.form1.menu.selectedIndex].value;" name="menu" style="font-size: 12px; color: rgb(0, 0, 0); font-family: Arial; background-color: rgb(255, 255, 255);"><option disabled="true" selected="true">- Select a forum -</option><optgroup label="Goal Line Blitz"><option value="forum_thread_list.pl?forum_id=1">Announcements</option><option value="forum_thread_list.pl?forum_id=2">Suggestions</option><option value="forum_thread_list.pl?forum_id=3">Bugs</option><option value="forum_thread_list.pl?forum_id=19">FAQ`s, Player Guides and Newbie Help</option ><option value="forum_thread_list.pl?forum_id=4">Goal Line Blitz</option><option value="forum_thread_list.pl?forum_id=8">Game Recaps</option></optgroup><optgroup label ="General"><option value="forum_thread_list.pl?forum_id=5">Free For All</option><option value="forum_thread_list.pl?forum_id=3597">General Discussion</option><option value="forum_thread_list.pl?forum_id=9">Trash Talkin`</option><option value="forum_thread_list.pl?forum_id=18">Introductions</option><option value="forum_thread_list.pl?forum_id=294">Private Forum Announcements</option></ optgroup><optgroup label="Regional Forums"><option value="forum_thread_list.pl?forum_id=5374">World</option><option value="forum_thread_list.pl?forum_id=11">USA</option><option value="forum_thread_list.pl?forum_id=12">Canada</option><option value="forum_thread_list.pl?forum_id=13">Europe East</option><option value="forum_thread_list.pl?forum_id=14">Europe West</option><option value="forum_thread_list.pl?forum_id=15">Oceania</option><option value="forum_thread_list.pl?forum_id=16">South America</option><option value="forum_thread_list.pl?forum_id=17">Southeast Asia</option><option value="forum_thread_list.pl?forum_id=140">Africa</option></optgroup></select>\n</form>'
var container = document.getElementById('toolbar')
container.appendChild(box)