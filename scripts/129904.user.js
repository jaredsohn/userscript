// ==UserScript==
// @name          Facebook Ad Remover
// @namespace     http://h4ckcod3r.in/userscripts
// @description	  removes advertisements from facebook
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==

/*document.getElementById('pagelet_ego_pane').innerHTML="";
document.getElementById('pagelet_ego_pane_w').innerHTML="";
document.getElementById('pagelet_side_ads').innerHTML="";*/
function gopi()
{
	/*d1=document.getElementsByClassName('ego_section')[0];
	alert(d1);
	if(d1!="undefined")
		alert(d1);
		d1.innerHTML="";
	d2=document.getElementsByClassName('ego_section')[2]
	if(d2!="undefined")
		d2.innerHTML="";*/
	
	d=document.getElementsByClassName('ego_section');
	for(x in d)
	{
		d[x].innerHTML="";
	}
	
	setTimeout(gopi,300);
}
setTimeout(gopi,1000);

void 0;