// ==UserScript==
// @name           GC Customisable Menu
// @namespace      delta68.customisable_menu
// @include        http://www.geocaching.com*
// @include        https://www.geocaching.com/*
// @include        http://www6.brinkster.com/coolsite/gcmenuedit.asp*
// ==/UserScript==

var subMenu_Video =''
var qs=window.location.search

var url = document.location.toString();

if(url.indexOf('gcmenuedit.asp') > 0)
{
	qs = mydecodeURI(qs)
	if(qs.indexOf('?key=')>-1)
	{
		qs=qs.substring(qs.indexOf('?key=')+5)
		var s = qs.split('&key=')
		
		for(var i = 0;i<s.length;i++)
		{	
			s[i]=s[i].replace('&title=','||')
			s[i]=s[i].replace('&href=','||')
			
			var r=s[i].split('||')
			GM_setValue(r[0],r[2] + '|' + r[1])
		
		}
	}

//load stored data
var key = document.getElementsByName("key")
var title = document.getElementsByName("title")
var href = document.getElementsByName("href")
var hide = document.getElementsByName("hide")
for(var i=0;i<key.length;i++)
{

	var s=GM_getValue(key[i].value,'')
		if(s.length>0)
		{	
			if(s.indexOf('&hide=on')>-1)
			{
				hide[i].checked=true
			}
			t=s.split('|')
			href[i].value=  t[0].replace(/&hide=on/gi, "")
			title[i].value= t[1] 
		}


}



}else{

	var nav = document.getElementById('Navigation')
	var a = nav.getElementsByTagName("a");

	for(var i=0;i<a.length;i++)
	{
		var s=GM_getValue(a.item(i).id,'')
		if(s.length>0)
		{
			if(s.indexOf('&hide=on')>-1)
			{
				hideItem(a.item(i).id)
			}else{
				var t=s.replace(/&hide=on/gi, "").split('|')
				if((t[0].length>0) && (t[1].length>0))
				{
					changeLink(a.item(i).id,t[0],t[1])
				}
			}
		}
	}
}


/**********************************************************************/
/********* PLEASE DO NOT TOUCH ANYTHING BELOW THIS LINE!! *************/


function hideItem(id)
{
	document.getElementById(id).style.display = 'none';
}

function getRel(href)
{
	if (href=='#'){return('')}

	if (href.indexOf("www.geocaching.com")>-1){return('')}

	if (href.indexOf("forums.groundspeak.com")>-1){return('')}
	
	if (href.indexOf("http://")>-1){return('external')}
	
	return('')
}



function changeLink(id,href,text)
{
	var x = document.getElementById(id)
	try{
	if(href!='')
	{
		x.href=href
		x.rel =getRel(href)
	}
	if(id.indexOf('hlNav')>-1){
		x.innerHTML=text + ' \u25bc'
	}else{
		x.innerHTML=text
	}
	x.title = text
	}catch(err)
	{}
}


function mydecodeURI(uri)
{
var s = uri.replace(/%2F/gi, "/")
s = s.replace(/\+/gi, " ")
s = s.replace(/%3A/gi, ":")
s = s.replace(/%23/gi, "#")
s = s.replace(/%3D/gi, "=")
s = s.replace(/%26/gi, "&")
s = s.replace(/%3F/gi, "?")





return(s)

}