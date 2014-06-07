// ==UserScript==
// @name           Test Relevant Links on Home
// @namespace      GLB
// @include        http://test.goallineblitz.com/game/home.pl
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
    if (test.innerHTML.indexOf('Teams', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('medium_head', document)
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		els[i].setAttribute('href', '/game/create_test_game.pl')
		els[i].innerHTML = els[i].innerHTML + ' (<a href="/game/game_list.pl">View Test Games</a> - <a href="/game/create_test_game.pl">Create Test Games</a> - <a href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=3" target=new>Bugs Forum on Live</a>)'
	}
}