// ==UserScript==
// @name          translate fb
// @namespace	  http://esnpb.byethost10.com/
// @description	  Translate facebook posts from any language to english with google translate
// @author        Karol L
// @include       http://www.facebook.com/*
// ==/UserScript==

(function () 
{
	if(document.URL.search('http://www.facebook.com/') < 0)
		return;
	doStuffOnLoad();
})();

function doStuffOnLoad()
{
	var trlButton = document.createElement('img');
	var welcomeBox = document.getElementById('pagelet_welcome_box');
	trlButton.setAttribute('src', 'http://i731.photobucket.com/albums/ww315/GirugaMarc/AwesomeSmileySmall.png');
	trlButton.addEventListener("click", initializeButtons, false);
	welcomeBox.appendChild(trlButton);
}

function initializeButtons()
{
	//delete old buttons
	var oldImgs = getElementsByClassName('fb_translate');	
	for(var j = 0; j < oldImgs.length; j++)
	{
		var parent = oldImgs[j].parentNode;
		parent.removeChild(oldImgs[j]);
		parent.innerHTML = parent.innerHTML.substring(0, parent.innerHTML.length - 3);
	}
	var divs = document.getElementsByTagName("*");
	for(var i = 0; i < divs.length; i++) 
	{
		if(divs[i].className.search('commentActions') >= 0 || divs[i].className.search('uiStreamFooter') >= 0)
		{
			//alert(i);
			var imgButton = document.createElement('img');
			imgButton.className = 'fb_translate';
			imgButton.setAttribute('src', 'http://www.hakotec.de/english/images/navi/english_flag.bmp');
			imgButton.addEventListener("click", translate, false);
			divs[i].innerHTML += ' · ';
			divs[i].appendChild(imgButton);
		}
	}
}

getElementsByClassName=function(c)
{

	var a = [];
	var list = document.getElementsByTagName("*");
    for(var i=0; i < list.length; i++)
	{
		if(RegExp('\\b'+c+'\\b','gi').test(list[i].className))
		{
			a.push(list[i]);
        }
    }
    return a;
}

function translate()
{
	var commentBody;
	if(this.parentNode.className == 'uiStreamFooter')
		commentBody = this.parentNode.parentNode.previousSibling.lastChild;
	else
		commentBody = this.parentNode.previousSibling;
	var toTranslate = commentBody.innerHTML;
	window.open('http://translate.google.pl/#auto|en|' + toTranslate, 'Translated','width=800,height=400');
}
