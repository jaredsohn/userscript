// ==UserScript==
// @name           Just the 1st down marker
// @namespace      http://userscripts.org/users/useridnumbe
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==




window.scroll(0,100);
var play_container = document.getElementById("replay_area");
var dirt = getElementsByClassName("play",document);
var dir = dirt[0];
var dirText = dir.innerHTML;
var ytg = "";
if(dirText.indexOf(" inches ")!=-1)
{var ytg = '.3';}
else
{   if(dirText.indexOf(" G on ")!=-1)
    {//later
    }
    else
    {       var p2 = dirText.indexOf(" &amp; ")+7;
            var p1 = dirText.indexOf(" on ");
            var ytg = dirText.substring(p2,p1);
    }
}
var dy = parseFloat(ytg)*9;
if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y))
{
    var fp = parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) * 3+12;
    if(dirText.indexOf(" G on ")!=-1)
    {//later
    }
        else
        {
            var ltg = (parseFloat(fp) + parseFloat(dy));
            var div = unsafeWindow.document.createElement('div');
		    div.id = 'ds';
		    div.className = 'player_icon';
		    play_container.appendChild(div);
		    div.style.top  = (ltg) + 'px'; 
		    div.style.width = '520px';
		    div.style.height = '2px';
		    div.style.backgroundColor = 'red';
div.style.zIndex = 0;
        }
    }
    else
    {
        var fp = parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) * 3-18;
        if(dirText.indexOf("G on ")!=-1)
        {//later
        }
        else
        {
            var ltg = (parseFloat(fp) - parseFloat(dy));
            var div = unsafeWindow.document.createElement('div');
		    div.id = 'ds';
		    div.className = 'player_icon';
		    play_container.appendChild(div);
		    div.style.top  = (ltg) + 'px';
		    div.style.width = '520px';
		    div.style.height = '2px';
		    div.style.backgroundColor = 'red';
div.style.zIndex = 0;
        }
    }




function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{a.push(els[i]);}
	}
	return a;
};