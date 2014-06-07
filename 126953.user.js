// ==UserScript==
// @name           Fb Chat
// @namespace      hackathon.fb.chat
// @description    Open multiple chat tabs
// @include        https://www.*.facebook.com/*
// @include        http://www.*.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

function removeTogglers(currentDiv)
{
    var curDiv = currentDiv;
    console.log(curDiv);
    function aaa() {
        var fl = false;
        for(var i = 0; i < curDiv.classList.length; ++i) {
            if(curDiv.classList[i] == "openToggler") {
                fl = true;
            }
        }
        if(fl) {
            curDiv.classList.remove('openToggler');
        }
        else {
            curDiv.classList.add('openToggler');
        }
    }
    return aaa;
}

function getitdonenow(tag1)
{
    var aa = tag1.getElementsByClassName('titlebar');
    if(aa.length>0)
    {
        console.log('here i am');
        //aa[0].addEventListener('click',removeTogglers(aa[0]),false);
        var curDiv = aa[0];
        console.log(curDiv);
        curDiv.onclick = function() {alert('h');};
        console.log('onclick over');
                                    /*console.log('a');
            /*var fl = false;for(var i = 0; i < curDiv.classList.length; ++i) {if(curDiv.classList[i] == "openToggler") {fl = true;}}if(fl) {curDiv.classList.remove('openToggler');}else {curDiv.classList.add('openToggler');
            }*/
        //}
        //console.log("u");
    }
}

function dostuff() {
	fbchatWindows = document.getElementsByClassName("fbDockChatTab");
	for(i = 0; i < fbchatWindows.length; ++i)
	{
		oneWindow = fbchatWindows[i];
		flag = false;
		for(j = 0; j < oneWindow.classList.length; ++j)
		{
			if(oneWindow.classList[j] == "openToggler")
			{
				flag = true;
			}
		}
		if(flag==false)
		{
			oneWindow.classList.add("openToggler");
		}
	}
}

document.addEventListener('DOMNodeInserted', dostuff, false);

