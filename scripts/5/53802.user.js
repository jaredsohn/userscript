// ==UserScript==
// @name           NoAds by /random/+
// @namespace      http://leprosorium.ru/*
// @description    Hide subs_ads_on_index div
// @description    Copyright (c) 2009, random2 / http://leprosorium.ru/users/20228
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// ==/UserScript==


function getElementsByClassName(class_name,doc)
{
	var all_obj=doc,ret_obj=new Array(),j=0,teststr;
	if(doc.all)all_obj=doc.all;
	else if(doc.getElementsByTagName && !doc.all)all_obj=doc.getElementsByTagName("*");

	for(i=0;i<all_obj.length;i++)
	{
		if(all_obj[i].className.indexOf(class_name)!=-1)
		{
			teststr=","+all_obj[i].className.split(" ").join(",")+",";
			if(teststr.indexOf(","+class_name+",")!=-1)
			{
				ret_obj[j]=all_obj[i];
				j++;
			}
		}
	}
	return ret_obj;
}

var divz = getElementsByClassName('subs_ads_on_index',document.body);
divz[0].style.display="none";
document.getElementById('js-index_navigation_holder').style.border="0";