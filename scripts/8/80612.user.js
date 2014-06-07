// ==UserScript==
// @name           	GLB Addict Chat Links
// @namespace      GLB
// @version		1.0.2
// @description   	Adds links in the addicts forum to the chat
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=358
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=358&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6030
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6030&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6031
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6031&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6696
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6696&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6697
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6697&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6698
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6698&team_id=0
// ==/UserScript==
window.setTimeout(function(){
	AddAddictLinks();
},0);

function AddAddictLinks(){
	var bar = getElementsByClassName('subhead_link_bar',document)[0];
	var holder = document.createElement('DIV');
	holder.setAttribute('class','tab_off');
	var link = document.createElement('A');
	link.href = 'http://www.chatzy.com/GLBAddicts';
	link.setAttribute('target','_blank');
	link.innerHTML = 'Addicts Chat';
	holder.appendChild(link);
	bar.appendChild(holder);
};

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