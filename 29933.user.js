// ==UserScript==
// @name           Replay without 1st Down Line
// @namespace      http://userscripts.org/users/useridnumbe
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==



var play_container = document.getElementById("replay_area");
var dirt = getElementsByClassName("play",document);
var dir = dirt[0];
var dirText = dir.innerHTML;
if(dirText.indexOf(" field goal ")!=-1)
{ 
        var Buttons = getElementsByClassName("tab",document);
        var ButtonsCount = Buttons.length;
        for(var i=0; i<ButtonsCount; i++)
            {
	        var Button = Buttons[i];
	        var ButtonText = Button.innerHTML;
            	if(ButtonText.indexOf("Next Play")!=-1)
	            {
		setTimeout("window.location.href = '" + Buttons[i].firstChild.href + "';",7000);		        
	            }
            }
}

unsafeWindow.nextFrame = function (){	
unsafeWindow.currentFrame++;
	if (unsafeWindow.currentFrame < unsafeWindow.play_data.length) 
	    {
		unsafeWindow.updateFrame();
	    }
    else
        {
        unsafeWindow.pause();
        var Buttons = getElementsByClassName("tab",document);
        var ButtonsCount = Buttons.length;
        for(var i=0; i<ButtonsCount; i++)
            {
	        var Button = Buttons[i];
	        var ButtonText = Button.innerHTML;
            if(ButtonText.indexOf("Next Play")!=-1)
	            {
		setTimeout("window.location.href = '" + Buttons[i].firstChild.href + "';",2000);		        
		//window.location.href = Buttons[i].firstChild.href;
	            }


            }
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