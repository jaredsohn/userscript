// ==UserScript==
// @name           GLB No SP Blue
// @namespace      www.goallineblitz.com
// @description    Removes blue boxes from leveled players with unspent SP
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

// Add player id's here Array('123456'); for just 1, Array('123456','234567','345678'); etc for more
var players=new Array('123456','234567');
//////////////////////////////////////////

window.setTimeout(function(){

var divs=getElementsByClassName('content_container_sp player_box',document.getElementById('players'));
if (divs)
{
  for(i=0;i<divs.length;i++)
    {
      for(ii=0;ii<players.length;ii++)
      {
        if(divs[i].innerHTML.split('<a href="/game/player.pl?player_id='+players[ii]).length>1)
        {
          divs[i].setAttribute('class','content_container player_box');
        }
      }
    }
}
});

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