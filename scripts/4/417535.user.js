// ==UserScript==
// @name          PcMasterRace
// @namespace     Twitchpls.com
// @include       http://www.twitch.tv/directory/game/*
// ==/UserScript==
var t
var Words = new Array();
Words[0] = "ps4";
Words[1] = "xbox";
Words[2] = "xb1";
Words[3] = "ps3";
Words[4] = "xbone";
function Bot()
{
	if(document.getElementsByClassName("stream item") != "undefined")
	{
		for(var x = 0; document.getElementsByClassName("stream item").length > x;x++)
		{
			for(var y = 0; Words.length > y; y++)
			{
				if(document.getElementsByClassName("stream item")[x].getElementsByTagName("a")[2].innerHTML.toLowerCase().indexOf(Words[y]) != -1)
				{
					if(document.getElementsByClassName("stream item")[x].style.display != 'none')
					{
						document.getElementsByClassName("stream item")[x].style.display = 'none';
					}
					else
					{
						clearTimeout(t);
					}
				}
			}
		}
	}
}
function refreashContent()
{
	document.getElementsByClassName("normal_button js-load-more list_more")[0].setAttribute('onclick', 'setTimeout(function(){Bot();}, 1000);');
}
function injectJsIntoPage()
{
	var Head = document.createElement('script');
	var Target = document.getElementsByTagName('head')[0];
	Head.innerHTML = "function Bot() { var Words = new Array(); Words[0] = 'ps4'; Words[1] = 'xbox'; Words[2] = 'xb1'; Words[3] = 'ps3'; Words[4] = 'xbone'; if(document.getElementsByClassName('stream item') != 'undefined') { for(var x = 0; document.getElementsByClassName('stream item').length > x;x++) { for(var y = 0; Words.length > y; y++) { if(document.getElementsByClassName('stream item')[x].getElementsByTagName('a')[2].innerHTML.toLowerCase().indexOf(Words[y]) != -1) { if(document.getElementsByClassName('stream item')[x].style.display != 'none') { document.getElementsByClassName('stream item')[x].style.display = 'none'; } } } } } }";
	Target.appendChild(Head);
}
injectJsIntoPage();
    (window.onload = function Loop() {			
                t = setTimeout(function() { 
                Bot();
				refreashContent();
        }, 2000);
    }());