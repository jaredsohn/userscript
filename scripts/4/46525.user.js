// ==UserScript==
// @name           PM link on Player Page
// @namespace      GLB
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

var els = getElementsByClassName('vital_data', document)

function findName(test) {
    if (test.innerHTML.indexOf('/game/home.pl?user_id=', 0)>=0) return 1;
  return 0;
}

for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
	   var agent_container = els[i]
	}
}

var pre_id = agent_container.innerHTML
var pre_id2 = pre_id.split('user_id=', 2)
var id = pre_id2[1].split('"', 2)
agent_container.innerHTML = agent_container.innerHTML + ' (<a href="http://goallineblitz.com/game/new_message.pl?to=' + id[0] +'">PM</a>)'