// ==UserScript==
// @name           Bannière
// @namespace      brigole
// @include        http://brigole.1fr1.net/*
// @exclude	       http://brigole.1fr1.net/forum.htm
// ==/UserScript==
var fin = 0;
var deb = document.cookie.indexOf("fa_brigole_1fr1_banchg=");
if (deb >= 0)
{
	deb += 23;
	fin=document.cookie.indexOf(";",deb);
	if(fin < 0)
	{
		fin=document.cookie.length;
	}
	var v = unescape(document.cookie.substring(deb,fin));
	if(v==4)
	{
		void(0);
	}
	else if(v==3)
	{
		document.getElementById('i_logo').setAttribute('src','http://i60.servimg.com/u/f60/12/00/18/36/bannie15.png');
	}
	else if(v==2)
	{
		document.getElementById('i_logo').setAttribute('src','http://i80.servimg.com/u/f80/12/00/18/36/bannie19.png');
	}
	else if(v==1)
	{
		document.getElementById('i_logo').setAttribute('src','http://i40.servimg.com/u/f40/12/00/18/36/bannie21.png');
	}
	else if(v==9)
	{
		var img = new Array("http://i40.servimg.com/u/f40/12/00/18/36/bannie21.png","http://i80.servimg.com/u/f80/12/00/18/36/bannie19.png","http://i60.servimg.com/u/f60/12/00/18/36/bannie15.png","http://i60.servimg.com/u/f60/12/00/18/36/untitl14.png");
		n=Math.floor(Math.random()*4);
		document.getElementById('i_logo').setAttribute('src',img[n]);
	}
	else if(v==0)
	{
		void(0);
	}
	else
	{
		today=new Date();
		expires=new Date();
		expires.setTime(today.getTime() + (365*24*60*60*1000));
		document.cookie="fa_brigole_1fr1_banchg=0;expires=" + expires.toGMTString() + "; path=/;";
		alert("Veuillez mettre a jour le script GreaseMonkey");

	}
}
else
{
	void(0);
}