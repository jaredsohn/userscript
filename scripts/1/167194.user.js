// ==UserScript==
// @name       Blockland Forum Revamp
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Revamps the blockland website
// @include http://forum.blockland.us/*
// @copyright  2013+, You
// ==/UserScript==

doPmCheck();
getName();
function doPmCheck()
{
	var sub = document.getElementsByTagName("td");
    text = sub[1].innerHTML;

	var parameter_Start_index=text.indexOf('<br>');
	var action_Text = text.substring(0, parameter_Start_index);

    chars = action_Text.slice(-13);
    text2 = action_Text.replace(" are new. ","");
    text2 = action_Text.replace(" is new. ","");
    action_Text = text2;
    newMsgs = action_Text.slice(-10);
    newMsgs = newMsgs.replace(/[^0-9]/g, "");
    
    if(newMsgs > 0)
    {
        sub[1].style.backgroundColor = "#C11324";
        sub[1].style.paddingLeft = "20px";
        pmFlashSub = sub[1];
        setTimeout(pmFlash1,250);
    }
}
function getName()
{
	var sub = document.getElementsByTagName("td");
    text = sub[1].innerHTML;
    text2 = text.replace("Hey, ","");
    text2 = text2.replace("\n","");
    var parameter_Start_index=text2.indexOf('</b>');
	var action_Text = text2.substring(0, parameter_Start_index);
    action_Text = action_Text.replace("<b>","");
    namelength = action_Text.length;
	var sub2 = document.getElementsByTagName("a");
    var a = 0;
    for (var i=0;i<sub2.length;i++)
    {
    	if(sub2[i].innerHTML==action_Text)
        {
            if(sub2[i].innerHTML=="swollow")
            {
            	sub2[i].innerHTML="Swollow";    
            }
			sub2[i].type = "myName";
         	sub2[i].style.color = "red";
            var a=a+1;
        }
    }    
}
function pmFlash1()
{
	pmFlashSub.style.backgroundColor = "#C11324";
    setTimeout(pmFlash2,250);
}
function pmFlash2()
{
    pmFlashSub.style.backgroundColor = "#FFF";
	setTimeout(pmFlash1,1000);
}