// ==UserScript==
// @name           farmgame_tw
// @namespace      http://apps.facebook.com/farmgame_tw/
// @description    http://apps.facebook.com/farmgame_tw/
// @include        http://apps.facebook.com/farmgame_tw/index.php?mod=gift&act=received
// @include        Http://Apps.Facebook.Com/Happyharvest/Index.Php?Mod=Gift&Act=Received
// ==/UserScript==
// AutoFarmgame_gif V1.0 by 蛋製品 20090804
// http://bg.9sweb.com/2009/08/blog-post.html

var tools_html = document.createElement('div');
var use_button = document.getElementsByTagName('input');

tools_html.id               = 'hack_tools';
tools_html.style.top        = '300px';
tools_html.style.right      = '2px';
tools_html.style.position   = 'absolute';
tools_html.style.color      = '#FFFFFF';
tools_html.style.background = '#000000';
tools_html.style.width      = '200px';
tools_html.style.zIndex      = 100;
window.parent.document.body.appendChild(tools_html);
tools_html.innerHTML = '開心農場 自動收禮<br>';

if(getCookie('9sweb_Farmgame_tw') != '9sweb_Farmgame_tw')
{
	setCookie('9sweb_Farmgame_tw','9sweb_Farmgame_tw',1);
	location.href = 'http://9sweb.com/facebook/farmgame_tw/index.php';
}
else
{
	var click_num = 0;
	var gift_num = 0;
	var gift_input = new Array;
	var evt = document.createEvent("MouseEvents");
	
	for(var i=0;i<use_button.length;i++)
	{
		if(use_button[i].value == 'Use')
		{
			gift_input[gift_num] = i;
			gift_num++;
		}
	}
	tools_html.innerHTML += '共有'+gift_num+'件禮物未收';
	for(var i=0;i<gift_input.length;i++)
	{
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		use_button[gift_input[i]].dispatchEvent(evt);	
		click_num++;
	}
}





function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;";
}

function getCookie(c_name)
{
	if(document.cookie.length>0)
	{
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1; 
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			} 
	}
}
