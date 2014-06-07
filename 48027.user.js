// ==UserScript==
// @name          antiwipe
// @description   delete doubled or tripled posts
// @include       http://*0chan.ru/*/res/*.html
// ==/UserScript==
//
// License: GPL
// Author:  Ddd
// Version: 0.1


i=-1;
j=-1;
//k=-1;
//zzz=0;
hr=getElementsByClassName(document,"postnode");
tab=getElementsByClassName(document, "postmessage");
while(tab[++i])
{
	while(tab[++j])
	{
		if(tab[i].innerHTML==tab[j].innerHTML && i!=j)
		{
			tab[j].innerHTML="";
			hr[j].style.display="none";
		}
		//else
		//{
		//	zzz=0;
		//	a=tab[i].innerHTML;
		//	b=tab[j].innerHTML;
		//	while(++k<10)
		//	{
		//		if(a[k]==b[k] && i!=j) zzz++;
//
//			}
//			if(zzz>9){	
//			tab[j].innerHTML="";
//			hr[j].style.display="none";}
//		}
//		k=-1;
		
	}
	j=-1;
}



function getElementsByClassName(node, classname)
{
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}