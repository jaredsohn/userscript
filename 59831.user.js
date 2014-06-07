// ==UserScript==
// @name          Expand Scout Page Top Plays
// @namespace      GLB
// @include       http://goallineblitz.com/game/scout_team.pl?team_id=*&m=defense&for_team_id=*
// @include       http://goallineblitz.com/game/scout_team.pl?team_id=*&m=offense&for_team_id=*
// ==/UserScript==

window.setTimeout( function() 
{
	expandDivs();
}, 0);

function expandDivs(){
	var divs = getElementsByClassName("top_plays",document);
	for(var j=0; j<divs.length; j++) {
		divs[j].style.height = 'auto';
	}
}

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
